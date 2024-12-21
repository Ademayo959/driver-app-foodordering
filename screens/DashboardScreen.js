import React, { useState, useRef, useContext, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../context/AuthContext";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Livvic_400Regular, Livvic_700Bold } from "@expo-google-fonts/livvic";
import MenuOverlay from "../components/MenuOverlay";

const { width } = Dimensions.get("window");

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "light" ? "#FFFFFF" : "#101112",
    },
    container: {
      flex: 1,
      backgroundColor: theme === "light" ? "#FFFFFF" : "#101112",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "#000",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
      paddingTop: Platform.OS === "android" ? 40 : 20,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuButton: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: theme === "light" ? "#F5F5F5" : "#2A2A2A",
      justifyContent: "center",
      alignItems: "center",
    },
    iconButton: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      color: theme === "light" ? "#000" : "#fff",
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Livvic_700Bold",
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    onlineStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    onlineDotContainer : {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    onlineDot: {
      width: 19,
      height: 19,
      borderRadius: 40,
      backgroundColor: "#4CD964",
      marginRight: 5,
    },
    onlineText: {
      color: "#4CD964",
      fontSize: 20,
      fontFamily: "Livvic_700Bold",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    balanceCard: {
      backgroundColor: "#ff3b30",
      borderRadius: 15,
      padding: 20,
      marginTop: 20,
    },
    balanceLabel: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 14,
      fontFamily: "Livvic_400Regular",
    },
    balanceAmount: {
      color: "white",
      fontSize: 32,
      fontWeight: "bold",
      marginVertical: 10,
      fontFamily: "Livvic_700Bold",
    },
    withdrawButton: {
      backgroundColor: "white",
      borderRadius: 25,
      padding: 15,
      alignItems: "center",
    },
    withdrawText: {
      color: "#ff3b30",
      fontWeight: "600",
      fontFamily: "Livvic_700Bold",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    statBox: {
      backgroundColor: theme === "light" ? "#F5F5F5" : "#222",
      borderRadius: 15,
      padding: 15,
      width: "30%",
      alignItems: "center",
    },
    statLabel: {
      color: theme === "light" ? "#666" : "#999",
      fontSize: 12,
      textAlign: "center",
      fontFamily: "Livvic_400Regular",
    },
    statValue: {
      color: theme === "light" ? "#000" : "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 5,
      fontFamily: "Livvic_700Bold",
    },
    deliverySection: {
      marginTop: 20,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    sectionTitle: {
      color: theme === "light" ? "#000" : "#fff",
      fontSize: 18,
      fontWeight: "600",
      fontFamily: "Livvic_700Bold",
    },
    viewAll: {
      color: theme === "light" ? "#666" : "#999",
      fontSize: 14,
      fontFamily: "Livvic_400Regular",
    },
    deliveryItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#F5F5F5" : "#222",
      borderRadius: 15,
      padding: 15,
    },
    packageIcon: {
      backgroundColor: "#ff3b30",
      borderRadius: 25,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    deliveryInfo: {
      flex: 1,
      marginLeft: 15,
    },
    packageTitle: {
      color: theme === "light" ? "#000" : "#fff",
      fontSize: 16,
      fontWeight: "500",
      fontFamily: "Livvic_700Bold",
    },
    packageStatus: {
      color: theme === "light" ? "#666" : "#999",
      fontSize: 14,
      fontFamily: "Livvic_400Regular",
    },
    deliveryTime: {
      color: theme === "light" ? "#666" : "#999",
      fontSize: 12,
      fontFamily: "Livvic_400Regular",
    },
    alertBox: {
      marginTop: 20,
      backgroundColor: theme === "light" ? "#F5F5F5" : "#2A2A2A",
      borderRadius: 15,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    alertContent: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
    },
    alertIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#DC2626",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },
    alertTextContainer: {
      flex: 1,
      marginRight: 10,
    },
    alertTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme === "light" ? "#000" : "#fff",
      fontFamily: "Livvic_700Bold",
      marginBottom: 4,
    },
    alertDescription: {
      fontSize: 14,
      color: theme === "light" ? "#666" : "#999",
      fontFamily: "Livvic_400Regular",
    },
  });

const HomeScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const translateX = useRef(new Animated.Value(-width)).current;
  const mainContentTranslateX = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Livvic_400Regular,
    Livvic_700Bold,
  });

  const styles = useMemo(() => getStyles(theme), [theme]);

  const toggleMenu = () => {
    const toValue = isMenuOpen ? -width : 0;
    const contentToValue = isMenuOpen ? 0 : width * 0.7;
    const opacityToValue = isMenuOpen ? 0 : 0.5;

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: opacityToValue,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(mainContentTranslateX, {
        toValue: contentToValue,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsMenuOpen(!isMenuOpen);
    });
  };

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        translateX={translateX}
      />

      {isMenuOpen && (
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { zIndex: 999 }]}
          activeOpacity={1}
          onPress={toggleMenu}
        >
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          />
        </TouchableOpacity>
      )}

      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateX: mainContentTranslateX }],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <Icon
                name="menu"
                size={24}
                color={theme === "light" ? "#000" : "#fff"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>
            {" "}
            <View style={styles.onlineStatus}>
              <View style={styles.onlineDotContainer}>
                <View style={styles.onlineDot} />
              </View>
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
              <Icon
                name={theme === "light" ? "sun" : "moon"}
                color={theme === "light" ? "#000" : "#fff"}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              style={styles.iconButton}
            >
              <Icon
                name="bell"
                color={theme === "light" ? "#000" : "#fff"}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>₦ 250,000.24</Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Withdraw Money</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.alertBox}
            onPress={() => navigation.navigate("Info")}
          >
            <View style={styles.alertContent}>
              <View style={styles.alertIconContainer}>
                <Icon name="info" size={24} color="#fff" />
              </View>
              <View style={styles.alertTextContainer}>
                <Text style={styles.alertTitle}>Verify Account</Text>
                <Text style={styles.alertDescription}>
                  Tap here to Upload Details to Verify Account
                </Text>
              </View>
              <Icon
                name="chevron-right"
                size={24}
                color={theme === "light" ? "#000" : "#fff"}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's{"\n"}Earning</Text>
              <Text style={styles.statValue}>₦500</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's{"\n"}Delivery</Text>
              <Text style={styles.statValue}>10</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's{"\n"}Login Hrs</Text>
              <Text style={styles.statValue}>17 Hrs</Text>
            </View>
          </View>

          <View style={styles.deliverySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>On Going Delivery</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.deliveryItem}
              onPress={() => navigation.navigate("OnGoingDelivery")}
            >
              <View style={styles.packageIcon}>
                <Icon name="package" size={20} color="white" />
              </View>
              <View style={styles.deliveryInfo}>
                <Text style={styles.packageTitle}>Package 24 to 41B</Text>
                <Text style={styles.packageStatus}>Going on</Text>
              </View>
              <Text style={styles.deliveryTime}>28 Feb, 10:10 AM</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;
