import React from 'react'
import { Button } from 'react-native-paper';
import { View } from "react-native";

interface SeatsSwitchButtonsProps {
    setShowSeatsList: (showSeatsList: boolean) => void,
}

export default function SeatsSwitchButtons({ setShowSeatsList }: SeatsSwitchButtonsProps) {
    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <Button style={{ width: "50%" }} mode="outlined" onPress={() => setShowSeatsList(false)}>Floorplan</Button>
            <Button style={{ width: "50%" }} mode="outlined" onPress={() => setShowSeatsList(true)}>Seats list</Button>
        </View>
    );
}