import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';

const Arrive: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState({ firstName: false, lastName: false, phone: false, host: false });

  const validateInputs = () => {
    const newErrors = {
      firstName: !firstName.trim(),
      lastName: !lastName.trim(),
      phone: !phone.trim(),
      host: !host.trim(),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      Alert.alert('Error', 'First name, last name, phone number, and host are required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const visitorData = {
      visitorFirstName: firstName,
      visitorLastName: lastName,
      visitorOrganizationName: company,
      visitorEmail: email,
      visitorPhoneNumber: phone,
      visitorHostEmail: host,
    };

    try {
      const response = await fetch('http://localhost:8097/visitor/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Visitor signed up successfully!');

        // Clear input fields
        setFirstName('');
        setLastName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setHost('');
        setSuggestions([]);

        // Navigate to Welcome screen
        navigation.navigate('Welcome');

        // Return to Arrive screen after 6 seconds
        setTimeout(() => {
          navigation.navigate('Arrive');
        }, 6000);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to sign up visitor.');
      }
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

      <TextInput style={[styles.input, errors.phone && styles.inputError]} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      {errors.phone && <Text style={styles.errorText}>Required</Text>}

      <TextInput style={[styles.input, errors.host && styles.inputError]} placeholder="Host Email" value={host} onChangeText={setHost} keyboardType="email-address" autoCapitalize="none" />
      {errors.host && <Text style={styles.errorText}>Required</Text>}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setHost(item)}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.customButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Arrive;
