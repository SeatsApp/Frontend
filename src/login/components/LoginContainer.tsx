import React, { useEffect } from "react"
import { Linking, Platform, View } from "react-native";
import useLogin from "../hooks/useLogin";
import { OpenURLButton } from "./OpenUrlButton"
import * as SecureStore from 'expo-secure-store';
import { Text } from "react-native-paper";

interface LoginContainerProps {
    children: JSX.Element;
}

interface LinkingProps {
    url: string;
}

export const LoginContainer = ({ children }: LoginContainerProps) => {
    const { loggedIn, checkLoggedIn } = useLogin();

    const urlEventHandler = (event: LinkingProps) => {
        let jwtToken = event.url.split("=")[1];
        if (jwtToken !== undefined)
            if (jwtToken.includes("#"))
                jwtToken = jwtToken.substring(0, jwtToken.length - 1)
        SecureStore.setItemAsync("JwtToken", jwtToken)
        checkLoggedIn()
    };

    useEffect(() => {
        if (Platform.OS === "web") {
            Linking.getInitialURL().then((url) => {
                if (url !== null) {
                    let jwtToken: string = url.split("=")[1]
                    if (jwtToken !== undefined) {
                        if (jwtToken.includes("#"))
                            jwtToken = jwtToken.substring(0, jwtToken.length - 1)
                        localStorage.setItem("JwtToken", jwtToken)
                    }
                }
                checkLoggedIn();
            });
        } else {
            Linking.addEventListener('url', urlEventHandler);
            return () => Linking.removeEventListener('url', urlEventHandler);
        }
    }, [])

    const loginUrl = (Platform.OS === 'web') ? "https://86d3-94-143-189-241.eu.ngrok.io/api/login/web"
        : "https://86d3-94-143-189-241.eu.ngrok.io/api/login/expo"
    if (loggedIn) {
        return children
    }
    else {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', height: '50%' }}>
                <Text style={{ margin: 20, fontSize: 20, textAlign: 'center' }}>You have to login with your cronos account.</Text>
                <OpenURLButton url={loginUrl} />
            </View>
        )
    }
}