import React, { useState } from 'react'
import ActionMenu from './ActionMenu'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';
import BuildingFloorPlan from '../../svg/buildings/BuildingFloorPlan';
import { Companies } from '../../svg/buildings/Companies';
import { DeviceEventEmitter, View, ScrollView } from 'react-native';
import DatePicker from "../../dateTimePicker/components/DatePicker";
import SeatsSwitchButtons from './SeatsSwitchButtons';
import { Provider } from 'react-native-paper'

export default function HomePage() {
    const [date, setDate] = useState<Date>(new Date());
    const { readSeatsByDate } = useSeat();
    const [showSeatsList, setShowSeatsList] = useState<boolean>(false)

    const { seats, refetchSeats } = readSeatsByDate(date.toJSON().substring(0, 10));

    DeviceEventEmitter.removeAllListeners()
    DeviceEventEmitter.addListener("event.refetchSeats", () =>
        refetchSeats()
    );

    return (
        <Provider>
            <View>
                <SeatsSwitchButtons setShowSeatsList={setShowSeatsList} />
                <ActionMenu />
                <ScrollView>
                    <DatePicker updateState={setDate} date={date} />
                    {showSeatsList ?
                        seats.map((seat: Seat) => (
                            <CardSeat date={date} key={seat.id} seat={seat} />
                        )) :
                        <BuildingFloorPlan date={date} seats={seats} company={Companies.Xplore_Group} floorNumber={1} />
                    }
                </ScrollView>
            </View>
        </Provider>
    )
}
