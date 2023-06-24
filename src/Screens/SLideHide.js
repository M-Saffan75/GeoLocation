import React, { useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Text, View, Animated , Easing } from 'react-native'

export default Sheet = () => {


    const [isMapInteractedWith, setIsMapInteractedWith] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;

    const handleRegionChange = () => {
        setIsMapInteractedWith(true);
        Animated.timing(slideAnimation, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const handleRegionChangeComplete = () => {
        setIsMapInteractedWith(false);
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    const boxStyle = [
        styles.box,
        {
            transform: [
                {
                    translateY: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                    }),
                },
            ],
        },
    ];

    return (
        <>
            <View style={styles.container}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onRegionChange={handleRegionChange}
                    onRegionChangeComplete={handleRegionChangeComplete}
                />
                {!isMapInteractedWith && (
                    <Animated.View style={boxStyle}>
                        <Text style={styles.box_text}>
                            react-native-maps provides a Map component that uses Google Maps on Android and Apple Maps or Google Maps on iOS. No additional setup is required when testing your project using Expo Go. However, to deploy the app binary on app stores additional steps are required for Google Maps.
                        </Text>
                    </Animated.View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({

    box_text: {
        padding: 10,
        fontSize: 15,
        color: '#1b1b1b',
        letterSpacing: 1,
        textAlign: 'center',
    },

    box: {
        bottom: 0,
        width: '100%',
        height: '40%',
        position: 'absolute',
        backgroundColor: '#eee',
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        borderTopRightRadius: 20,
    },
    container: {
        height: '100%',
        width: '100%',
    },
})
