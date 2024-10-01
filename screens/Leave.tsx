import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const LeaveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
      />
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
});

export default LeaveScreen;
