import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/GlobalStyles';

type RootStackParamList = {
  Home: undefined;
  Leave: undefined;
  Thanks: undefined;
};

const ThanksScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank you for visiting!</Text>
      <Text style={styles.subText}>We hope to see you again soon.</Text>
    </View>
  );
};

export default ThanksScreen;
