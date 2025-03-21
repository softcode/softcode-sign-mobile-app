import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import Config from '../react-native-config';
import styles from '../styles/GlobalStyles';

interface Visitor {
  id: number;
  visitorFirstName: string;
  visitorLastName: string;
  visitorEmail: string;
  visitorPhoneNumber: string;
}

const Leave: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [suggestions, setSuggestions] = useState<Visitor[]>([]);
  const [activeVisitors, setActiveVisitors] = useState<Visitor[]>([]);
  const [visitorId, setVisitorId] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    const fetchActiveVisitors = async () => {
      try {
        const response = await axios.get(`${Config.API_URL}/visitor/getallvisits`);
        const activeVisitorsList = response.data
          .filter((visitor: any) => !visitor.visitEndTime)
          .map((visitor: any) => ({
            id: visitor.id,
            visitorFirstName: visitor.visitorFirstName,
            visitorLastName: visitor.visitorLastName,
            visitorEmail: visitor.visitorEmail,
            visitorPhoneNumber: visitor.visitorPhoneNumber,
          }));
        setActiveVisitors(activeVisitorsList);
      } catch (error) {
        console.error("Error fetching active visitors:", error);
      }
    };

    fetchActiveVisitors();
  }, []);

  const handleInputChange = (text: string) => {
    setIdentifier(text);
    setVisitorId(null);

    if (text.length >= 3) {
      const matches = activeVisitors.filter(
        (visitor) =>
          (visitor.visitorFirstName && visitor.visitorFirstName.toLowerCase().includes(text.toLowerCase())) ||
          (visitor.visitorLastName && visitor.visitorLastName.toLowerCase().includes(text.toLowerCase())) ||
          (visitor.visitorEmail && visitor.visitorEmail.toLowerCase().includes(text.toLowerCase())) ||
          (visitor.visitorPhoneNumber && visitor.visitorPhoneNumber.includes(text))
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (visitor: Visitor) => {
    const fullName = `${visitor.visitorFirstName} ${visitor.visitorLastName}`.trim();
    setIdentifier(fullName);
    setVisitorId(visitor.id);
    setSuggestions([]);
  };

  const handleSignOut = async () => {
    if (!identifier.trim()) {
      alert("Please enter a valid name, email, or phone number.");
      return;
    }

    const visitor = activeVisitors.find(
      (v) => {
        const fullName = `${v.visitorFirstName} ${v.visitorLastName}`.trim();
        return fullName === identifier ||
               v.visitorEmail === identifier ||
               v.visitorPhoneNumber === identifier
      }
    );

    if (!visitor) {
      alert("Visitor not found.");
      return;
    }

    try {
      await axios.patch(`${Config.API_URL}/visitor/logout`, 
        { visitorId: visitor.id },
        { headers: { 'Content-Type': 'application/json' } }
      );
      navigation.navigate('Thanks');
    } catch (error) {
      alert("Failed to log out the visitor.");
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor Logout</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name, Last Name, or Email"
          value={identifier}
          onChangeText={handleInputChange}
        />
        <View style={styles.suggestionsContainer}>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} onPress={() => handleSuggestionClick(item)}>
                  <Text style={styles.suggestionText}>
                    {item.visitorFirstName} {item.visitorLastName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      
        <TouchableOpacity style={styles.customButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Leave;
