import React from 'react';
import HomePage from './src/seats/components/HomePage';
import CreateSeat from './src/createSeats/components/CreateSeat';
import {Provider as PaperProvider} from 'react-native-paper'
import {ToastContainer} from '@jamsch/react-native-toastify';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    CreateSeat: undefined;
}

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <PaperProvider>
            <NavigationContainer>
                <ToastContainer/>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name='Home' component={HomePage}/>
                    <Stack.Screen name='CreateSeat' component={CreateSeat}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
