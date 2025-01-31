import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/GlobalStyles';
import { StackNavigationProp } from '@react-navigation/stack';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const Arrive: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [host, setHost] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [suggestions, setSuggestions] = useState<Employee[]>([]);
  const [isFetching, setIsFetching] = useState(false);
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

  const fetchHostSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(`http://localhost:8097/visitor/employee/search?name=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data: Employee[] = await response.json();
        setSuggestions(data.slice(0, 3));
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
    setHostEmail(employee.email);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const visitorData = {
      visitorFirstName: firstName,
      visitorLastName: lastName,
      visitorOrganizationName: company.trim() === "" ? null : company,
      visitorEmail: email.trim() === "" ? null : email,
      visitorPhoneNumber: phone,
      visitorHostEmail: hostEmail,
    };

    try {
      const response = await fetch('http://localhost:8097/visitor/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Visitor signed up successfully!');

        setFirstName('');
        setLastName('');
        setCompany('');
        setEmail('');
        setPhone('');
        setHost('');
        setHostEmail('');
        setSuggestions([]);

        navigation.navigate('Welcome', { firstName });

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
              keyExtractor={(item) => item.email}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
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
