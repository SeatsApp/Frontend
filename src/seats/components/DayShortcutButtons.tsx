import {Button} from "react-native-paper";
import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";

interface DayShortcutButtonsProps {
    setStartTime: Dispatch<SetStateAction<string>>;
    setEndTime: Dispatch<SetStateAction<string>>;
}

export default function DayShortcutButtons({setEndTime, setStartTime}: DayShortcutButtonsProps) {
    return (
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Button onPress={() => {
                setStartTime("00:00");
                setEndTime("12:00")
            }}>Forenoon</Button>
            <Button onPress={() => {
                setStartTime("12:00");
                setEndTime("24:00")
            }}>Afternoon</Button>
            <Button onPress={() => {
                setStartTime("00:00");
                setEndTime("24:00")
            }}>Whole Day</Button>
        </View>
    );
}