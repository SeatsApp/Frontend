import React from 'react'
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { Seat } from '../types/Seat'

interface CardSeatProps {
    seat: Seat;
}

export default function CardSeat({ seat }: CardSeatProps) {

    return (
        <Card style={{ margin: 5 }}>
            <Card.Content>
                <Title>{seat.name}</Title>
                <Paragraph>Floor</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button>Reserve</Button>
                <Button>Delete</Button>
            </Card.Actions>
        </Card>
    );
}