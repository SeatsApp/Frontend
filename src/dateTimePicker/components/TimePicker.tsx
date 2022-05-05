import React from "react";
import {Platform, TextInput, View} from "react-native";
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
            {
                Platform.OS === 'android' ? (
                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center', height: "auto"}}>
                        <TimePickerDropDown updateState={setStartTime} time={startTime} timeName={'Start'}/>
                        <TimePickerDropDown updateState={setEndTime} time={endTime} timeName={'End'}/>
                    </View>
                ) : <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                    <TextInput
                        onChangeText={setStartTime}
                        value={startTime}
                        placeholder="Start hour"
                        keyboardType="numeric"
                    />
                    <TextInput
                        onChangeText={setEndTime}
                        value={endTime}
                        placeholder="End hour"
                        keyboardType="numeric"
                    />
                </View>
            }
        </>
    )
}