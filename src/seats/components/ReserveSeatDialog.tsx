import React, { useEffect, useState } from "react";
import { Dialog, IconButton, Text } from "react-native-paper";
import TimePicker from "../../dateTimePicker/components/TimePicker";
import useSeat from "../../shared/hooks/useSeat";
import { Seat } from "../types/Seat";
import { toast } from "@jamsch/react-native-toastify";
import { DeviceEventEmitter, Platform, View } from "react-native";
import { Reservation } from "../types/Reservation";
import usePushNotifications from "../../pushNotifications/hooks/usePushNotifications";
import DayShortcutButtons from "./DayShortcutButtons";
import { getDateTimeString, getTime } from "../../shared/hooks/DateSplitter";

interface Props {
    seat: Seat,
    visible: boolean,
    date: Date
    startTime: string,
    endTime: string
    setDialogVisible: (b: boolean) => void,
}

export default function ReserveSeatDialog({ seat, visible, date, startTime, endTime, setDialogVisible }: Props) {
    const [startTimeReservation, setStartTime] = useState(startTime);
    const [endTimeReservation, setEndTime] = useState(endTime);
    const { reserveSeat } = useSeat();

    useEffect(() => {
        setStartTime(startTime)
        setEndTime(endTime)
    }, [startTime, endTime])

    const handleReserve = async () => {
        if (startTime.length != 0 && endTime.length != 0 && date != undefined) {
            await reserveSeat(seat.id, getDateTimeString(date, startTime), getDateTimeString(date, endTime))
                .then((response: any) => {
                    date.setHours(parseInt(startTimeReservation.substring(0, 2)))
                    date.setMinutes(0)
                    date.setSeconds(0)

                    const secondsInAMinute = 60
                    const minutesBeforeReservation = 15
                    const timeBeforeReservation = minutesBeforeReservation * secondsInAMinute
                    const timeBetween = Math.floor((date.getTime() - new Date().getTime()) / 1000) - timeBeforeReservation

                    if (Platform.OS !== "web") {
                        const { scheduleReservationNotification } = usePushNotifications()
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
            <Dialog.Title>Make a reservation for seat: {seat.name}</Dialog.Title>
            <Dialog.Content>
                {(seat.reservations.length > 0 &&
                    <View>
                        <Text>Unavailable:</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {seat.reservations.map((res: Reservation, index) => (
                                <Text style={{ color: 'red' }}
                                    key={index}>{getTime(res.startDateTime)}:00 - {getTime(res.endDateTime) === "00" ?
                                        "24" : getTime(res.endDateTime)}:00</Text>
                            ))}
                        </View>
                    </View>
                )}
                <View>
                    <DayShortcutButtons setStartTime={setStartTime} setEndTime={setEndTime} />
                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <TimePicker setStartTime={setStartTime} setEndTime={setEndTime}
                            startTime={startTimeReservation} endTime={endTimeReservation} />
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <IconButton testID="ReserveButton" icon={'check'} onPress={handleReserve} />
                            <IconButton testID="CancelButton" icon={'close'} onPress={() => setDialogVisible(false)} />
                        </View>
                    </View>
                </View>
            </Dialog.Content>
        </Dialog>
    );
}