import React, { useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { GOOGLE_MAPS_APIKEY } from '../GOOGLE_API/Googlemapskeys';

const Track = () => {

    const [state, setState] = useState({

        PickupCords: {
            latitude: 30.7046,
            longitude: 76.7179,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },

        droplocationcords: {
            latitude: 30.7333,
            longitude: 76.7794,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

    });

    const { PickupCords, droplocationcords } = state

    const mapRef = useRef()

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />

            <View style={styles.container}>

                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={PickupCords}>
                    <Marker coordinate={PickupCords} />
                    <Marker coordinate={droplocationcords} />
                    <MapViewDirections
                        origin={PickupCords}
                        destination={droplocationcords}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#1b1b1b"
                        optimizeWaypoints={true}
                        onReady={result => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 30,
                                    bottom: 300,
                                    left: 30,
                                    top: 100,
                                }
                            })
                        }}
                    />
                </MapView>

            </View>
        </>
    )
}

export default Track

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#fff"
    },
})