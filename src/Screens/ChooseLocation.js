import React, { useState } from 'react'
import AddressPickup from '../Components/AddressPickup'
import { useNavigation } from '@react-navigation/native'
import { showError, showSuccess } from '../Helper/helperFunction'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const ChooseLocation = (props) => {

    const navigation = useNavigation()


    const [state, setState] = useState({
        pickupCords: {},
        destinationCords: {}
    })

    const checkValid = () => {
        if (Object.keys(pickupCords).length === 0) {
            showError('Enter Your Pickup Location')
            return false
        }
        if (Object.keys(destinationCords).length === 0) {
            showError('Enter Your Destination Location')
            return false
        }
        return true
    }

    const onDone = () => {

        const indvalid = checkValid()
        if (indvalid) {
            props.route.params.getCordinates({
                pickupCords,
                destinationCords,
            })
            showSuccess('You Can Back Now')
            navigation.goBack()
        }
    }

    const { pickupCords, destinationCords } = state

    const fetchAddressCords = (lat, lng) => {
        setState({
            ...state, pickupCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    const fetchDestinationCords = (lat, lng) => {
        setState({
            ...state, destinationCords: {
                latitude: lat,
                longitude: lng
            }
        })
    }

    console.log('props', props)
    // console.log('Pickup Cords', pickupCords)
    // console.log('Destination Cords', destinationCords)

    return (
        <View style={styles.container}>

            <ScrollView style={{ flex: 1, padding: 14, backgroundColor: '#fff' }} keyboardShouldPersistTaps='handled'>
                <AddressPickup placeholderText='Enter Pickup Location' fetchAddress={fetchAddressCords} />

                <View style={{ marginBottom: '5%' }}></View>

                <AddressPickup placeholderText='Enter Destination Location' fetchAddress={fetchDestinationCords} />
                <TouchableOpacity activeOpacity={0.4} style={styles.btn} onPress={onDone}>
                    <Text style={styles.btn_text}>Done</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

export default ChooseLocation

const styles = StyleSheet.create({

    btn: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#000",
        marginVertical: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btn_text: {
        color: '#000',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
})