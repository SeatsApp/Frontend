import React, {useEffect, useState} from "react";
import {Button, Dialog, IconButton, Subheading, Text} from "react-native-paper";
import TimePicker from "../../dateTimePicker/components/TimePicker";
import useSeat from "../../shared/hooks/useSeat";
import {Seat} from "../types/Seat";
import {toast} from "@jamsch/react-native-toastify";
import {DeviceEventEmitter, Platform, View} from "react-native";
import {Reservation} from "../types/Reservation";
import usePushNotifications from "../../pushNotifications/hooks/usePushNotifications";
import {getDateTimeString, getTime} from "../../shared/hooks/DateSplitter";
import {theme} from "../../../theme";

interface Props {
    seat: Seat,
    visible: boolean,
    date: Date
    startTime: string,
    endTime: string
    setDialogVisible: (b: boolean) => void,
}

export default function ReserveSeatDialog({seat, visible, date, startTime, endTime, setDialogVisible}: Props) {
    const [startTimeReservation, setStartTime] = useState(startTime);
    const [endTimeReservation, setEndTime] = useState(endTime);
    const {reserveSeat} = useSeat();

    useEffect(() => {
        setStartTime(startTime)
        setEndTime(endTime)
    }, [startTime, endTime])

    const handleReserve = async () => {
        if (startTimeReservation.length != 0 && endTimeReservation.length != 0 && date != undefined) {
            await reserveSeat(seat.id, getDateTimeString(date, startTimeReservation),
                getDateTimeString(date, endTimeReservation))
                .then((response: any) => {
                    date.setHours(parseInt(startTimeReservation.substring(0, 2)))
                    date.setMinutes(0)
                    date.setSeconds(0)

                    const secondsInAMinute = 60
                    const minutesBeforeReservation = 15
                    const timeBeforeReservation = minutesBeforeReservation * secondsInAMinute
                    const timeBetween = Math.floor((date.getTime() - new Date().getTime()) / 1000) - timeBeforeReservation

                    if (Platform.OS !== "web") {
                        const {scheduleReservationNotification} = usePushNotifications()
                        scheduleReservationNotification(timeBetween,
                            "Your reservation for the seat " + seat.name + " is in 15 minutes.",
                            response.data)
                    }

                    DeviceEventEmitter.emit("event.refetchSeats", {});
                });

            setDialogVisible(false);
        } else {
            toast.error("The given date/time is not valid.")
        }
    }

    return (
        <Dialog visible={visible} onDismiss={() => setDialogVisible(false)}>
            <IconButton style={{alignSelf: 'flex-end'}} testID="CancelButton" icon={'close'}
                        onPress={() => setDialogVisible(false)}/>
            <View
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Dialog.Title>
                    {seat.name}
                </Dialog.Title>
                <Subheading style={{marginRight: 20}}>{date.toLocaleDateString()}</Subheading>
            </View>
            <Dialog.Content>

                {(seat.reservations.length > 0 &&
                    <View>
                        <Subheading>Already booked:</Subheading>
                        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 4}}>
                            {seat.reservations.map((res: Reservation, index) => (
                                <Text style={{
                                    color: theme.colors.error,
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    borderColor: theme.colors.error,
                                    borderRadius: 2
                                }}
                                      key={index}>{getTime(res.startDateTime)}:00 - {getTime(res.endDateTime) === "00" ?
                                    "24" : getTime(res.endDateTime)}:00</Text>
                            ))}
                        </View>
                    </View>
                )}
                <View>
                    <View style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                        <TimePicker setStartTime={setStartTime} setEndTime={setEndTime}
                                    startTime={startTimeReservation} endTime={endTimeReservation}/>
                        <Button testID="ReserveButton" icon={'check'} onPress={handleReserve}>Reserve</Button>
                    </View>
                </View>
            </Dialog.Content>
        </Dialog>
    );
}