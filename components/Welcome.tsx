import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/GlobalStyles';

const Welcome: React.FC = () => {
  return (
    <View style={styles.topSection}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Image
        source={require('../assets/softcode_logo.png')}
        style={styles.logo}
        />
      
    </View>
  );
};

export default Welcome;
