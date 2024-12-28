import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Livvic_400Regular, Livvic_700Bold } from "@expo-google-fonts/livvic";
import * as Haptics from "expo-haptics";
import { ThemeContext } from "../context/AuthContext";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 150;
 

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    infoCard: {
      backgroundColor: "#F3F4F6",
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },
    statusBadge: {
      backgroundColor: "#FFA500",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
    },
    statusText: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(0,0,0,0.1)",
      gap: 5,
    },
    infoLabel: {
      color: "#000000",
      flex: 1,
    },
    infoValue: {
      color: "#6B7280",
    },
    acceptDeclineContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      paddingVertical: 50,
      backgroundColor: theme === 'dark' ? "#fff" : '#000',
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    ignoreButton: {
      backgroundColor: "#DC2626",
      borderRadius: 25,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      position: 'relative',
      overflow: 'hidden',
    },
    acceptButton: {
      backgroundColor: "#22C55E",
      borderRadius: 25,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: 'relative',
      overflow: 'hidden',
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      flex: 1,
    },
    chevronContainer: {
      position: 'absolute',
      left: 6,  
      width: 44,
      height: 44,
      borderRadius: 25,
      justifyContent: 'center',
      backgroundColor:'#ffffff40',
      alignItems: 'center',
    },
    chevronContainerLeft: {
      position: 'absolute',
      right: 6,  
      width: 44,
      height: 44,
      borderRadius: 25,
      justifyContent: 'center',
      backgroundColor:'#ffffff40',
      alignItems: 'center',
    },
  });

const CallNotification = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Livvic_400Regular,
    Livvic_700Bold,
  });

  const [declinePosition] = useState(new Animated.Value(0));
  const [acceptPosition] = useState(new Animated.Value(0));
  const [declineTextOpacity] = useState(new Animated.Value(1));
  const [acceptTextOpacity] = useState(new Animated.Value(1));
  const [incoming,SetIncoming] = useState(false);

  if (!incoming) return null;
  
  const handleAccept = () => {
    console.log("accepted");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.navigate("Incoming");
  };

  const handleDecline = () => {
    console.log("declined");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const createPanResponder = (position, textOpacity, isAccept) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      // Start fading out text when touch begins
    
    },
    onPanResponderMove: (_, gestureState) => {
      const newPosition = isAccept ? 
        Math.min(Math.max(gestureState.dx, 0), SWIPE_THRESHOLD) :
        Math.max(Math.min(gestureState.dx, 0), -SWIPE_THRESHOLD);
      position.setValue(newPosition);
      if(newPosition < (SWIPE_THRESHOLD / 3)){
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      console.log(newPosition)
    },
    onPanResponderRelease: (_, gestureState) => {
      // Fade text back in on release
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      if (isAccept && gestureState.dx >= SWIPE_THRESHOLD) {
        handleAccept();
      } else if (!isAccept && gestureState.dx <= -SWIPE_THRESHOLD) {
        handleDecline();
      }
      
      Animated.spring(position, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    },
  });

  const declinePanResponder = createPanResponder(declinePosition, declineTextOpacity, false);
  const acceptPanResponder = createPanResponder(acceptPosition, acceptTextOpacity, true);

  if (!loaded) return null;
  
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.acceptDeclineContainer}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Incoming</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Icon name="user" size={20} color={"#000000"} />
            <Text style={styles.infoLabel}>Customer Name</Text>
            <Text style={styles.infoValue}>Jon Snow</Text>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Icon name="map-pin" size={20} color={"#000000"} />
            <Text style={styles.infoLabel}>
              41A Sasegbon Street, GRA, Ikeja
            </Text>
          </View>
        </View>

        <View {...declinePanResponder.panHandlers} style={styles.ignoreButton}>
          <Icon name="chevron-left" size={24} color="#FFFFFF" />
          <Animated.Text style={[styles.buttonText, { opacity: declineTextOpacity }]}>
            Ignore Booking
          </Animated.Text>
          <Animated.View 
            style={[
              styles.chevronContainerLeft,
              {
                transform: [{ translateX: declinePosition }],
              },
            ]}
          >
            <Icon name="chevrons-left" size={24} color="#FFFFFF" />
          </Animated.View>
        </View>

        <View {...acceptPanResponder.panHandlers} style={styles.acceptButton}>
          <Animated.View 
            style={[
              styles.chevronContainer,
              {
                transform: [{ translateX: acceptPosition }],
              },
            ]}
          >
            <Icon name="chevrons-right" size={24} color="#FFFFFF" />
          </Animated.View>
          <Animated.Text style={[styles.buttonText, { opacity: acceptTextOpacity }]}>
            Accept Booking
          </Animated.Text>
          <Icon name="chevron-right" size={24} color="#FFFFFF" />
        </View>
      </View>
    </View>
  );
};

export default CallNotification;