import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import ArriveScreen from './screens/Arrive';
import LeaveScreen from './screens/Leave';

type RootStackParamList = {
  Home: undefined;
  Arrive: undefined;
  Leave: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Arrive" component={ArriveScreen} options={{ title: 'Arrive' }} />
        <Stack.Screen name="Leave" component={LeaveScreen} options={{ title: 'Leave' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
