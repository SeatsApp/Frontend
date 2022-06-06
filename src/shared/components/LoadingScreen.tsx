import {ActivityIndicator, Text} from "react-native-paper";
import {theme} from "../../../theme";
import {View} from "react-native";
import React from "react";

export default function LoadingScreen() {
    return (
        <View style={{alignSelf: 'center'}}>
            <ActivityIndicator style={{marginBottom: 5}} size={'large'} color={theme.colors.warning}/>
            <Text style={{color: theme.colors.warning}}>Loading... Please wait.</Text>
        </View>
    )
}