import React from 'react';
import HomePage from './src/seats/components/HomePage';
import { Provider } from 'react-native-paper'
import { ToastContainer } from '@jamsch/react-native-toastify';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    nl,
    registerTranslation,
} from 'react-native-paper-dates'
import "intl";
import 'intl/locale-data/jsonp/nl'
import { Platform } from "react-native";
import { LoginContainer } from './src/login/components/LoginContainer';
import CheckIn from './src/seats/components/CheckIn';
import MyReservations from './src/reservations/components/MyReservations';

/* istanbul ignore next */
if (Platform.OS === "android") {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === "function") {
        (Intl as any).__disableRegExpRestore();
    }
}

registerTranslation('nl', nl);

export type RootStackParamList = {
    Home: undefined;
    CheckIn: undefined;
    MyReservations: undefined;
}

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Provider>
            <LoginContainer>
                <NavigationContainer>
                    <ToastContainer />
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen name='Home' component={HomePage} />
                        <Stack.Screen name='CheckIn' component={CheckIn} />
                        <Stack.Screen name='MyReservations' component={MyReservations} />
                    </Stack.Navigator>
                </NavigationContainer>
            </LoginContainer>
        </Provider>
    );
}