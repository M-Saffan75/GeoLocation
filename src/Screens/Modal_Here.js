import axios from 'axios'
import { GOOGLE_MAPS_APIKEY } from './Googlemapskeys'
import React, { useState, useRef, useEffect } from 'react'
import MapViewDirections from 'react-native-maps-directions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { StatusBar, StyleSheet, Text, Image, TouchableOpacity, Easing, View, TextInput, Animated, Modal, Button, TouchableHighlight, } from 'react-native'

const Your_Map = () => {

  // 
  const [isMapInteractedWith, setIsMapInteractedWith] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
    styles.ride_details_box,
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

  // 
  const mapRef = useRef()
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [area, setArea] = useState('')
  const [area_dest_here, setArea_dest] = useState('')

  const [dest, setDest] = useState(null);
  const [origin, setOrigin] = useState(null);

  const [time, setTime] = useState('')
  const [duration, setduration] = useState('')


  useEffect(() => {
    if (isFocused) {
      check_coordinates();
    }
  }, [isFocused]);

  setTimeout(function () {
    Distance_Here();
  }, 2000);


  const check_coordinates = async () => {
    // 
    const latitude_save_Time = await AsyncStorage.getItem("latitude_origin_lat_Time");
    const longitude_save_Time = await AsyncStorage.getItem("latitude_origin_lng_Time");
    const area_origin_Time = await AsyncStorage.getItem("data_description_origin_Time");

    setOrigin(`${latitude_save_Time},${longitude_save_Time}`);
    setArea(area_origin_Time)

    console.log('Origin : ', origin, ' ,  Area : ', area_origin_Time)
    
    // 

    const latitude_dest_Time = await AsyncStorage.getItem("latitude_dest_lat_Time");
    const longitude_dest_Time = await AsyncStorage.getItem("latitude_dest_lng_Time");
    const area_destination_Time = await AsyncStorage.getItem("data_description_dest_Time");

    setDest(`${latitude_dest_Time},${longitude_dest_Time}`);
    setArea_dest(area_destination_Time)

    console.log('destination : ', dest, ' ,  Area : ', area_destination_Time)

    // 

  }

  const Distance_Here = async () => {

    const origin = area;
    const destination = area_dest_here;
    const apiKey = 'AIzaSyCJiLKgEG7tD63lXUD-9OY72XkobajQGbg';

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;


    axios.get(apiUrl)
      .then(response => {
        const distance = response.data.routes[0].legs[0].distance.text;
        const duration = response.data.routes[0].legs[0].duration.text;
        console.log(`Distance: ${distance}`);
        console.log(`Duration: ${duration}`);
        setduration(`${duration}`)
        setTime(`${distance}`)
      })
      .catch(error => {
        console.error(error);
      });
  }
  // 

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#eee'} />
      <View style={styles.container}>

        <View style={styles.all_min_Here}>
          <View style={styles.distance_area}>
            <Text style={styles.nama_light}>Distance</Text>
            <Text style={styles.nama_dark}>{time}</Text>
          </View>
          <View style={styles.distance_area}>
            <Text style={styles.nama_light}>Time</Text>
            <Text style={styles.nama_dark}>{duration}</Text>
          </View>
        </View>

        <MapView ref={mapRef} provider={PROVIDER_GOOGLE}
          style={{ height: '100%', width: '100%' }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={handleRegionChange}
          onRegionChangeComplete={handleRegionChangeComplete}
        >

          <MapViewDirections
            origin={origin}
            destination={dest}
            apikey={'AIzaSyCJiLKgEG7tD63lXUD-9OY72XkobajQGbg'}
            strokeWidth={5}
            strokeColor={'blue'}
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

          {origin && (
            <Marker
              coordinate={{
                latitude: Number(origin.split(',')[0]),
                longitude: Number(origin.split(',')[1]),
              }}
            />
          )}

          {dest && (
            <Marker
              coordinate={{
                latitude: Number(dest.split(',')[0]),
                longitude: Number(dest.split(',')[1]),
              }}
            />
          )}

        </MapView>


        {/*  */}
        {!isMapInteractedWith && (
          <Animated.View style={boxStyle}>
            <View>
              <Text style={styles.where_go}><Text style={styles.go}>Where</Text> Do You Want to Go ?</Text>
            </View>

            <View style={{ marginTop: '5%' }}></View>

            <View style={styles.from_area}>
              <View style={styles.Cricle_edit}>
                <MaterialIcons name='keyboard-arrow-up' style={styles.top} />
              </View>
              <View style={styles.inpt_close}>
                <TextInput style={styles.from} placeholderTextColor={'grey'} placeholder='From'
                  onFocus={() => navigation.navigate('Search_Origin_Times')} defaultValue={area} />
              </View>
            </View>

            <View style={styles.from_area}>
              <View style={styles.Cricle_edit}>
                <MaterialIcons name='keyboard-arrow-down' style={styles.top} />
              </View>
              <View style={styles.inpt_close}>
                <TextInput style={styles.from}
                  placeholderTextColor={'grey'} placeholder='Destination'
                  onFocus={() => navigation.navigate('Search_Destination_Times')} defaultValue={area_dest_here} />
              </View>
            </View>

            <View style={styles.btn_here_area}>
              <TouchableOpacity activeOpacity={0.8} style={styles.register_btn} onPress={openModal}>
                <Text style={styles.register_name}>Next</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        {/*  */}

        {/*  */}
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 01 hours 20 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 02 hours 30 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 03 hours 45 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 04 hours 60 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 05 hours 80 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 06 hours 100 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 07 hours 120 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 08 hours 150 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 09 hours 170 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 10 hours 200 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 11 hours 200 km</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} style={styles.text_km}>
                <Text style={styles.text}>Arrangement 12 hours with 200 km</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setModalVisible(closeModal);
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                  style={[styles.button, styles.okButton]}
                  onPress={() => {
                  }}
                >
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/*  */}

      </View>
    </>
  )
}

export default Your_Map

const styles = StyleSheet.create({

  text_km: {
    paddingBottom: 7,
  },

  button: {
    borderRadius: 8,
    padding: 8,
    margin: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  okButton: {
    backgroundColor: '#2ecc71',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  buttonContainer: {
    top: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // 

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modal: {
    padding: 20,
    elevation: 10,
    width: '80%',
    borderRadius: 10,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },

  text: {
    fontSize: 13,
    color: "#000",
    marginBottom: 10,
    fontFamily: 'Ubuntu-Medium'
  },

  // 

  nama_dark: {
    top: 6,
    fontSize: 13,
    color: '#fff',
    letterSpacing: .4,
    fontFamily: "Ubuntu-Medium",
  },

  nama_light: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: .4,
    fontFamily: 'Ubuntu-Light',
  },

  distance_area: {
    alignItems: 'center',
  },

  all_min_Here: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'purple',
    justifyContent: 'space-around',
  },

  // 

  btn_here_area: {
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10%',
    marginTop: '5%'
  },

  register_btn: {
    width: '55%',
    borderRadius: 10,
    marginTop: '5%',
    paddingVertical: 10,
    backgroundColor: 'blue',
  },

  register_name: {
    fontSize: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontFamily: 'Ubuntu-Medium',
  },

  from: {
    width: '90%',
    paddingBottom: -2,
    color: 'black',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Medium',
    borderBottomColor: 'blue',
  },

  from_area: {
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-around',
  },

  close_Here: {
    top: -8,
    height: 27,
    fontSize: 20,
    marginLeft: -10,
    color: 'black',
  },


  close: {
    fontSize: 20,
    // margintop: 28,
    // backgroundColor:'red',
    marginLeft: -10,
    color: 'black',
  },

  inpt_close: {
    left: 12,
    // marginBottom:10,
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  Cricle_edit: {
    width: 24,
    height: 24,
    fontSize: 17,
    borderWidth: 1.5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'blue',
  },

  top: {
    fontSize: 17,
    color: 'blue',
  },

  tops: {
    left: 10,
    fontSize: 22,
    color: 'blue',
  },

  go: {
    fontSize: 20,
    color: 'purple',
    fontFamily: 'Ubuntu-Bold',
  },

  where_go: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Ubuntu-Light',
  },

  ride_details_box: {
    bottom: 0,
    width: '100%',
    elevation: 15,
    height: '40%',
    paddingVertical: 10,
    // alignItems:'center',
    position: 'absolute',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#eee',
  },
  // 
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: "#e5e5e5"
  },
})