import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Linking,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Icon from "react-native-vector-icons/Feather";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Livvic_400Regular, Livvic_700Bold } from "@expo-google-fonts/livvic";
import AppLoading from "../components/Loader";
import { ThemeContext } from "../context/AuthContext";
import * as Location from "expo-location";

const { width } = Dimensions.get("window");

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2c2c2c' }],
  },
];

const CustomMarker = ({ icon, color }) => (
  <View
    style={{
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: 8,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: color,
    }}
  >
    <Icon name={icon} size={20} color={color} />
  </View>
);

const TrackOrderScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [shopLocation, setShopLocation] = useState(null);
  const [homeLocation, setHomeLocation] = useState(null);
  const mapRef = useRef(null);

  const GOOGLE_MAPS_API_KEY = "AIzaSyADUgvqdCAHwvxaJaZVJCM7D6ozWai3lQY";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setShopLocation({
        latitude: location.coords.latitude + 0.04,
        longitude: location.coords.longitude + 0.04,
      });
      setHomeLocation({
        latitude: location.coords.latitude - 0.01,
        longitude: location.coords.longitude - 0.01,
      });
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && shopLocation && homeLocation && mapRef.current) {
      mapRef.current.fitToCoordinates(
        [currentLocation, shopLocation, homeLocation],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [currentLocation, shopLocation, homeLocation]);

  const handlePhoneCall = async () => {
    setIsLoading(true);
    try {
      await Linking.openURL('tel:+2349163169949');
    } catch (error) {
      console.error('Failed to make the call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#101112',
    },
    container: {
      flex: 1,
    },
    headerBelow: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      color: theme === 'light' ? '#000000' : '#FFFFFF',
      fontWeight: 'bold',
    },
    map: {
      width: width,
      height: width * 0.5,
    },
    contentContainer: {
      padding: 20,
    },
    infoCard: {
      backgroundColor: theme === 'light' ? '#F3F4F6' : 'rgba(32,33,35,0.9)',
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },
    statusBadge: {
      backgroundColor: '#FFA500',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    statusText: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 12,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
      gap:5
    },
    infoLabel: {
      color: theme === 'light' ? '#000000' : '#FFFFFF',
      flex: 1,
    },
    infoValue: {
      color: theme === 'light' ? '#6B7280' : '#9CA3AF',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme === 'light' ? '#F3F4F6' : 'rgba(32,33,35,0.9)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    callButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    callButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme === 'light' ? '#F3F4F6' : 'rgba(32,33,35,0.9)',
      borderRadius: 25,
      padding: 12,
      marginHorizontal: 8,
    },
    callButtonText: {
      color: '#B25E09',
      marginLeft: 8,
    },
    bottomButton: {
      backgroundColor: '#DC2626',
      borderRadius: 25,
      padding: 16,
      margin: 20,
    },
    bottomButtonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    acceptDeclineContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: theme === 'light' ? '#FFFFFF' : '#101112',
    },
    ignoreButton: {
      backgroundColor: '#DC2626',
      borderRadius: 25,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    acceptButton: {
      backgroundColor: '#22C55E',
      borderRadius: 25,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerBelow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" color={theme === 'light' ? '#000000' : '#FFFFFF'} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Incoming</Text>
        </View>

        {currentLocation && (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            customMapStyle={theme === 'light' ? [] : darkMapStyle}
          >
            <MapViewDirections
              origin={shopLocation}
              destination={homeLocation}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={4}
              strokeColor="#22C55E"
            />
            <MapViewDirections
              origin={currentLocation}
              destination={shopLocation}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={8}
              strokeColor="#FDB813"
            />

            <Marker coordinate={currentLocation}>
              <CustomMarker icon="navigation" color="#FDB813" />
            </Marker>
            <Marker coordinate={shopLocation}>
              <CustomMarker icon="shopping-bag" color="#DC2626" />
            </Marker>
            <Marker coordinate={homeLocation}>
              <CustomMarker icon="home" color="#22C55E" />
            </Marker>
          </MapView>
        )}

        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Incoming</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Icon name="user" size={20} color={theme === 'light' ? '#000000' : '#FFFFFF'} />
                <Text style={styles.infoLabel}>Customer Name</Text>
                <Text style={styles.infoValue}>Jon Snow</Text>
              </View>

              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Icon name="map-pin" size={20} color={theme === 'light' ? '#000000' : '#FFFFFF'} />
                <Text style={styles.infoLabel}>41A Sasegbon Street, GRA, Ikeja</Text>
              </View>
            </View>
 

            
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.goBack()}>
          <Text style={styles.bottomButtonText}>Okay</Text>
        </TouchableOpacity>
        <View style={styles.acceptDeclineContainer}>
          <TouchableOpacity style={styles.ignoreButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Ignore Booking</Text>
            <Icon name="chevrons-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.replace('TrackOrder')}>
            <Icon name="chevron-right" size={24} color="#FFFFFF" />
            <Text style={styles.buttonText}>Accept Booking</Text>
            <Icon name="chevrons-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrderScreen;

