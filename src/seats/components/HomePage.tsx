import React, { useEffect, useState } from 'react'
import ActionMenu from './ActionMenu'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import BuildingFloorPlan from '../../svg/components/BuildingFloorPlan';
import { DeviceEventEmitter, View, ScrollView } from 'react-native';
import DatePicker from "../../dateTimePicker/components/DatePicker";
import SeatsSwitchButtons from './SeatsSwitchButtons';
import { Portal, Provider } from "react-native-paper";
import ReserveSeatDialog from './ReserveSeatDialog';
import DayShortcutButtons from './DayShortcutButtons';
import TimePicker from '../../dateTimePicker/components/TimePicker';
import useGetSeatStatus from '../hooks/useGetSeatStatus';
import useBuilding from '../hooks/useBuilding';

export default function HomePage() {
    const [date, setDate] = useState<Date>(new Date());
    const { readSelectedBuildingByDate } = useBuilding();
    const [showSeatsList, setShowSeatsList] = useState<boolean>(false);

    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("24:00");

    const [dialogVisible, setDialogVisible] = useState(false);
    const [clickedSeat, setClickedSeat] = useState<Seat | undefined>(undefined);

    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState(false);

    const { selectedBuilding, refetchSeats } = readSelectedBuildingByDate(1, 2, date.toJSON().split("T")[0]);

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
        setStatusForSeats(selectedBuilding.seats, startTime, endTime, setLoading)
        setSeats(selectedBuilding.seats)
    }, [selectedBuilding.seats])

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
                    {showSeatsList ?
                        seats.map((seat: Seat) => (
                            <CardSeat updateDialog={updateDialog} key={seat.id} seat={seat} />
                        )) :
                        <BuildingFloorPlan updateDialog={updateDialog} seats={seats}
                            floorPoints={selectedBuilding.floorPoints} />
                    }
                </ScrollView >
            </View >
        </Provider >
    )
}
