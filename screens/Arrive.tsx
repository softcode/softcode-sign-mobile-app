import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Config from '../react-native-config';
import styles from '../styles/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  employeeId: number;
}

const Arrive: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [hostId, setHostId] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<Employee[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState({ firstName: false, lastName: false, phone: false, host: false });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateInputs = () => {
    const newErrors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      phone: phone.replace(/[^0-9]/g, '').length < 9,
      host: !host.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      Alert.alert('Error', 'First name, last name, phone number, and host are required.');
      return false;
    }
    return true;
  };

  const fetchHostSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
  
    setIsFetching(true);
    try {
      const response = await axios.get(`${Config.API_URL}/visitor/employee/search`, {
        params: { name: query },
      });
  
      if (response.status === 200) {
        setSuggestions(response.data.slice(0, 3));
      } else {
        console.error('Failed to fetch host suggestions:', response.statusText);
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching host suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsFetching(false);
    }
  };  

  const handleHostChange = (text: string) => {
    setHost(text);
    fetchHostSuggestions(text);
  };

  const handleSuggestionClick = (employee: Employee) => {
    setHost(`${employee.firstName} ${employee.lastName}`);
    setHostId(employee.employeeId);
    setSuggestions([]);
  };

  const handlePhoneChange = (text: string) => {
    const formattedText = text.replace(/[^0-9+-]/g, '');
    setPhone(formattedText);
  
    const digitsOnly = formattedText.replace(/[^0-9]/g, '');
    if (digitsOnly.length >= 9) {
      const digitsOnly = formattedText.replace(/[^0-9]/g, '');
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: digitsOnly.length < 9,
      }));
    }
  };
  
  const handlePhoneBlur = () => {
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: digitsOnly.length < 9,
    }));
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;
  
    const visitorData = {
      visitorFirstName: firstName,
      visitorLastName: lastName,
      visitorOrganizationName: company.trim() === "" ? null : company,
      visitorEmail: email.trim() === "" ? null : email,
      visitorPhoneNumber: phone,
      visitorHostId: hostId,
    };
  
    try {
      const response = await axios.post(`${Config.API_URL}/visitor/create`, visitorData, {
        headers: { 'Content-Type': 'application/json' }
      });

      navigation.navigate('Welcome', { firstName });
      

      setFirstName('');
      setLastName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setHost('');
      setHostId(null);
      setSuggestions([]);
  
    } catch (error) {
      console.error('Error signing up visitor:', error);
      Alert.alert('Error', 'An error occurred while signing up.');
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Sign Up</Text>

      <TextInput style={[styles.input, errors.firstName && styles.inputError]} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      {errors.firstName && <Text style={styles.errorText}>Required</Text>}

      <TextInput style={[styles.input, errors.lastName && styles.inputError]} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      {errors.lastName && <Text style={styles.errorText}>Required</Text>}

      <TextInput style={styles.input} placeholder="Organization Name (Optional)" value={company} onChangeText={setCompany} />

      <TextInput style={styles.input} placeholder="Email (Optional)" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Phone Number"
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>Phone must have at least 9 digits.</Text>}
          
      <View style={styles.formGroup}>
        <TextInput
          style={[styles.input, errors.host && styles.inputError]}
          placeholder="Host Name"
          value={host}
          onChangeText={handleHostChange}
          autoCapitalize="words"
        />
        {errors.host && <Text style={styles.errorText}>Required</Text>}

        {isFetching && <Text>Loading...</Text>}
        <View style={styles.suggestionsContainer}>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.employeeId.toString()} 
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => handleSuggestionClick(item)}>
                  <Text style={styles.suggestionText}>{item.firstName} {item.lastName}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Arrive;
