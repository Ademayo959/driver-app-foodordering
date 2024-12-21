import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DriverRegistration({ navigation }) {
  const [activeTab, setActiveTab] = useState('private');
  const [formData, setFormData] = useState({
    joinAs: '',
    firstName: '',
    lastName: '',
    gender: '',
    licenseNumber: '',
    issueDate: '',
    expiryDate: '',
    aadharNumber: '',
  });

  const renderPrivateInfo = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Personal Information</Text>
      <Text style={styles.formSubtitle}>
        Only your first name and vehicle details are visible to clients during the booking
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          I want to join Tiva as: <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select option</Text>
          <Feather name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          First name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#666"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Last name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#666"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Gender <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select gender</Text>
          <Feather name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.helperText}>
        If you are a female gender, we will send communications specific to females
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setActiveTab('drivers')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDriversInfo = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Drivers Information</Text>
      <Text style={styles.formSubtitle}>
        Your national ID and license details will kept private
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Driving License Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter driving license number"
          placeholderTextColor="#666"
          value={formData.licenseNumber}
          onChangeText={(text) => setFormData({ ...formData, licenseNumber: text })}
        />
      </View>

      <View style={styles.dateContainer}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>
            Issue Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateInputText}>Select date</Text>
            <Feather name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
          <Text style={styles.label}>
            Expiry Date <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateInputText}>Select date</Text>
            <Feather name="calendar" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Front Side of Card <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Feather name="upload" size={24} color="#666" />
          <Text style={styles.uploadText}>Click to Upload Front Side of Card</Text>
          <Text style={styles.uploadSubtext}>(Max. File size: 25 MB)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Back Side of Card <Text style={styles.required}>*</Text>
        </Text>
        <TouchableOpacity style={styles.uploadBox}>
          <Feather name="upload" size={24} color="#666" />
          <Text style={styles.uploadText}>Click to Upload Back Side of Card</Text>
          <Text style={styles.uploadSubtext}>(Max. File size: 25 MB)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Aadhar Card Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar card number"
          placeholderTextColor="#666"
          value={formData.aadharNumber}
          onChangeText={(text) => setFormData({ ...formData, aadharNumber: text })}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.redCircle} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.brandText}>
          <Text style={styles.brandHighlight}>TIVA</Text> DRIVER
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'private' && styles.activeTab]}
          onPress={() => setActiveTab('private')}
        >
          <Text style={styles.tabText}>Private info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'drivers' && styles.activeTab]}
          onPress={() => setActiveTab('drivers')}
        >
          <Text style={styles.tabText}>Drivers info</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'private' ? renderPrivateInfo() : renderDriversInfo()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101112',
  },
  redCircle: {
    position: 'absolute',
    top: -125,
    right: -125,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#DC2626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
  },
  backButton: {
    marginRight: 15,
  },
  brandText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  brandHighlight: {
    color: '#DC2626',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#DC2626',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontSize: 16,
  },
  required: {
    color: '#DC2626',
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 18,
    color: '#FFFFFF',
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#666',
    fontSize: 18,
  },
  helperText: {
    color: '#666',
    fontSize: 14,
    marginTop: -10,
    marginBottom: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInputText: {
    color: '#666',
    fontSize: 18,
  },
  uploadBox: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 30,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  uploadSubtext: {
    color: '#666',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#DC2626',
    borderRadius: 30,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

