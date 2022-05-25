import {Button} from "react-native-paper";
import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";
import {theme} from "../../../theme";

interface DayShortcutButtonsProps {
    setStartTime: Dispatch<SetStateAction<string>>;
    setEndTime: Dispatch<SetStateAction<string>>;
    chosenEndTime: string;
    chosenStartTime: string;
}

export default function DayShortcutButtons({
                                               setEndTime,
                                               setStartTime,
                                               chosenEndTime,
                                               chosenStartTime
                                           }: DayShortcutButtonsProps) {

    const checkTimes = (startTime: string, endTime: string): boolean => {
        return chosenStartTime === startTime && chosenEndTime === endTime;
    }

    return (
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center'}}>
            <Button color={checkTimes("00:00", "12:00") ? theme.colors.accent : theme.colors.primary} style={{margin: 4}}
                    mode={'outlined'} onPress={() => {
                setStartTime("00:00");
                setEndTime("12:00")
            }}>Forenoon</Button>
            <Button color={checkTimes("12:00", "24:00") ? theme.colors.accent : theme.colors.primary} style={{margin: 4}}
                    mode={'outlined'} onPress={() => {
                setStartTime("12:00");
                setEndTime("24:00")
            }}>Afternoon</Button>
            <Button color={checkTimes("00:00", "24:00") ? theme.colors.accent : theme.colors.primary} style={{margin: 4}}
                    mode={'outlined'} onPress={() => {
                setStartTime("00:00");
                setEndTime("24:00")
            }}>Whole Day</Button>
        </View>
    );
}