package com.geolocation;

import static com.facebook.react.views.textinput.ReactTextInputManager.TAG;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;

import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.shell.MainReactPackage;

public class MyCustomReciver extends BroadcastReceiver  {

    @Override
    public void onReceive(Context context, Intent intent) {
        String name = (String) intent.getExtras().get("name");
        Toast.makeText(context, "this is "+ name, Toast.LENGTH_SHORT).show();

    }
}
