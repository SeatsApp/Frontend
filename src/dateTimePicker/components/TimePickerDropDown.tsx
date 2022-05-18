import React, { useState } from "react";
import { View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { getTimeslots } from "../../seats/types/Timeslots";

interface Props {
    timeName: string,
    updateState: (time: string) => void,
    time: string
}

export default function TimePickerDropDown({ timeName, updateState, time }: Props) {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <View style={{ marginHorizontal: 1 }}>
            <DropDown
                label={timeName}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={time}
                setValue={updateState}
                list={getTimeslots()}
                dropDownStyle={{ marginTop: 0 }}
            />
        </View>
    )
}
