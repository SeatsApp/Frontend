import React, { useEffect } from "react"
import useLogin from "../hooks/useLogin";
import { OpenURLButton } from "./OpenUrlButton"
import * as SecureStore from 'expo-secure-store';
import { Platform, Linking, View, ImageBackground } from "react-native";
import { backendUrl } from '../../config/EnvironmentVariableConfig'

interface LoginContainerProps {
    children: JSX.Element;
}

interface LinkingProps {
    url: string;
}

export const LoginContainer = ({ children }: LoginContainerProps) => {
    const { loggedIn, checkLoggedIn } = useLogin();

    const urlEventHandler = async (event: LinkingProps) => {
        let jwtToken = event.url.split("=")[1];
        if (jwtToken !== undefined) {
            if (jwtToken.includes("#"))
                jwtToken = jwtToken.substring(0, jwtToken.length - 1);
            await SecureStore.setItemAsync("JwtToken", jwtToken)
        }
        checkLoggedIn()
    };

    useEffect(() => {
        if (Platform.OS === "web") {
            Linking.getInitialURL().then((url: string | null) => {
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
            checkLoggedIn();
            if (!loggedIn) {
                Linking.addEventListener('url', urlEventHandler);
                return () => Linking.removeEventListener('url', urlEventHandler);
            }
        }
    }, [])

    const loginUrl = (Platform.OS === 'web') ? backendUrl + "/api/login/web"
        : backendUrl + "/api/login/expo"
    if (loggedIn) {
        return children
    } else {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground resizeMode='cover' style={{
                    flex: 1,
                    justifyContent: "center"
                }} source={require('../../../assets/cronosLogin.png')}>
                    <OpenURLButton url={loginUrl} />
                </ImageBackground>
            </View>
        )
    }
}
