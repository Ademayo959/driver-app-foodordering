import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/AuthContext';
import {
  useFonts,
  Livvic_400Regular,
  Livvic_700Bold,
} from '@expo-google-fonts/livvic';
import AppLoading from '../components/Loader';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');
const vehicleTypes = ['Bicycle', 'Car', 'Tricycle', 'Bike'];

const CarView = ({ title, imageUrl, onEdit }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.carViewContainer} onPress={onEdit}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.carImage}
          resizeMode="cover"
        />
        <View style={styles.carViewOverlay}>
          <Icon name="edit-2" size={15} color="#FFFFFF" />
          <Text style={styles.carViewTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CarType = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [vehicleType, setVehicleType] = useState('Car');
  const [plateNumber, setPlateNumber] = useState('ABC123');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingView, setEditingView] = useState(null);
  const [carViews, setCarViews] = useState([
    { title: 'Front Side of Vehicle', image: 'https://via.placeholder.com/300x200.png?text=Front' },
    { title: 'Left Side of Vehicle', image: 'https://via.placeholder.com/300x200.png?text=Left' },
    { title: 'Right Side of Vehicle', image: 'https://via.placeholder.com/300x200.png?text=Right' },
    { title: 'Back Side of Vehicle', image: 'https://via.placeholder.com/300x200.png?text=Back' },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = getStyles(theme);

  const handleEditView = (index) => {
    setEditingView(index);
    setIsEditModalVisible(true);
  };

  const handleUpdateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedViews = [...carViews];
      updatedViews[editingView].image = result.assets[0].uri;
      setCarViews(updatedViews);
      setIsEditModalVisible(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Image source={require('../assets/profilebanner.png')} style={styles.bannerImage} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="chevron-left" size={24} color="#fff" />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.headerTitle}>Vehicle Details</Text>
          <TouchableOpacity onPress={toggleEditing} style={styles.editButton}>
            <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>

          {isEditing && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vehicle Type</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={vehicleType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setVehicleType(itemValue)}
                    mode="dropdown"
                  >
                    {vehicleTypes.map((type) => (
                      <Picker.Item key={type} label={type} value={type} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Plate Number</Text>
                <TextInput
                  style={styles.input}
                  value={plateNumber}
                  onChangeText={setPlateNumber}
                  placeholder="Enter plate number"
                  placeholderTextColor={theme === 'light' ? '#999' : '#666'}
                />
              </View>
            </>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Images</Text>
            <View style={styles.carViewsGrid}>
              {carViews.map((view, index) => (
                <CarView
                  key={index}
                  title={view.title}
                  imageUrl={view.image}
                  onEdit={() => handleEditView(index)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Image</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleUpdateImage}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.modalCancelButtonText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#101112',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  bannerImage: {
    width: width,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 220,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: theme === 'light' ? '#000' : '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#000' : '#fff',
  },
  carViewsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  carViewContainer: {
    width: '48%',
    marginBottom: 16,
  },
  imageContainer: {
    aspectRatio: 4 / 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  carViewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    flexDirection: 'row',
  },
  carViewTitle: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    top: 220,
    right: 20,
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#1A1B1E',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Livvic_400Regular',
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
  },
  modalCancelButtonText: {
    color: theme === 'light' ? '#000' : '#fff',
  },
});

export default CarType;

