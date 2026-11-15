package dev.johnds.m4th;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.Manifest;
import android.os.Build;
import org.json.JSONObject;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ReminderReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent trigger) {
        SharedPreferences prefs = context.getSharedPreferences("m4th_progress_v1", Context.MODE_PRIVATE);
        if (!prefs.getBoolean("reminder", false)) return;
        if (Build.VERSION.SDK_INT >= 33 &&
            context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) return;
        String today = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());
        try {
            JSONObject state = new JSONObject(prefs.getString("state", "{}"));
            if (today.equals(state.optString("lastActive", ""))) return;
        } catch (Exception ignored) { }
        Intent open = new Intent(context, MainActivity.class);
        PendingIntent tap = PendingIntent.getActivity(context, 8, open,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification notice = new Notification.Builder(context, "study_reminders")
            .setSmallIcon(android.R.drawable.ic_menu_edit)
            .setContentTitle("A little math practice?")
            .setContentText("Your next review is ready whenever you are.")
            .setContentIntent(tap).setAutoCancel(true).build();
        context.getSystemService(NotificationManager.class).notify(23, notice);
    }
}
