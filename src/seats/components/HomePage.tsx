import React from 'react'
import ActionMenu from './ActionMenu'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';
import BuildingFloorPlan from '../../svg/buildings/BuildingFloorPlan';
import { Companies } from '../../svg/buildings/Companies';
import { Provider } from "react-native-paper";
import { DeviceEventEmitter, View, ScrollView } from 'react-native';
import DatePicker from "../../dateTimePicker/components/DatePicker";

export default function HomePage() {
    const [date, setDate] = React.useState<Date>(new Date());
    const { readSeatsByDate } = useSeat();

    const { seats, refetchSeats } = readSeatsByDate(date.toJSON().substring(0, 10));

    DeviceEventEmitter.removeAllListeners()
    DeviceEventEmitter.addListener("event.refetchSeats", () =>
        refetchSeats()
    );

    return (
        <Provider>
            <View>
                <ActionMenu />
                <ScrollView>
                    <DatePicker updateState={setDate} date={date} />
                    <BuildingFloorPlan date={date} seats={seats} company={Companies.Xplore_Group} floorNumber={1} />
                    {seats.map((seat: Seat) => (
                        <CardSeat date={date} key={seat.id} seat={seat} />
                    ))}
                </ScrollView>
            </View>
        </Provider>
    )
}
