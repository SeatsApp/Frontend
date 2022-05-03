import React from "react";
import {Platform, TextInput, View} from "react-native";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";

interface Props {
    startTime: string,
    endTime: string,
    date: Date,
    setStartTime: (startTimeWith: string) => void,
    setEndTime: (endTimeWith: string) => void,
    setDate: (date: Date) => void

}

export default function DateTimePicker({startTime, endTime, date, setDate, setEndTime, setStartTime}: Props) {
    return (
        <>
            {
                Platform.OS === 'android' ? (
                    <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                        <DatePicker updateState={setDate} date={date}/>
                        <TimePicker updateState={setStartTime} time={startTime} timeName={'Start'}/>
                        <TimePicker updateState={setEndTime} time={endTime} timeName={'End'}/>
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