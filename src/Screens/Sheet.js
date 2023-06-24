import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text } from 'react-native';
import { BottomSheet, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Sheet = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['20%', '50%'];

  const handleFocus = () => {
    setIsInputFocused(true);
    sheetRef.current?.expand();
  };

  const handleBlur = () => {
    setIsInputFocused(false);
    sheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Name'
        placeholderTextColor='grey'
        style={styles.inpt}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isInputFocused && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheet
            useRef={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableHandlePanningGesture={true}
            style={styles.modal}
          >
            <BottomSheetScrollView>
              <BottomSheetView>
                <Text>Awesome 🔥</Text>
              </BottomSheetView>
            </BottomSheetScrollView>
          </BottomSheet>
        </GestureHandlerRootView>
      )}
    </View>
  );
};

export default Sheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpt: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

