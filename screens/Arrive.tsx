import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/GlobalStyles';

const Arrive: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    host: false,
  });

  const fetchHostSuggestions = async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      const filteredUsers = data
        .filter((user: { name: string }) => user.name.toLowerCase().includes(text.toLowerCase()))
        .map((user: { name: string }) => user.name);

      setSuggestions(filteredUsers);
    } catch (error) {
      console.error('Error fetching host suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHostChange = (text: string) => {
    setHost(text);
    fetchHostSuggestions(text);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setHost(suggestion);
    setSuggestions([]);
  };

  const validateInputs = () => {
    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      phone: !phone,
      host: !host,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Visitor signed up successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setHost('');
        setCompany('');
        setSuggestions([]);
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

      <TextInput
        style={[styles.input, errors.firstName && styles.inputError]}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {errors.firstName && <Text style={styles.errorText}>Required</Text>}

      <TextInput
        style={[styles.input, errors.lastName && styles.inputError]}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && <Text style={styles.errorText}>Required</Text>}

      <TextInput
        style={styles.input}
        placeholder="Organization Name (Optional)"
        value={company}
        onChangeText={setCompany}
      />

      <TextInput
        style={styles.input}
        placeholder="Email (Optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>Required</Text>}

      <TextInput
        style={[styles.input, errors.host && styles.inputError]}
        placeholder="Host Email"
        value={host}
        onChangeText={handleHostChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.host && <Text style={styles.errorText}>Required</Text>}

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{item}</Text>
              </View>
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
