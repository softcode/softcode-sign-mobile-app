import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from "react-native";
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

  useEffect(() => {
    const fetchActiveVisitors = async () => {
      try {
        const response = await fetch("http://localhost:8097/visitor/getallvisits");
        if (!response.ok) {
          throw new Error("Unable to fetch visitors.");
        }
        const data = await response.json();
        const activeVisitorsList = data
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

    if (text.length >= 3) {
      const matches = activeVisitors.filter(
        (visitor) =>
          visitor.visitorFirstName.toLowerCase().includes(text.toLowerCase()) ||
          visitor.visitorLastName.toLowerCase().includes(text.toLowerCase()) ||
          visitor.visitorEmail.toLowerCase().includes(text.toLowerCase()) ||
          visitor.visitorPhoneNumber.includes(text)
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (visitor: Visitor) => {
    setIdentifier(visitor.visitorFirstName || visitor.visitorLastName || visitor.visitorEmail || visitor.visitorPhoneNumber);
    setVisitorId(visitor.id);
    setSuggestions([]);
  };

  const handleSignOut = async () => {
    if (!identifier.trim()) {
      Alert.alert("Error", "Please enter a valid name, email, or phone number.");
      return;
    }

    const visitor = activeVisitors.find(
      (v) =>
        v.visitorFirstName === identifier ||
        v.visitorLastName === identifier ||
        v.visitorEmail === identifier ||
        v.visitorPhoneNumber === identifier
    );

    if (!visitor) {
      Alert.alert("Error", "Visitor not found.");
      return;
    }

    console.log("Logging out Visitor ID:", visitor.id);

    try {
      const response = await fetch(`http://localhost:8097/visitor/logout?visitorId=${visitor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", result.message || "Visitor logged out successfully!");
        setIdentifier("");
        setVisitorId(null);
        setSuggestions([]);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to log out the visitor.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visitor Logout</Text>
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name, Last Name, Email, or Phone Number"
          value={identifier}
          onChangeText={handleInputChange}
        />
        <View style={styles.suggestionsContainer}>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
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
