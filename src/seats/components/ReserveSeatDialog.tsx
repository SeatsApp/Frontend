import React from "react";
import {Button, Dialog} from "react-native-paper";
import DateTimePicker from "../../dateTimePicker/components/DateTimePicker";
import useSeat from "../../shared/hooks/useSeat";
import {Seat} from "../types/Seat";
import {toast} from "@jamsch/react-native-toastify";


interface Props {
    seat: Seat,
    visible: boolean,
    setDialogVisible: (b: boolean) => void
}

export default function ReserveSeatDialog({seat, visible, setDialogVisible}: Props) {
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [date, setDate] = React.useState<Date>(new Date());
    const {reserveSeat} = useSeat();

    const handleReserve = async () => {
        if (startTime.length != 0 && endTime.length != 0 && date != undefined) {
            const startTimeWithDate = date.toJSON().substring(0, 10) + " " + (startTime.length < 3 ? startTime + ":00" : startTime) + ":00";
            const endTimeWithDate = date.toJSON().substring(0, 10) + " " + (endTime.length < 3 ? endTime + ":00" : endTime) + ":00";
            await reserveSeat(seat.id, startTimeWithDate, endTimeWithDate);
            setDialogVisible(false);
        } else {
            toast.error("The given date/time is not valid.")
        }
    }

    return (
        <Dialog visible={visible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>Make a reservation for seat: {seat.name}</Dialog.Title>
            <Dialog.Content>
                <DateTimePicker setStartTime={setStartTime} setEndTime={setEndTime}
                                date={date} startTime={startTime} endTime={endTime} setDate={setDate}/>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={handleReserve}>Reserve</Button>
                <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
            </Dialog.Actions>
        </Dialog>
    );
}