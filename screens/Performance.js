import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
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

const ReviewCard = ({ name, date, review, avatar }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewUser}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.reviewDate}>{date}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="more-vertical" size={20} color={theme === 'light' ? '#666' : '#888'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.reviewText}>{review}</Text>
    </View>
  );
};

const Performance = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = getStyles(theme);

  const reviews = [
    {
      name: 'Arya Stark',
      date: '25/06/2024',
      review: 'Really convenient and the points system helps benefit loyalty. Some mild glitches here and there, but nothing too egregious. Obviously needs to roll out to more remote.',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      name: 'Tyrion Lannister',
      date: '22/06/2024',
      review: 'Been a life saver for keeping our sanity during the pandemic, although they could improve some of their ui and how they handle specials as it often is unclear how to use them or everything is sold out so fast it feels a bit bait and switch. Still Id be stir crazy and losing track of days without so...',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      name: 'Daenerys Targaryen',
      date: '21/06/2024',
      review: 'Got an intro offer of 50% off first order that did not work.... I have scaled the app to find a contact us button but only a spend with us button available.',
      avatar: '/placeholder.svg?height=40&width=40',
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
          <Text style={styles.headerTitle}>Performance</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  reviewCard: {
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#1A1B1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
  },
  reviewDate: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#888',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#333' : '#ccc',
    lineHeight: 20,
  },
});

export default Performance;

