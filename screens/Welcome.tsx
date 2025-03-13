import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/GlobalStyles';

type RouteParams = {
  firstName?: string;
};

const Welcome: React.FC = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { firstName = 'Guest' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Softcode, {firstName}!</Text>
      <Text style={styles.subText}>Your host has been notified!</Text>
    </View>
  );
};

export default Welcome;
