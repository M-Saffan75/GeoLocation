import ImagePath from '../Constants/ImagePath'
import MapView, { Marker } from 'react-native-maps'
import { GOOGLE_MAPS_APIKEY } from './Googlemapskeys'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useRef, useEffect } from 'react'
import MapViewDirections from 'react-native-maps-directions'
import { getCurrentLocation, locationPermission } from '../Helper/helperFunction'
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = () => {

    const navigation = useNavigation()

    useEffect(() => {
        getLiveLocation();
    }), [];

    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const res = await getCurrentLocation()
            console.log('Response===>', res)
        }
    }

    const mapRef = useRef()
    const [state, setState] = useState({

        curLoc: {
            latitude: 30.7046,
            longitude: 76.7794,
        },

        destinationCords: { latitude: 0, longitude: 0, }

    });

    const { curLoc, destinationCords } = state


    const onPressLocation = () => {
        navigation.navigate('ChooseLocation', { getCordinates: fetchValues })
    }

    const fetchValues = (data) => {
        setState({
            curLoc: {
                latitude: data.pickupCords.latitude,
                longitude: data.pickupCords.longitude,
            },
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            },
        })
        console.log('Data ===>>', data)
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />

            <View style={styles.container}>

                <View style={styles.map_here_container}>
                    <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        initialRegion={{
                            ...curLoc,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}>

                        <Marker coordinate={curLoc} image={ImagePath.icCurLoc} />

                        {Object.keys(destinationCords).length > 0 && (
                            <Marker coordinate={destinationCords} image={ImagePath.icGreenLoc} />
                        )
                        }

                        {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                            origin={curLoc}
                            destination={destinationCords}
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
                        )
                        }
                    </MapView>
                </View>
                <View style={styles.bottomCard}>
                    <Text style={styles.where}>Where Are You Going.. ?</Text>
                    <TouchableOpacity
                        onPress={onPressLocation}
                        style={styles.inpuStyle}
                    >
                        <Text style={styles.where}>Choose your location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({

    where: {
        color: 'black',
    },

    container: {
        flex: 1,
    },

    map_here_container: {
        flex: 1,
    },

    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
})