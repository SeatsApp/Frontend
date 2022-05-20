import React from 'react'
import { Card, Button, Title, Text } from 'react-native-paper';
import useCancelReservation from '../hooks/useCancelReservation'
import { UserReservation } from '../type/UserReservation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeviceEventEmitter, View } from "react-native";

interface ReservationCardProps {
    userReservation: UserReservation
    refetchMyReservations: () => void
}

export default function ReservationCard({ userReservation, refetchMyReservations }: ReservationCardProps) {
    const startTime = (userReservation.startDateTime.charAt(12) == ":") ?
        userReservation.startDateTime.substring(10, 15) :
        userReservation.startDateTime.substring(10, 14)

    let endTime = (userReservation.endDateTime.charAt(12) == ":") ?
        userReservation.endDateTime.substring(10, 15) :
        userReservation.endDateTime.substring(10, 14)

    if (endTime === "0:00") {
        endTime = "24:00"
    }

    return (
        <View>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Title style={{ marginRight: 4 }}>{userReservation.seatName}</Title>
                        <Text>
                            Date: {userReservation.startDateTime.substring(0, 10)}
                        </Text>
                        <Text>Time: {startTime} - {endTime}</Text>
                        <Text>checked in: {userReservation.checkedIn ?
                            <Icon name={"check"} size={25} color="green" /> :
                            <Icon name={"minus-circle"} size={25} color="red" />}</Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={async () => {
                        await useCancelReservation(userReservation.id);
                        refetchMyReservations();
                        DeviceEventEmitter.emit("event.refetchSeats", {});
                    }}>Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
