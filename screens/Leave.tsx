import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import styles from '../styles/GlobalStyles';

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

export default LeaveScreen;
