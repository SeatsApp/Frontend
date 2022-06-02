import React, {useCallback} from "react";
import {Image, Linking, Platform, View} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import {Button, Text} from "react-native-paper";
import {toast} from "@jamsch/react-native-toastify";
import {theme} from "../../../theme";

interface OpenUrlButtonProps {
    url: string;
}

export const OpenURLButton = ({url}: OpenUrlButtonProps) => {

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            if (Platform.OS === "web") {
                await Linking.openURL(url)
            } else {
                await WebBrowser.openBrowserAsync(url)
            }
        } else {
            toast.error(`Do not know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <View style={{ display: 'flex', alignItems: 'center'}}>
            <View style={{ display: 'flex', alignItems: 'center'}}>
                <Image style={{width: 200, height: 200}} resizeMode='contain' source={require('../../../assets/xploreGroup.png')}/>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Button color={theme.colors.primary} style={{padding: 4}} mode='contained'
                        onPress={() => handlePress()} icon='lock-open-outline' labelStyle={{color: theme.colors.accent}}>
                    <Text style={{color: theme.colors.accent}}>Connect
                        with Cronos</Text>
                </Button>
            </View>
        </View>
    );
};