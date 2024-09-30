import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave</Text>
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
});

export default LeaveScreen;
