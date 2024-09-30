import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ArriveScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrive</Text>
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

export default ArriveScreen;
