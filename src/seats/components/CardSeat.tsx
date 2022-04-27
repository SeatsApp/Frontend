import React from 'react'
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { Seat } from '../types/Seat'
import useSeat from "../../shared/hooks/useSeat";
import {DeviceEventEmitter} from "react-native";

interface CardSeatProps {
    seat: Seat;
}

export default function CardSeat({ seat }: CardSeatProps) {
    const { deleteSeat } = useSeat();

    return (
        <Card style={{ margin: 5 }}>
            <Card.Content>
                <Title>{seat.name}</Title>
                <Paragraph>Floor</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Reserve</Button>
                <Button onPress={async () => {
                    await deleteSeat(seat.id);
                    DeviceEventEmitter.emit("event.refetchSeats", {});
                }
                }>Delete</Button>
            </Card.Actions>
        </Card>
    );
}