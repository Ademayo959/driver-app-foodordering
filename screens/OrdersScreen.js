import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/AuthContext';
import {
  useFonts,
  Livvic_400Regular,
  Livvic_700Bold,
} from '@expo-google-fonts/livvic';
import AppLoading from '../components/Loader';

const History = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = getStyles(theme);

  const historyData = [
    {
      id: '31/01/2023',
      name: 'Nikolas Jackson',
      tripId: '#0CAC6C64',
      pickup: 'Chicken Republic',
      dropoff: '41B Remi Fani Kayode Street',
      distance: '5.36km',
      duration: '10min',
    },
    {
      id: '31/01/2023',
      name: 'Jadon Sancho',
      tripId: '#0CAC6C64',
      pickup: 'Chicken Republic',
      dropoff: '41B Remi Fani Kayode Street',
      distance: '5.36km',
      duration: '10min',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={24} color={theme === 'light' ? '#000' : '#fff'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>History</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Yesterday</Text>
          
          {historyData.map((item, index) => (
            <View key={index} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.tripHeaderLeft}>
                  <Text style={styles.tripName}>{item.name}</Text>
                  <Text style={styles.tripId}>{item.tripId}</Text>
                </View>
                <Text style={styles.tripDate}>{item.id}</Text>
              </View>

              <View style={styles.locationContainer}>
                <View style={styles.locationItem}>
                  <Icon name="circle" size={10} color="#4CAF50" />
                  <Text style={styles.locationText}>{item.pickup}</Text>
                </View>
                <View style={styles.locationItem}>
                  <Icon name="circle" size={10} color="#f44336" />
                  <Text style={styles.locationText}>{item.dropoff}</Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <View style={styles.tripInfo}>
                  <Icon name="repeat" size={14} color={theme === 'light' ? '#666' : '#888'} />
                  <Text style={styles.tripInfoText}>Round Trip</Text>
                </View>
                <View style={styles.tripInfo}>
                  <Icon name="map" size={14} color={theme === 'light' ? '#666' : '#888'} />
                  <Text style={styles.tripInfoText}>{item.distance}</Text>
                </View>
                <View style={styles.tripInfo}>
                  <Icon name="clock" size={14} color={theme === 'light' ? '#666' : '#888'} />
                  <Text style={styles.tripInfoText}>{item.duration}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigation.navigate('RideDetails', { tripId: item.tripId })}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#101112',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme === 'light' ? '#f0f0f0' : '#2C2C2C',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#1E1E1E',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: theme === 'light' ? '#000' : '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tripHeaderLeft: {
    flex: 1,
  },
  tripName: {
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
  },
  tripId: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#888',
    marginTop: 2,
  },
  tripDate: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: '#f44336',
  },
  locationContainer: {
    marginBottom: 15,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#333' : '#ccc',
    marginLeft: 10,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: theme === 'light' ? '#eee' : '#333',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripInfoText: {
    fontSize: 13,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#888',
    marginLeft: 5,
  },
  detailsButton: {
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 8,
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#2C2C2C',
    borderRadius: 8,
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: 'Livvic_700Bold',
    color: '#4A90E2',
  },
});

export default History;

