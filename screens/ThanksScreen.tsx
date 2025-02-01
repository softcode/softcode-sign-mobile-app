import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/GlobalStyles';

const ThanksScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank you for visiting Softcode! </Text>
      <Text style={styles.subText}>Have a great day!</Text>
    </View>
  );
};

export default ThanksScreen;
