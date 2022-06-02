import React from 'react'
import {Card, Button, Title, Text, Subheading} from 'react-native-paper';
import useCancelReservation from '../hooks/useCancelReservation'
import {UserReservation} from '../type/UserReservation';
import {DeviceEventEmitter, View} from "react-native";
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
                <Card.Content style={{width: '100%'}}>
                    <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Title>{userReservation.seatName}</Title>
                            <Title>{userReservation.startDateTime.substring(0, 10)}</Title>
                        </View>
                        <Subheading>
                            <Text>{getTime(userReservation.startDateTime)} - {getTime(userReservation.endDateTime)}</Text>
                        </Subheading>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={async () => {
                        await useCancelReservation(userReservation.id);
                        await cancelReservationNotification(userReservation.id)
                        refetchMyReservations();
                        DeviceEventEmitter.emit("event.refetchSeats", {});
                    }} testID={"CancelReservation"}>Cancel</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}
