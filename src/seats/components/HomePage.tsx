import React, { useEffect, useState } from 'react'
import ActionMenu from './ActionMenu'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';
import BuildingFloorPlan from '../../svg/buildings/BuildingFloorPlan';
import { Companies } from '../../svg/buildings/Companies';
import { DeviceEventEmitter, View, ScrollView } from 'react-native';
import DatePicker from "../../dateTimePicker/components/DatePicker";
import SeatsSwitchButtons from './SeatsSwitchButtons';
import { Portal, Provider } from "react-native-paper";
import ReserveSeatDialog from './ReserveSeatDialog';
import DayShortcutButtons from './DayShortcutButtons';
import TimePicker from '../../dateTimePicker/components/TimePicker';
import useGetSeatStatus from '../hooks/useGetSeatStatus';

export default function HomePage() {
    const [date, setDate] = useState<Date>(new Date());
    const { readSeatsByDate } = useSeat();
    const [showSeatsList, setShowSeatsList] = useState<boolean>(false);

    const [startTime, setStartTime] = useState("0");
    const [endTime, setEndTime] = useState("24");

    const [dialogVisible, setDialogVisible] = useState(false);
    const [clickedSeat, setClickedSeat] = useState<Seat | undefined>(undefined);

    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(false);

    const { seats: foundSeats, refetchSeats } = readSeatsByDate(date.toJSON().substring(0, 10));

    DeviceEventEmitter.removeAllListeners()
    DeviceEventEmitter.addListener("event.refetchSeats", () =>
        refetchSeats()
    );

    const updateDialog = (seat: Seat, visible: boolean) => {
        setClickedSeat(seat)
        setDialogVisible(visible)
    };

    const setStatusForSeats = (changedSeats: Seat[], startHour: string, endHour: string, setLoadingAssignStatus: (boolean: boolean) => void) => {
        setLoadingAssignStatus(true);
        (async () =>
            changedSeats.forEach((seat, index) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                changedSeats[index].seatStatus = useGetSeatStatus(seat, startHour, endHour)
            })
        )()
            .then(() => {
                setLoadingAssignStatus(false)
            })
    }

    useEffect(() => {
        setStatusForSeats(foundSeats, startTime, endTime, setLoading)
        setSeats(foundSeats)
    }, [foundSeats])

    useEffect(() => {
        setStatusForSeats(seats, startTime, endTime, setLoading)
    }, [startTime, endTime])

    useEffect(() => {
        //
    }, [loading])

    return (
        <Provider>
            <View>
                <SeatsSwitchButtons setShowSeatsList={setShowSeatsList} />
                <ActionMenu />
                {clickedSeat !== undefined &&
                    <Portal>
                        <ReserveSeatDialog date={date} visible={dialogVisible} setDialogVisible={setDialogVisible}
                            seat={clickedSeat} startTime={startTime} endTime={endTime} />
                    </Portal>
                }
                <ScrollView>
                    <DatePicker updateState={setDate} date={date} />
                    <DayShortcutButtons setStartTime={setStartTime} setEndTime={setEndTime} />
                    <TimePicker setStartTime={setStartTime} setEndTime={setEndTime}
                        startTime={startTime} endTime={endTime} />
                    <BuildingFloorPlan updateDialog={updateDialog} seats={seats} company={Companies.Xplore_Group} floorNumber={1} />
                    {showSeatsList ?
                        seats.map((seat: Seat) => (
                            <CardSeat updateDialog={updateDialog} key={seat.id} seat={seat} />
                        )) :
                        <BuildingFloorPlan updateDialog={updateDialog} seats={seats} company={Companies.Xplore_Group} floorNumber={1} />
                    }
                </ScrollView >
            </View >
        </Provider >
    )
}
