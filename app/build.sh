#!/bin/bash
set -euo pipefail
SDK=/opt/android; BT=$SDK/build-tools/35.0.0; JAR=$SDK/platforms/android-34/android.jar
rm -rf build && mkdir -p build/gen build/classes build/dex build/res
$BT/aapt2 compile --dir res -o build/res/compiled.zip
$BT/aapt2 link -I $JAR --manifest AndroidManifest.xml -A assets \
  --min-sdk-version 24 --target-sdk-version 34 --version-code 28 --version-name 1.22 \
  --java build/gen -o build/unsigned.apk build/res/compiled.zip
javac --release 8 -Xlint:-options -cp $JAR -d build/classes $(find src build/gen -name '*.java')
$BT/d8 --release --lib $JAR --min-api 24 --output build/dex $(find build/classes -name '*.class')
(cd build/dex && zip -q -j ../unsigned.apk classes.dex)
$BT/zipalign -f -p 4 build/unsigned.apk build/aligned.apk
[ -f release.keystore ] || keytool -genkeypair -keystore release.keystore -alias problemsets -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass problemsets -keypass problemsets -dname "CN=Problem Sets" >/dev/null 2>&1
$BT/apksigner sign --ks release.keystore --ks-key-alias problemsets --ks-pass pass:problemsets --key-pass pass:problemsets \
  --out build/ProblemSets.apk build/aligned.apk
$BT/apksigner verify --verbose build/ProblemSets.apk | head -4
$BT/aapt2 dump badging build/ProblemSets.apk | grep -E "package|sdkVersion|launchable" 
ls -la build/ProblemSets.apk
