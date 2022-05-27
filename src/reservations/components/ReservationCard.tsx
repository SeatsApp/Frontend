import React from 'react'
import { Card, Button, Title, Text } from 'react-native-paper';
import useCancelReservation from '../hooks/useCancelReservation'
import { UserReservation } from '../type/UserReservation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DeviceEventEmitter, View } from "react-native";
import usePushNotifications from "../../pushNotifications/hooks/usePushNotifications";
import {getTime} from "../../shared/hooks/DateSplitter";

interface ReservationCardProps {
    userReservation: UserReservation
    refetchMyReservations: () => void
}

export default function ReservationCard({ userReservation, refetchMyReservations }: ReservationCardProps) {
    const { cancelReservationNotification } = usePushNotifications();

    return (
        <View>
            <Card style={{ margin: 5 }}>
                <Card.Content>
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Title style={{ marginRight: 4 }}>{userReservation.seatName}</Title>
                        <Text>
                            Date: {userReservation.startDateTime.substring(0, 10)}
                        </Text>
                        <Text>Time: {getTime(userReservation.startDateTime)}:00 - {getTime(userReservation.endDateTime) === "00" ?
                            "24" : getTime(userReservation.endDateTime)}:00</Text>
                        <Text>checked in: {userReservation.checkedIn ?
                            <Icon name={"check"} size={25} color="green" /> :
                            <Icon name={"minus-circle"} size={25} color="red" />}</Text>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={async () => {
                        await useCancelReservation(userReservation.id);
                        cancelReservationNotification(userReservation.id)
                        refetchMyReservations();
                        DeviceEventEmitter.emit("event.refetchSeats", {});
                    }} testID={"CancelReservation"} >Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
