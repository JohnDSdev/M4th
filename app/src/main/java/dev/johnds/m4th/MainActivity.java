package dev.johnds.m4th;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.ValueCallback;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.util.Calendar;

public class MainActivity extends Activity {
    private static final String PREFS = "m4th_progress_v1";
    private static final String CHANNEL = "study_reminders";
    private WebView web;
    private ValueCallback<Uri[]> courseFileCallback;
    private final class Bridge {
        @JavascriptInterface public String load() {
            return getSharedPreferences(PREFS, MODE_PRIVATE).getString("state", "{}");
        }
        @JavascriptInterface public void save(String json) {
            if (json != null && json.length() < 1000000) {
                getSharedPreferences(PREFS, MODE_PRIVATE).edit().putString("state", json).apply();
            }
        }
        @JavascriptInterface public void reminder(int hour, int minute, boolean enabled) {
            if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return;
            getSharedPreferences(PREFS, MODE_PRIVATE).edit()
                .putBoolean("reminder", enabled).putInt("hour", hour).putInt("minute", minute).apply();
            runOnUiThread(() -> {
                scheduleReminder(hour, minute, enabled);
                if (enabled && Build.VERSION.SDK_INT >= 33
                    && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 42);
                }
            });
        }
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.BLACK);
        getWindow().setNavigationBarColor(Color.BLACK);
        NotificationManager manager = getSystemService(NotificationManager.class);
        manager.createNotificationChannel(new NotificationChannel(CHANNEL, "Study reminders", NotificationManager.IMPORTANCE_DEFAULT));
        web = new WebView(this);
        web.setBackgroundColor(Color.BLACK);
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccessFromFileURLs(false);
        settings.setAllowUniversalAccessFromFileURLs(false);
        settings.setJavaScriptCanOpenWindowsAutomatically(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        web.addJavascriptInterface(new Bridge(), "M4th");
        web.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onConsoleMessage(ConsoleMessage msg) {
                Log.i("M4thWeb", msg.message());
                return true;
            }
            @Override public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback,
                                                        FileChooserParams parameters) {
                if (courseFileCallback != null) courseFileCallback.onReceiveValue(null);
                courseFileCallback = callback;
                Intent select = new Intent(Intent.ACTION_GET_CONTENT);
                select.setType("application/json");
                select.addCategory(Intent.CATEGORY_OPENABLE);
                try {
                    startActivityForResult(select, 83);
                    return true;
                } catch (Exception error) {
                    courseFileCallback.onReceiveValue(null);
                    courseFileCallback = null;
                    return false;
                }
            }
        });
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return !request.getUrl().toString().startsWith("file:///android_asset/");
            }
        });
        setContentView(web);
        web.loadUrl("file:///android_asset/index.html");
    }

    private void scheduleReminder(int hour, int minute, boolean enabled) {
        AlarmManager alarm = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(this, ReminderReceiver.class);
        PendingIntent pending = PendingIntent.getBroadcast(this, 7, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        alarm.cancel(pending);
        if (!enabled) return;
        Calendar next = Calendar.getInstance();
        next.set(Calendar.HOUR_OF_DAY, hour);
        next.set(Calendar.MINUTE, minute);
        next.set(Calendar.SECOND, 0);
        if (next.getTimeInMillis() <= System.currentTimeMillis()) next.add(Calendar.DAY_OF_YEAR, 1);
        alarm.setInexactRepeating(AlarmManager.RTC_WAKEUP, next.getTimeInMillis(),
            AlarmManager.INTERVAL_DAY, pending);
    }
    @Override protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 83 && courseFileCallback != null) {
            Uri[] selected = (resultCode == RESULT_OK && data != null && data.getData() != null)
                ? new Uri[]{data.getData()} : null;
            courseFileCallback.onReceiveValue(selected);
            courseFileCallback = null;
        }
    }
    @Override public void onBackPressed() {
        web.evaluateJavascript("window.m4thBack ? window.m4thBack() : false", result -> {
            if ("false".equals(result)) super.onBackPressed();
        });
    }
    @Override protected void onDestroy() {
        if (web != null) web.destroy();
        super.onDestroy();
    }
}
