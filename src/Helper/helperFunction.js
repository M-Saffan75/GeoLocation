import { showMessage } from "react-native-flash-message";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";


export const getCurrentLocation = () => 
    new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                resolve(cords)
            },
            error => {
                reject(error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        )
    })


export const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('WhenInUse');
            if (permissionStatus === 'granted') {
                return resolve('granted')
            }
            reject('permission not granted')
        } catch (error) {
            return reject(error)
        }

    }

    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve('granted')
        }
        return reject('Location Permission Denied')
    }).catch((error) => {
        console.log('Access Location permission error : ', error)
    })
})

const showError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon: 'danger'
    })
}

const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success'
    })
}

export {
    showError,
    showSuccess
}