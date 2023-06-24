import React from 'react'
import { GOOGLE_MAPS_APIKEY } from '../Screens/Googlemapskeys'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const AddressPickup = ({
    placeholderText,
    fetchAddress,
}) => {

    const onPressAddress = (data, details) => {
        console.log(details)
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat, lng)
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />

            <View style={styles.container}>

                <GooglePlacesAutocomplete

                    placeholder={placeholderText}

                    onPress={onPressAddress}
                    fetchDetails={true}

                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                        components: 'country:it',
                    }}
                    styles={{
                        textInput: {
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16,
                            backgroundColor: '#eee',
                            margin: 10,

                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb',
                        },
                        description: {
                            color: 'grey'
                        },
                    }}
                />
            </View>
        </>
    )
}

export default AddressPickup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
})