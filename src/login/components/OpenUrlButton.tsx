import React, { useCallback } from "react";
import { Linking, Platform } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { Button } from "react-native-paper";
import { toast } from "@jamsch/react-native-toastify";

interface OpenUrlButtonProps {
  url: string;
}

export const OpenURLButton = ({ url }: OpenUrlButtonProps) => {

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

  return <Button mode='contained' onPress={() => handlePress()} >Login</Button>;
};