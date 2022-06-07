import {theme} from "../../../theme";
import DatePicker from "../../dateTimePicker/components/DatePicker";
import {Button, Text} from "react-native-paper";
import {View} from "react-native";
import React, {Dispatch, SetStateAction, useEffect} from "react";
import {SelectedBuilding} from "../types/SelectedBuilding";

interface DateFilterButtonsProps {
    setDate: Dispatch<SetStateAction<Date>>;
    date: Date;
    setFilterVisible: Dispatch<SetStateAction<boolean>>;
    refetchBuilding: () => void;
    selectedBuilding: SelectedBuilding
}

export default function DateFilterButtons({setDate, date, setFilterVisible, refetchBuilding, selectedBuilding}: DateFilterButtonsProps) {

    useEffect(() => {
        if (selectedBuilding.buildingId !== 0 && selectedBuilding.floorId !== 0){
            refetchBuilding()
        }
    }, [date])

    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
            justifyContent: 'space-evenly',
            backgroundColor: theme.colors.primary
        }}>
            <DatePicker updateState={setDate} date={date} refetchBuilding={refetchBuilding}/>
            <Text style={{color: theme.colors.accent}}>|</Text>
            <Button style={{width: '50%'}} onPress={() => setFilterVisible(true)}
                    color={theme.colors.accent} icon='tune'>filter</Button>
        </View>
    )
}