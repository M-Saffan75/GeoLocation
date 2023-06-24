import React, { useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Search_Origin_Times = () => {

    const navigation = useNavigation();

    const inputRef = useRef(null);

    useEffect(() => {
        caheck_coordinates()
        setTimeout(() => {
            inputRef.current?.focus();
        }, 1);
    }, [navigation])

    const caheck_coordinates = async () => {

        const latitude_save_Time = await AsyncStorage.getItem("latitude_origin_lat_Time");
        const longitude_save_Time = await AsyncStorage.getItem("latitude_origin_lng_Time");
        const area_origin_Time = await AsyncStorage.getItem("data_description_origin_Time");

        if (latitude_save_Time && longitude_save_Time != null) {
            console.log('Latitude', latitude_save_Time)
            console.log('Longitude', longitude_save_Time)
            console.log('Area_Destination', area_origin_Time)
        }
        else {
            console.log('Nothing')
        }
    }

    const address = async (data, details) => {

        const latitude_Time = details.geometry.location.lat
        const longitude_Time = details.geometry.location.lng
        const area_here_Time = data.description

        await AsyncStorage.setItem('latitude_origin_lat_Time', latitude_Time.toString());
        await AsyncStorage.setItem('latitude_origin_lng_Time', longitude_Time.toString());
        await AsyncStorage.setItem('data_description_origin_Time', area_here_Time.toString());
        navigation.goBack()
        return latitude_Time & longitude_Time & area_here_Time;
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />
            <View style={styles.container}>
                <View style={styles.short_container}>
                    <FontAwesome5 name='map-marker-alt' style={styles.map_here} />
                    <GooglePlacesAutocomplete
                        placeholder='Where You Want To Go'
                        ref={inputRef}
                        fetchDetails={true}
                        onPress={address}

                        query={{
                            key: 'AIzaSyCJiLKgEG7tD63lXUD-9OY72XkobajQGbg',
                            language: 'en',
                            // types: '(cities)',
                            // components: 'country:it',
                        }}
                        styles={{
                            textInputContainer: {
                                marginHorizontal: 10,
                                marginVertical: 20,
                                borderRadius: 6,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                                borderBottomWidth1: 2,
                                borderBottomColor: 'red',
                            },

                            textInput: {
                                fontSize: 16,
                                borderRadius: 5,
                                color: '#5d5d5d',
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey',
                            },

                            listView: {
                                width: '100%',
                                zIndex: 1,
                                top: -10,
                            },
                            description: {
                                color: '#5d5d5d',
                            },
                        }}
                        textInputProps={{
                            placeholderTextColor: 'grey'
                        }}
                    />
                </View>
            </View>
        </>
    )
}

export default Search_Origin_Times

const styles = StyleSheet.create({

    short_container: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: 10,
    },

    map_here: {
        fontSize: 25,
        color: 'grey',
        top: -7,
    },

    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
})