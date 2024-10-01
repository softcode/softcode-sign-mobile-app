import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const ArriveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
      />
      <TextInput
        style={styles.input}
        placeholder="Email (optional)"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
      />

      <TextInput
        style={styles.input}
        placeholder="Host"
        onChangeText={(text) => {
        }}
      />

      <Button title="Sign In" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: 300,
    height: 40,
  },
  suggestions: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  suggestionText: {
    padding: 10,
  },
  signUp: {
    fontSize: 25,
    paddingBottom: 20,
  }
});

export default ArriveScreen;