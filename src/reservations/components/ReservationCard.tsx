import React from 'react'
import {Card, Button, Title, Subheading} from 'react-native-paper';
import useCancelReservation from '../hooks/useCancelReservation'
import {UserReservation} from '../type/UserReservation';
import {DeviceEventEmitter, View} from "react-native";
import usePushNotifications from "../../pushNotifications/hooks/usePushNotifications";
import {dateInPast, getDate, getTime} from "../../shared/hooks/DateFunctions";
import {theme} from "../../../theme";

interface ReservationCardProps {
    userReservation: UserReservation
    refetchMyReservations: () => void
}

export default function ReservationCard({userReservation, refetchMyReservations}: ReservationCardProps) {
    const {cancelReservationNotification} = usePushNotifications();
    return (
        <View>
            <Card style={{margin: 5}}>
                <Card.Content style={{width: '100%'}}>
                    <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Title>{userReservation.seatName}</Title>
                            <Title>{getDate(userReservation.startDateTime)}</Title>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: dateInPast(userReservation.endDateTime) ? 10 : 0
                        }}>
                            <Subheading>{getTime(userReservation.startDateTime)}:00
                                - {getTime(userReservation.endDateTime)}:00
                            </Subheading>
                            <Subheading
                                style={{color: theme.colors.error}}>{dateInPast(userReservation.endDateTime) ? "Ended" : ""}
                            </Subheading>
                        </View>
                    </View>
                </Card.Content>
                {(
                    !dateInPast(userReservation.endDateTime) && <Card.Actions>
                        <Button mode={'outlined'} style={{borderRadius: 5, borderColor: theme.colors.error}}
                                color={theme.colors.error} onPress={async () => {
                            await useCancelReservation(userReservation.id);
                            await cancelReservationNotification(userReservation.id)
                            refetchMyReservations();
                            DeviceEventEmitter.emit("event.refetchSeats", {});
                        }} testID={"CancelReservation"}>Cancel</Button>
                    </Card.Actions>
                )}
            </Card>
        </View>
    );
}
