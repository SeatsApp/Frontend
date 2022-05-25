import React from 'react'
import { Card, Button, Title, Text } from 'react-native-paper';
import { Seat } from '../types/Seat'
import useStatusColor from '../hooks/UseStatusColor';
import { SeatStatus } from '../types/SeatStatus';
import { View } from "react-native";

interface CardSeatProps {
    seat: Seat,
    updateDialog(seat: Seat, visible: boolean): void
}

export default function CardSeat({ seat, updateDialog }: CardSeatProps) {
    return (
        <View>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Title style={{ marginRight: 4 }}>{seat.name}</Title>
                        <Text style={{ color: useStatusColor(SeatStatus[seat.seatStatus]) }}>
                            {seat.seatStatus.toString().replace("_", " ")}
                        </Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={async () => {
                        updateDialog(seat, true);
                    }}>Reserve</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}