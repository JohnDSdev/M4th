#!/usr/bin/env bash
set -euo pipefail
adb install -r app/build/outputs/apk/debug/app-debug.apk
adb logcat -c
adb shell am start -W -n dev.johnds.m4th/.MainActivity
for i in $(seq 1 25); do
  if adb logcat -d -s M4thWeb:I '*:S' | grep -q 'M4thReady'; then
    echo "PASS: M4th WebView initialized all 15 lessons"
    adb shell pidof dev.johnds.m4th
    exit 0
  fi
  sleep 2
done
adb logcat -d -s M4thWeb:I AndroidRuntime:E '*:S' | tail -100
echo "FAIL: M4th readiness signal missing" >&2
exit 1
