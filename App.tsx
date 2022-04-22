import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import HomePage from './src/seats/components/HomePage';
import CreateSeat from './src/seats/components/CreateSeat';
import { Provider as PaperProvider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastContainer } from '@jamsch/react-native-toastify';

export type RootStackParamList = {
  Home: undefined;
  CreateSeat: undefined;
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <PaperProvider>
      <ToastContainer />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='CreateSeat' component={CreateSeat} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
