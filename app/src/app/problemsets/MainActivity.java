package app.problemsets;

import android.app.Activity;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.provider.Settings;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private static final int PAPER = Color.parseColor("#EEF2E6");
    static final String PERM = "android.permission.POST_NOTIFICATIONS";
    static final String MIC = "android.permission.RECORD_AUDIO";
    private PermissionRequest pendingMedia;
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        web.setBackgroundColor(PAPER);
        // Start in the last theme's paper color so a dark theme does not flash light on launch.
        new BarRunnable(this, getSharedPreferences("problemsets", MODE_PRIVATE).getString("ui.bar", "#EEF2E6")).run();
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(false);
        s.setBuiltInZoomControls(false);
        s.setSupportZoom(false);

        // Progress is stored in SharedPreferences so it survives WebView cache clears.
        web.addJavascriptInterface(new Store(getSharedPreferences("problemsets", MODE_PRIVATE)), "AndroidStore");
        web.addJavascriptInterface(new ReminderBridge(this), "AndroidReminder");
        Reminders.restore(this);

        // The app is fully offline: never navigate away from bundled assets.
        web.setWebViewClient(new LocalOnlyClient());
        // Microphone for optional answer recording in video-question practice; audio never leaves the device.
        web.setWebChromeClient(new MediaClient(this));

        setContentView(web);
        web.loadUrl("file:///android_asset/index.html");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) web.evaluateJavascript("window.appResume && window.appResume()", null);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == 8 && pendingMedia != null) {
            boolean ok = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            if (ok) pendingMedia.grant(new String[] { PermissionRequest.RESOURCE_AUDIO_CAPTURE }); else pendingMedia.deny();
            pendingMedia = null;
            return;
        }
        if (web != null) web.evaluateJavascript("window.appResume && window.appResume()", null);
    }

    void handleMedia(PermissionRequest req) {
        boolean audio = false;
        for (String r : req.getResources()) if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(r)) audio = true;
        if (!audio) { req.deny(); return; }
        if (checkSelfPermission(MIC) == PackageManager.PERMISSION_GRANTED) {
            req.grant(new String[] { PermissionRequest.RESOURCE_AUDIO_CAPTURE });
            return;
        }
        if (pendingMedia != null) pendingMedia.deny();
        pendingMedia = req;
        requestPermissions(new String[] { MIC }, 8);
    }

    boolean notificationsAllowed() {
        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(PERM) != PackageManager.PERMISSION_GRANTED) return false;
        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        return nm == null || nm.areNotificationsEnabled();
    }

    void askNotifications() {
        boolean asked = Reminders.prefs(this).getBoolean("perm.asked", false);
        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(PERM) != PackageManager.PERMISSION_GRANTED
                && (!asked || shouldShowRequestPermissionRationale(PERM))) {
            Reminders.prefs(this).edit().putBoolean("perm.asked", true).apply();
            requestPermissions(new String[] { PERM }, 7);
            return;
        }
        // Already refused, or blocked in system settings: open this app's notification settings.
        Intent i;
        if (Build.VERSION.SDK_INT >= 26) i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS).putExtra(Settings.EXTRA_APP_PACKAGE, getPackageName());
        else i = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + getPackageName()));
        try { startActivity(i); } catch (Exception e) { /* no settings screen available */ }
    }

    @Override
    public void onBackPressed() {
        // Let the page handle back navigation first; exit only from the home screen.
        web.evaluateJavascript("(window.appBack && window.appBack()) ? 'handled' : 'exit'", new BackResult(this));
    }

    void exitApp() {
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (web != null) web.destroy();
        super.onDestroy();
    }

    static final class LocalOnlyClient extends WebViewClient {
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            return !"file".equals(request.getUrl().getScheme());
        }
    }

    static final class MediaClient extends WebChromeClient {
        private final MainActivity activity;

        MediaClient(MainActivity activity) { this.activity = activity; }

        @Override
        public void onPermissionRequest(PermissionRequest request) { activity.runOnUiThread(new MediaRunnable(activity, request)); }

        @Override
        public void onPermissionRequestCanceled(PermissionRequest request) { /* nothing pending to clean up beyond the denial path */ }
    }

    static final class MediaRunnable implements Runnable {
        private final MainActivity activity;
        private final PermissionRequest request;

        MediaRunnable(MainActivity activity, PermissionRequest request) { this.activity = activity; this.request = request; }

        @Override
        public void run() { activity.handleMedia(request); }
    }

    static final class BackResult implements ValueCallback<String> {
        private final MainActivity activity;

        BackResult(MainActivity activity) { this.activity = activity; }

        @Override
        public void onReceiveValue(String value) {
            if (value == null || !value.contains("handled")) activity.exitApp();
        }
    }

    static final class Store {
        private final SharedPreferences prefs;

        Store(SharedPreferences prefs) { this.prefs = prefs; }

        @JavascriptInterface
        public String get(String key) { return prefs.getString(key, null); }

        @JavascriptInterface
        public void set(String key, String value) { prefs.edit().putString(key, value).apply(); }
    }

    static final class ReminderBridge {
        private final MainActivity activity;

        ReminderBridge(MainActivity activity) { this.activity = activity; }

        @JavascriptInterface
        public void schedule(int hour, int minute) { Reminders.schedule(activity, hour, minute); }

        @JavascriptInterface
        public void cancel() { Reminders.cancel(activity); }

        @JavascriptInterface
        public boolean permitted() { return activity.notificationsAllowed(); }

        @JavascriptInterface
        public void requestPermission() { activity.runOnUiThread(new AskRunnable(activity)); }

        @JavascriptInterface
        public String status() { return Reminders.status(activity, activity.notificationsAllowed()); }

        @JavascriptInterface
        public void testNow() { Reminders.post(activity, true); }

        @JavascriptInterface
        public void testAlarm() { Reminders.testAlarm(activity); }

        @JavascriptInterface
        public void openBattery() { activity.runOnUiThread(new SettingsRunnable(activity, "battery")); }

        @JavascriptInterface
        public void openExact() { activity.runOnUiThread(new SettingsRunnable(activity, "exact")); }

        @JavascriptInterface
        public void setBars(String hex) { activity.runOnUiThread(new BarRunnable(activity, hex)); }
    }

    /** Opens the system screen that lifts a reminder restriction. */
    static final class SettingsRunnable implements Runnable {
        private final MainActivity activity;
        private final String which;

        SettingsRunnable(MainActivity activity, String which) { this.activity = activity; this.which = which; }

        @Override
        public void run() {
            Uri pkg = Uri.parse("package:" + activity.getPackageName());
            Intent i;
            if ("battery".equals(which)) i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, pkg);
            else if (Build.VERSION.SDK_INT >= 31) i = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM, pkg);
            else return;
            try { activity.startActivity(i); }
            catch (Exception e) {
                try { activity.startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, pkg)); } catch (Exception e2) { /* no settings screen */ }
            }
        }
    }

    static final class BarRunnable implements Runnable {
        private final MainActivity activity;
        private final String hex;

        BarRunnable(MainActivity activity, String hex) { this.activity = activity; this.hex = hex; }

        @Override
        public void run() {
            try {
                int c = Color.parseColor(hex);
                activity.getWindow().setStatusBarColor(c);
                activity.getWindow().setNavigationBarColor(c);
                // Dark icons on light themes, light icons on dark themes.
                double lum = 0.2126 * Color.red(c) + 0.7152 * Color.green(c) + 0.0722 * Color.blue(c);
                int flags = 0;
                if (lum > 128) {
                    flags = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
                    if (Build.VERSION.SDK_INT >= 26) flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                }
                activity.getWindow().getDecorView().setSystemUiVisibility(flags);
                activity.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(c));
                if (activity.web != null) activity.web.setBackgroundColor(c);
                activity.getSharedPreferences("problemsets", MODE_PRIVATE).edit().putString("ui.bar", hex).apply();
            } catch (IllegalArgumentException e) {
                // Ignore malformed colors.
            }
        }
    }

        static final class AskRunnable implements Runnable {
        private final MainActivity activity;

        AskRunnable(MainActivity activity) { this.activity = activity; }

        @Override
        public void run() { activity.askNotifications(); }
    }
}
