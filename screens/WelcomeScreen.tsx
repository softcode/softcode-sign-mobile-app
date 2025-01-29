import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import styles from '../styles/GlobalStyles';

type RouteParams = {
  firstName?: string;
};

const WelcomeScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { firstName = 'Guest' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Softcode {firstName}</Text>
      <Text style={styles.subText}>Your host has been notified</Text>
    </View>
  );
};

export default WelcomeScreen;
