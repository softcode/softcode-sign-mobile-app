import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Welcome from '../components/WelcomeScreen';
import styles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.homeContainer}>
      <Welcome />
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Arrive')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.customButton}
          onPress={() => navigation.navigate('Leave')}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomLink}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('EmployeeLogout')}
        >
          <Text style={styles.logoutButtonText}>Employee Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
