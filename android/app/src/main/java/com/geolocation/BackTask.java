package com.geolocation;

import static com.facebook.react.modules.appstate.AppStateModule.TAG;

import android.app.ActivityManager;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
public class BackTask  extends ReactContextBaseJavaModule {
    BackTask(ReactApplicationContext context) {
        super(context);
    }
    @NonNull
    @Override
    public String getName() {
        return "BackTask";
    }

    public static final String CUSTOM_BROADCAST_ACTION = "com.example.myBastTask.custombroadcasts.CUSTOM_BROADCAST";
    MyCustomReciver myCustomReciver = new MyCustomReciver();

    public boolean foregroundServiceRunning(){
        ActivityManager activityManager = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            activityManager = (ActivityManager) getCurrentActivity().getSystemService(getReactApplicationContext().ACTIVITY_SERVICE);
        }
        for(ActivityManager.RunningServiceInfo service: activityManager.getRunningServices(Integer.MAX_VALUE)) {
            if(BackTaskServices.class.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }

    @ReactMethod
    public void onStart(int time) {
        if(!foregroundServiceRunning()) {
            Toast.makeText(getReactApplicationContext(), "Start Task", Toast.LENGTH_SHORT).show();
            Intent serviceIntent = new Intent(getReactApplicationContext(),
                    BackTaskServices.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                getCurrentActivity().registerReceiver(myCustomReciver,new IntentFilter(CUSTOM_BROADCAST_ACTION));
                serviceIntent.putExtra("time",time);

                getCurrentActivity().startForegroundService(serviceIntent);
            }
        }
    }
    @ReactMethod
    public void onStop() {
        if(!foregroundServiceRunning()) {
            Toast.makeText(getReactApplicationContext(), "Please Start Services", Toast.LENGTH_SHORT).show();
        }   else{
            Intent serviceIntent = new Intent(getReactApplicationContext(),
                    BackTaskServices.class);
            getCurrentActivity().stopService(serviceIntent);
        }
    }


}
