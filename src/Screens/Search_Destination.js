import React, { useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const Search_Destination = () => {

    const navigation = useNavigation();

    const inputRef = useRef(null);

    useEffect(() => {
        check_coordinates_Dest()
        setTimeout(() => {
            inputRef.current?.focus();
        }, 1);
    }, [navigation])

    const check_coordinates_Dest = async () => {

        let latitude_dest = await AsyncStorage.getItem("latitude_dest_lat");
        let longitude_dest = await AsyncStorage.getItem("latitude_dest_lng");
        let area_destination = await AsyncStorage.getItem("data_description_dest");

        if (latitude_dest && longitude_dest && area_destination != null) {
            console.log('Latitude_Dest', latitude_dest)
            console.log('Longitude_Dest', longitude_dest)
            console.log('Area_Destinationination', area_destination)
        }
        else {
            console.log('Nothing')
        }
    }

    const address_dest = async (data, details) => {

        const latitude = details.geometry.location.lat
        const longitude = details.geometry.location.lng
        const area_here = data.description

        await AsyncStorage.setItem('latitude_dest_lat', latitude.toString());
        await AsyncStorage.setItem('latitude_dest_lng', longitude.toString());
        await AsyncStorage.setItem('data_description_dest', area_here.toString());
        navigation.goBack()
        return longitude & latitude & area_here;

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
                        onPress={address_dest}

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

export default Search_Destination

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