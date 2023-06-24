import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Button, NativeModules, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';

const { BackTask: RNBackgroundTask } = NativeModules

const App = () => {
  const Stack = createStackNavigator();
  const onStartServices = async () => {
    RNBackgroundTask.onStart(10);
  }
  const onStopServices = async () => {
    RNBackgroundTask.onStop();
  }

  useEffect(()=>{
    DeviceEventEmitter.addListener('myEvent', function(e) {
      console.log(e);
      // handle event and you will get a value in event object, you can log it here
    });
  },[])

  return (
    // <>
    //   <NavigationContainer>
    //     <Stack.Navigator screenOptions={{ ...TransitionPresets.FadeFromBottomAndroid, headerShown: false }} initialRouteName='Modal_Here'>

    //       <Stack.Screen name='Modal_Here' component={Modal_Here} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />
    //       <Stack.Screen name='Your_Map' component={Your_Map} options={{ ...TransitionPresets.ModalSlideFromBottomIOS }} />

    //       <Stack.Screen name='Search_Origin' component={Search_Origin} options={{ ...TransitionPresets.ModalPresentationIOS }} />
    //       <Stack.Screen name='Search_Destination' component={Search_Destination} options={{ ...TransitionPresets.ModalPresentationIOS }} />

    //       <Stack.Screen name='Search_Origin_Times' component={Search_Origin_Times} options={{ ...TransitionPresets.ModalPresentationIOS }} />
    //       <Stack.Screen name='Search_Destination_Times' component={Search_Destination_Times} options={{ ...TransitionPresets.ModalPresentationIOS }} />


    //     </Stack.Navigator>
    //     <FlashMessage position={'top'} />
    //   </NavigationContainer>
    // </>



    <View>
      <Button title='Start Services' onPress={onStartServices}></Button>
      <View style={{height:80}}></View>
      <Button title='Start Stop' onPress={onStopServices}></Button>

    </View>


  );
};

export default App;
