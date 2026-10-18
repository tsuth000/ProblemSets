# Problem Sets

An offline Android study app for mathematics, physics, statistics, Python and C++: lessons, worked examples, generated practice problems with worked solutions, mastery checks and spaced review.

- `app/` is the Android project. `app/README.md` documents the content, the build, and every release.
- `tools/` holds the content checks: `validate.js` (rendering and structure), `verify.py` (independent answer checks with SymPy, mpmath and g++), `flow.py` and `displays.py` (browser checks at phone width).

## Build

Requires the Android SDK (build-tools 35, platform 34) and a JDK.

```
cd app
ANDROID_HOME=/path/to/android-sdk bash build.sh
```

`build.sh` signs with `app/release.keystore` and creates a new key if the file is missing. The key is not in this repository. Keep your copy backed up: an APK signed with a different key cannot install over an existing installation, and Android only allows removing the old app, which erases its progress.

## Checks

```
cd tools
node validate.js
python3 verify.py /tmp/claude-0/jobs.json
python3 flow.py
python3 displays.py
```
