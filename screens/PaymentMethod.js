import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/AuthContext';
import { useFonts, Livvic_400Regular, Livvic_700Bold } from '@expo-google-fonts/livvic';
import AppLoading from '../components/Loader';

const BankAccounts = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accounts, setAccounts] = useState([
    { id: '1', number: '1234', bank: 'Bank A', name: 'Savings Account' },
    { id: '2', number: '5678', bank: 'Bank B', name: 'Checking Account' },
  ]);
  
  let [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const styles = getStyles(theme);

  const handleAddAccount = () => {
    setShowForm(true);
    setEditingAccount(null);
    setAccountNumber('');
    setBankName('');
  };

  const handleEditAccount = (account) => {
    setShowForm(true);
    setEditingAccount(account);
    setAccountNumber(account.number);
    setBankName(account.bank);
  };

  const handleDeleteAccount = (accountId) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
          setAccounts(accounts.filter(account => account.id !== accountId));
        }}
      ]
    );
  };

  const generateRandomAccountName = () => {
    const adjectives = ['Quick', 'Smart', 'Bright', 'Swift', 'Easy'];
    const nouns = ['Savings', 'Checking', 'Deposit', 'Transfer', 'Invest'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  const handleSave = () => {
    if (editingAccount) {
      setAccounts(accounts.map(account => 
        account.id === editingAccount.id 
          ? { ...account, number: accountNumber, bank: bankName }
          : account
      ));
    } else {
      const newAccount = {
        id: Date.now().toString(),
        number: accountNumber,
        bank: bankName,
        name: generateRandomAccountName(),
      };
      setAccounts([...accounts, newAccount]);
    }
    setShowForm(false);
    setEditingAccount(null);
    setAccountNumber('');
    setBankName('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={theme === 'light' ? '#000' : '#fff'} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bank Accounts</Text>
        </View>
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.sectionTitle}>Account details</Text>
          <Text style={styles.sectionSubtitle}>Manage your bank accounts below.</Text>
          
          {accounts.map((account) => (
            <View key={account.id} style={styles.accountContainer}>
              <View style={styles.accountInfo}>
                <Icon name="briefcase" color={theme === 'light' ? '#000' : '#fff'} size={24} />
                <View style={styles.accountDetails}>
                  <Text style={styles.accountName}>{account.name}</Text>
                  <Text style={styles.accountNumber}>{account.bank} - {account.number}</Text>
                </View>
              </View>
              <View style={styles.accountActions}>
                <TouchableOpacity onPress={() => handleEditAccount(account)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteAccount(account.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          {!showForm && (
            <TouchableOpacity style={styles.addAccountButton} onPress={handleAddAccount}>
              <Icon name="plus" color={theme === 'light' ? '#f44336' : '#ff7961'} size={24} />
              <Text style={styles.addAccountButtonText}>Add new account</Text>
            </TouchableOpacity>
          )}
          
          {showForm && (
            <View style={styles.formContainer}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>{editingAccount ? 'Edit Account' : 'Add New Account'}</Text>
                <TouchableOpacity onPress={() => setShowForm(false)}>
                  <Icon name="x" color={theme === 'light' ? '#000' : '#fff'} size={24} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Account Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter account number"
                  placeholderTextColor={theme === 'light' ? '#999' : '#666'}
                  keyboardType="numeric"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Bank Name</Text>
                <Picker
                  selectedValue={bankName}
                  style={styles.picker}
                  itemStyle={styles.picker}
                  onValueChange={(itemValue) => setBankName(itemValue)}
                >
                  <Picker.Item label="Select a bank" value="" />
                  <Picker.Item label="Bank A" value="Bank A" />
                  <Picker.Item label="Bank B" value="Bank B" />
                  <Picker.Item label="Bank C" value="Bank C" />
                </Picker>
              </View>
            </View>
          )}
        </ScrollView>
        
        {showForm && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
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
    borderBottomColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginLeft: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#999',
    marginBottom: 20,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDetails: {
    marginLeft: 15,
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
  },
  cardExpiry: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#999',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    color: '#f44336',
    fontFamily: 'Livvic_400Regular',
    marginRight: 15,
  },
  deleteButton: {
    color: theme === 'light' ? '#666' : '#999',
    fontFamily: 'Livvic_400Regular',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme === 'light' ? '#f44336' : '#ff7961',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  addCardButtonText: {
    color: theme === 'light' ? '#f44336' : '#ff7961',
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    marginLeft: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#999',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#000' : '#fff',
    backgroundColor: theme === 'light' ? '#fff' : '#1A1B1E',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
  },
  accountContainer: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  accountDetails: {
    marginLeft: 15,
  },
  accountName: {
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    color: theme === 'light' ? '#000' : '#fff',
  },
  accountNumber: {
    fontSize: 14,
    fontFamily: 'Livvic_400Regular',
    color: theme === 'light' ? '#666' : '#999',
  },
  accountActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme === 'light' ? '#f44336' : '#ff7961',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  addAccountButtonText: {
    color: theme === 'light' ? '#f44336' : '#ff7961',
    fontSize: 16,
    fontFamily: 'Livvic_700Bold',
    marginLeft: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: theme === 'light' ? '#E0E0E0' : '#2C2C2C',
    borderRadius: 8,
    backgroundColor: theme === 'light' ? '#fff' : '#1A1B1E',
    color: theme === 'light' ? '#000' : '#fff',
  },
});

export default BankAccounts;