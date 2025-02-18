import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Config from '../react-native-config';
import styles from '../styles/GlobalStyles';
import axios from 'axios';

interface ChecklistItem {
  id: number;
  checkListDesc: string;
}

const EmployeeLogoutScreen: React.FC = () => {
  const [pinCode, setPinCode] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [logoutError, setLogoutError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const response = await axios.get(`${Config.API_URL}/checklist/getallchecklists`);
        if (Array.isArray(response.data)) {
          setChecklist(response.data);
        } else {
          console.error('Invalid response format.');
        }
      } catch (error) {
        console.error('Error fetching checklist:', error);
      }
    };

    fetchChecklist();
  }, []);

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(value)) {
        updatedSet.delete(value);
      } else {
        updatedSet.add(value);
      }
      return updatedSet;
    });
    setErrorMessage('');
  };

  const handleLogout = async () => {
    if (selectedOptions.size < checklist.length) {
      setErrorMessage('Please check all the checkboxes before logging out.');
      return;
    }

    try {
      const response = await axios.post(`${Config.API_URL}/employee/logout`, { pinCode });
      
      if (response.status === 200) {
        setSuccessMessage('Logout successful.');
        setLogoutError('');
      } else {
        setLogoutError(response.statusText || 'Logout failed. Invalid PIN code.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setLogoutError('An error occurred while logging out.');
      setSuccessMessage('');
    }
  };

  const allChecked = selectedOptions.size === checklist.length && checklist.length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Logout</Text>
      <View style={{ flexDirection: 'column', marginBottom: 10 }}>
        {checklist.length > 0 ? (
          checklist.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checkboxContainer}
              onPress={() => handleCheckboxChange(item.checkListDesc)}
            >
              <Text style={styles.checkboxText}>
                {selectedOptions.has(item.checkListDesc) ? '☑️' : '⬜️'} {item.checkListDesc}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Loading checklist...</Text>
        )}
      </View>

      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Enter your pin code"
        value={pinCode}
        onChangeText={setPinCode}
      />

      <TouchableOpacity
        style={[styles.customButton, { backgroundColor: allChecked ? 'black' : 'gray' }]}
        onPress={handleLogout}
        disabled={!allChecked}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {(logoutError || successMessage) && (
        <Text style={{ color: logoutError ? 'red' : 'green' }}>
          {logoutError || successMessage}
        </Text>
      )}
    </View>
  );
};

export default EmployeeLogoutScreen;
