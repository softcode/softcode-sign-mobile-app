import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Welcome from '../components/Welcome';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Welcome />

      <View style={styles.bottomSection}>
        <View style={styles.button}>
          <Button title="Arrive" onPress={() => navigation.navigate('Arrive')} />
        </View>
        <View style={styles.button}>
          <Button title="Leave" onPress={() => navigation.navigate('Leave')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  bottomSection: {
    marginBottom: 50,
  },
  button: {
    marginBottom: 20,
  },
});

export default HomeScreen;
