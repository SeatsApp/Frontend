import React from "react";
import {View} from "react-native";
import TimePickerDropDown from "./TimePickerDropDown";

interface Props {
    startTime: string,
    endTime: string,
    setStartTime: (startTimeWith: string) => void,
    setEndTime: (endTimeWith: string) => void,
}

export default function TimePicker({startTime, endTime, setEndTime, setStartTime}: Props) {
    return (
        <>
            <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }}>
                <TimePickerDropDown updateState={setStartTime} time={startTime} timeName={'Start'}/>
                <TimePickerDropDown updateState={setEndTime} time={endTime} timeName={'End'}/>
            </View>
        </>
    )
}