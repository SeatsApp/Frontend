import React, {useEffect} from 'react';
import HomePage from './src/seats/components/HomePage';
import {Provider} from 'react-native-paper'
import {ToastContainer} from '@jamsch/react-native-toastify';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {
    nl,
    registerTranslation,
} from 'react-native-paper-dates'
import "intl";
import 'intl/locale-data/jsonp/nl'
import {Platform} from "react-native";
import {LoginContainer} from './src/login/components/LoginContainer';
import CheckIn from './src/seats/components/CheckIn';
import MyReservations from './src/reservations/components/MyReservations';
import {theme} from "./theme";

/* istanbul ignore next */
if (Platform.OS === "android") {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === "function") {
        (Intl as any).__disableRegExpRestore();
    }
}

export type RootStackParamList = {
    Home: { startTime: string, endTime: string } | undefined;
    CheckIn: undefined;
    MyReservations: undefined;
    FilterDialog: { startTime: string, endTime: string } | undefined;
}

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    useEffect(() => {
        registerTranslation('nl', nl);
    }, [])

    return (
        <Provider theme={theme}>
            <LoginContainer>
                    <NavigationContainer>
                        <ToastContainer/>
                        <Stack.Navigator initialRouteName='Home'>
                            <Stack.Screen name='Home' component={HomePage} options={{headerTitleAlign: 'center'}}/>
                            <Stack.Screen name='CheckIn' component={CheckIn} options={{headerTitleAlign: 'center', title: 'Check in'}}/>
                            <Stack.Screen name='MyReservations' component={MyReservations} options={{headerTitleAlign: 'center', title: 'Your reservations'}}/>
                        </Stack.Navigator>
                    </NavigationContainer>
            </LoginContainer>
        </Provider>
    );
}