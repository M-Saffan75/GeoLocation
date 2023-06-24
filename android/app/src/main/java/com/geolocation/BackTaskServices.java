package com.geolocation;
import static com.facebook.react.views.textinput.ReactTextInputManager.TAG;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.util.Log;
import android.widget.Toast;
import androidx.annotation.Nullable;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactInstanceManagerBuilder;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;

public class BackTaskServices extends Service  {
    public static final String CUSTOM_BROADCAST_ACTION = "com.example.myBastTask.custombroadcasts.CUSTOM_BROADCAST";
    ReactInstanceManager  mReactInstanceManager;
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        long time = (int) intent.getExtras().get("time");
//        Activity activity = (Activity) intent.getExtras().get("Activity");
//        Class<? extends Activity> targetActivity = Class.forName(desiredActivityName).asSubclass(Activity.class);

        ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
        Handler handler = new Handler(Looper.getMainLooper());
        service.schedule(()->{
            handler.post(() ->{
                Toast.makeText(this, "Start Timer", Toast.LENGTH_SHORT).show();
                try {

                    WritableMap map = Arguments.createMap();
                    map.putString("key1", "Value1");
                    map.putString("key1", "Value1");

                 mReactInstanceManager =  ReactInstanceManager.builder()
                         .setJavaScriptExecutorFactory(new HermesExecutorFactory())
                         .setApplication(getApplication()).
                         setBundleAssetName("index.android.bundle")
                            .setJSMainModulePath("index.android").
                         addPackage(new MainReactPackage())
                            .setUseDeveloperSupport(BuildConfig.DEBUG).
                         setInitialLifecycleState(LifecycleState.BEFORE_CREATE)
                         .build();
                           mReactInstanceManager.getCurrentReactContext()
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit("myEvent", map);
                } catch (Exception e){
                    Log.d(TAG, "onStartCommand: "+e.getMessage());
                    Toast.makeText(this, "Caught Exception: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        },time, TimeUnit.SECONDS);
        final String CHANNELID = "Foreground Service ID";
        NotificationChannel channel = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            channel = new NotificationChannel(
                    CHANNELID,
                    CHANNELID,
                    NotificationManager.IMPORTANCE_LOW
            );
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getSystemService(NotificationManager.class).createNotificationChannel(channel);
        }
        Notification.Builder notification = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            notification = new Notification.Builder(this, CHANNELID)
                    .setContentText("Service is running")
                    .setContentTitle("Service enabled")
                    .setSmallIcon(R.mipmap.ic_launcher);
        }
        startForeground(1001, notification.build());
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
