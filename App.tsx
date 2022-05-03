import React from 'react';
import HomePage from './src/seats/components/HomePage';
import CreateSeat from './src/createSeats/components/CreateSeat';
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

/* istanbul ignore next */
if (Platform.OS === "android") {
    // See https://github.com/expo/expo/issues/6536 for this issue.
    if (typeof (Intl as any).__disableRegExpRestore === "function") {
        (Intl as any).__disableRegExpRestore();
    }
}

registerTranslation('nl',nl);

export type RootStackParamList = {
    Home: undefined;
    CreateSeat: undefined;
}

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Provider>
            <NavigationContainer>
                <ToastContainer/>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name='Home' component={HomePage}/>
                    <Stack.Screen name='CreateSeat' component={CreateSeat}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}