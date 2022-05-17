import React from "react";
import { Dialog, IconButton, Text} from "react-native-paper";
import TimePicker from "../../dateTimePicker/components/TimePicker";
import useSeat from "../../shared/hooks/useSeat";
import {Seat} from "../types/Seat";
import {toast} from "@jamsch/react-native-toastify";
import {DeviceEventEmitter, View} from "react-native";
import {Reservation} from "../types/Reservation";

interface Props {
    seat: Seat,
    visible: boolean,
    setDialogVisible: (b: boolean) => void,
    date: Date
}

export default function ReserveSeatDialog({seat, visible, setDialogVisible, date}: Props) {
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const {reserveSeat} = useSeat();

    const handleReserve = async () => {
        if (startTime.length != 0 && endTime.length != 0 && date != undefined) {
            const startTimeWithDate = date.toJSON().substring(0, 10) + " " + (startTime.length < 3 ? startTime + ":00" : startTime) + ":00";
            const endTimeWithDate = date.toJSON().substring(0, 10) + " " + (endTime.length < 3 ? endTime + ":00" : endTime) + ":00";
            await reserveSeat(seat.id, startTimeWithDate, endTimeWithDate);
            DeviceEventEmitter.emit("event.refetchSeats", {});
            setDialogVisible(false);
        } else {
            toast.error("The given date/time is not valid.")
        }
    }

    return (
        <Dialog visible={visible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Make a reservation for seat: {seat.name}</Dialog.Title>
            <Dialog.Content>
                <View>
                    <Text>Unavailable:</Text>
                    {seat.reservations.map((res: Reservation) => (
                        <Text style={{color: 'red'}} key={res.id}>{res.startDateTime.substring(11,16)} - {res.endDateTime.substring(11,16)}</Text>
                    ))}
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <TimePicker setStartTime={setStartTime} setEndTime={setEndTime}
                                startTime={startTime} endTime={endTime}/>
                    <IconButton testID="ReserveButton" icon={'check'} onPress={handleReserve}/>
                    <IconButton testID="CancelButton" icon={'close'} onPress={() => setDialogVisible(false)}/>
                </View>
            </Dialog.Content>
        </Dialog>
    );
}