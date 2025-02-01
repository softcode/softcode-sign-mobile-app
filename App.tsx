import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import Arrive from './screens/Arrive';
import Leave from './screens/Leave';
import Welcome from './components/Welcome';
import EmployeeLogoutScreen from './screens/EmployeeLogout';
import WelcomeScreen from './screens/WelcomeScreen';
import ThanksScreen from './screens/ThanksScreen';

type RootStackParamList = {
  Home: undefined;
  Arrive: undefined;
  Leave: undefined;
  Welcome: undefined;
  Thanks: undefined;
  EmployeeLogout: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Arrive" component={Arrive} options={{ title: 'Arrive' }} />
        <Stack.Screen name="Leave" component={Leave} options={{ title: 'Leave' }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Thanks" component={ThanksScreen} />
        <Stack.Screen
          name="EmployeeLogout"
          component={EmployeeLogoutScreen}
          options={{ title: 'Employee Logout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;