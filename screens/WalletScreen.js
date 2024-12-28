import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ThemeContext } from "../context/AuthContext";
import {
  useFonts,
  Livvic_400Regular,
  Livvic_700Bold,
} from "@expo-google-fonts/livvic";
import AppLoading from "../components/Loader";
import Svg, { Path } from "react-native-svg";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const ActionButton = ({ icon, title, subtitle }) => {
  const styles = getStyles("dark"); // Always dark theme for buttons

  return (
    <View style={styles.actionButton}>
      <View style={styles.actionIcon}>
        <Icon name={icon} size={24} color="#fff" />
      </View>
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionSubtitle}>{subtitle}</Text>
    </View>
  );
};

const MenuItem = ({ title, onPress }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemText}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#4169E1" />
    </TouchableOpacity>
  );
};

const DecorativeLine = () => (
  <Svg width={width} height="40" style={StyleSheet.absoluteFill}>
    <Path
      d="M0,20 Q80,40 160,20 T320,20"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

const MyAccount = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = getStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Account</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.balanceCard}>
            <DecorativeLine />
            <Text style={styles.balanceLabel}>Total balance</Text>
            <Text style={styles.balanceAmount}>N250,000.01</Text>
            <View style={styles.actionsGrid}>
              <ActionButton
                icon="file-text"
                title="Wallet"
                subtitle="Statement"
              />
              <ActionButton icon="send" title="Send" subtitle="Amount" />
              <ActionButton
                icon="download"
                title="Received"
                subtitle="Amount"
              />
            </View>
          </View>

          <MenuItem
            title="My Performance"
            onPress={() => navigation.navigate("Performance")}
          />
          <MenuItem
            title="Your Plan and Bank Details"
            onPress={() => navigation.navigate("PaymentMethods")}
          />
          <MenuItem
            title="Update Vehicle"
            onPress={() => navigation.navigate("CarType")}
          />
          <MenuItem title="My Documents"
          onPress={() => navigation.navigate("Info")}
          
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "light" ? "#FFFFFF" : "#101112",
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: "Livvic_700Bold",
      color: theme === "light" ? "#000" : "#fff",
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    balanceCard: {
      backgroundColor: "#ff3b30",
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      overflow: "hidden",
    },
    balanceLabel: {
      fontSize: 16,
      fontFamily: "Livvic_400Regular",
      color: "#fff",
      opacity: 0.8,
    },
    balanceAmount: {
      fontSize: 32,
      fontFamily: "Livvic_700Bold",
      color: "#fff",
      marginVertical: 8,
    },
    actionsGrid: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      backgroundColor: "#1A1B1E",
      borderRadius: 12,
      padding: 16,
    },
    actionButton: {
      alignItems: "center",
      width: "25%",
    },
    actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#2C2D30",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    actionTitle: {
      fontSize: 12,
      fontFamily: "Livvic_400Regular",
      color: "#fff",
      textAlign: "center",
    },
    actionSubtitle: {
      fontSize: 12,
      fontFamily: "Livvic_400Regular",
      color: "#666",
      textAlign: "center",
    },
    menuItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme === "light" ? "#E0E0E0" : "#1A1B1E",
    },
    menuItemText: {
      fontSize: 16,
      fontFamily: "Livvic_400Regular",
      color: theme === "light" ? "#000" : "#fff",
    },
  });

export default MyAccount;
