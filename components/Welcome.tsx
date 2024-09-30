import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Welcome: React.FC = () => {
  return (
    <View style={styles.topSection}>
      <Image
        source={require('../assets/softcode_horizontal_transp.png')}
        style={styles.logo}
        />
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.welcomeText}>SoftCode Sign</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default Welcome;
