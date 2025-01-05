import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/GlobalStyles';

const ArriveScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
    console.log("Test");
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
    if (!name || !company || !email || !phone || !host) {
      Alert.alert('Error', 'All fields are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    const phoneRegex = /^\+?[0-9]{10,}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {    
    const visitorData = {
      visitorName: name,
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
        setName('');
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
        style={styles.input}
        placeholder="Visitor Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Visitor Organization Name"
        value={company}
        onChangeText={setCompany}
      />

      <TextInput
        style={styles.input}
        placeholder="Visitor Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" 
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Visitor Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Visitor Host Email"
        value={host}
        onChangeText={handleHostChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />

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

export default ArriveScreen;
