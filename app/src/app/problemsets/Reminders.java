package app.problemsets;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.PowerManager;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * Daily practice reminder. Each alarm is a one-shot alarm that is allowed to fire in Doze; when it fires it posts the
 * notification (unless today's goal is already met) and schedules the next day. Alarms are re-registered at boot, after
 * an app update, after a clock or time-zone change, and every time the app opens.
 */
public final class Reminders {
    static final String PREFS = "problemsets";
    private static final String CHANNEL = "daily";
    private static final int ALARM_ID = 41;
    private static final int TEST_ID = 43;
    private static final int NOTE_ID = 42;
    static final String EXTRA_TEST = "test";

    private Reminders() {}

    static SharedPreferences prefs(Context c) { return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE); }

    private static PendingIntent alarmIntent(Context c, boolean test) {
        Intent i = new Intent(c, AlarmReceiver.class).putExtra(EXTRA_TEST, test);
        return PendingIntent.getBroadcast(c, test ? TEST_ID : ALARM_ID, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static boolean exactAllowed(Context c) {
        if (Build.VERSION.SDK_INT < 31) return true;
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        return am != null && am.canScheduleExactAlarms();
    }

    /** Exact when the system allows it, otherwise a Doze-tolerant inexact alarm. */
    private static void setAlarm(Context c, long at, PendingIntent pi) {
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        am.cancel(pi);
        try {
            if (exactAllowed(c)) am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
            else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        } catch (SecurityException e) {
            am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
        }
    }

    static long nextTime(int hour, int minute) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.HOUR_OF_DAY, hour);
        cal.set(Calendar.MINUTE, minute);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        if (cal.getTimeInMillis() <= System.currentTimeMillis() + 1000) cal.add(Calendar.DAY_OF_YEAR, 1);
        return cal.getTimeInMillis();
    }

    static void schedule(Context c, int hour, int minute) {
        long at = nextTime(hour, minute);
        prefs(c).edit().putBoolean("reminder.on", true).putInt("reminder.hour", hour).putInt("reminder.minute", minute).putLong("reminder.next", at).apply();
        setAlarm(c, at, alarmIntent(c, false));
    }

    static void cancel(Context c) {
        prefs(c).edit().putBoolean("reminder.on", false).remove("reminder.next").apply();
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        if (am != null) am.cancel(alarmIntent(c, false));
    }

    static void restore(Context c) {
        SharedPreferences p = prefs(c);
        if (p.getBoolean("reminder.on", false)) schedule(c, p.getInt("reminder.hour", 19), p.getInt("reminder.minute", 0));
    }

    /** Runs the real alarm path once, a minute from now, so the whole chain can be checked with the screen off. */
    static void testAlarm(Context c) { setAlarm(c, System.currentTimeMillis() + 60000, alarmIntent(c, true)); }

    static boolean batteryRestricted(Context c) {
        PowerManager pm = (PowerManager) c.getSystemService(Context.POWER_SERVICE);
        return pm != null && !pm.isIgnoringBatteryOptimizations(c.getPackageName());
    }

    static boolean channelEnabled(Context c) {
        if (Build.VERSION.SDK_INT < 26) return true;
        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return false;
        NotificationChannel ch = nm.getNotificationChannel(CHANNEL);
        return ch == null || ch.getImportance() != NotificationManager.IMPORTANCE_NONE;
    }

    /** Reminder health for the settings screen, as JSON. */
    static String status(Context c, boolean permitted) {
        try {
            SharedPreferences p = prefs(c);
            JSONObject o = new JSONObject();
            o.put("on", p.getBoolean("reminder.on", false));
            o.put("next", p.getLong("reminder.next", 0));
            o.put("last", p.getLong("reminder.last", 0));
            o.put("lastSkipped", p.getBoolean("reminder.lastSkipped", false));
            o.put("permitted", permitted);
            o.put("channel", channelEnabled(c));
            o.put("exact", exactAllowed(c));
            o.put("battery", batteryRestricted(c));
            return o.toString();
        } catch (Exception e) {
            return "{}";
        }
    }

    private static void ensureChannel(NotificationManager nm) {
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Daily practice", NotificationManager.IMPORTANCE_DEFAULT);
            ch.setDescription("One reminder a day, skipped once your goal is met");
            nm.createNotificationChannel(ch);
        }
    }

    /** Posts the reminder. A test always posts; the daily one is skipped when today's goal is already met. */
    static void post(Context c, boolean test) {
        String text = "Ten minutes of practice today. Your next lesson is ready.";
        String met = "";
        try {
            String raw = prefs(c).getString("reminder.state", null);
            if (raw != null) {
                JSONObject o = new JSONObject(raw);
                text = o.optString("text", text);
                met = o.optString("met", "");
            }
        } catch (Exception e) {
            // Keep the default text.
        }
        String today = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
        boolean skip = !test && today.equals(met);
        if (!test) prefs(c).edit().putLong("reminder.last", System.currentTimeMillis()).putBoolean("reminder.lastSkipped", skip).apply();
        if (skip) return;

        NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm == null) return;
        ensureChannel(nm);
        Intent open = new Intent(c, MainActivity.class).setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent tap = PendingIntent.getActivity(c, 0, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification.Builder b = Build.VERSION.SDK_INT >= 26 ? new Notification.Builder(c, CHANNEL) : legacyBuilder(c);
        String title = test ? "Test reminder" : "Time for today's problem set";
        if (test) text = "Reminders are working. " + text;
        b.setSmallIcon(R.drawable.ic_stat)
            .setContentTitle(title)
            .setContentText(text)
            .setStyle(new Notification.BigTextStyle().bigText(text))
            .setContentIntent(tap)
            .setAutoCancel(true);
        try { nm.notify(NOTE_ID, b.build()); } catch (SecurityException e) { /* notifications not permitted */ }
    }

    @SuppressWarnings("deprecation")
    private static Notification.Builder legacyBuilder(Context c) { return new Notification.Builder(c); }

    /** Fires once a day (or once for a test), then schedules the next daily alarm. */
    public static final class AlarmReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context c, Intent intent) {
            boolean test = intent.getBooleanExtra(EXTRA_TEST, false);
            post(c, test);
            if (!test) restore(c);
        }
    }

    /** Alarms do not survive a reboot or an app update, and a clock change moves the target time: re-register. */
    public static final class BootReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context c, Intent intent) { restore(c); }
    }
}
