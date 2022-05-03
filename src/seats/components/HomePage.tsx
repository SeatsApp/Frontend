import React from 'react'
import AddSeatButton from './AddSeatButton'
import CardSeat from './CardSeat';
import {Seat} from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';
import BuildingFloorPlan from '../../svg/buildings/BuildingFloorPlan';
import {Companies} from '../../svg/buildings/Companies';
import {Provider} from "react-native-paper";
import { DeviceEventEmitter, View, ScrollView } from 'react-native';

export default function HomePage() {
    const {readSeats} = useSeat();

    const {seats, refetchSeats} = readSeats()

    DeviceEventEmitter.addListener("event.refetchSeats", () =>
        refetchSeats());

    return (
        <Provider>
            <View>
                <AddSeatButton/>
                <ScrollView>
                    <BuildingFloorPlan company={Companies.Xplore_Group} floorNumber={1}/>
                    {seats.map((seat: Seat) => (
                        <CardSeat key={seat.id} seat={seat}/>
                    ))}
                </ScrollView>
            </View>
        </Provider>
    )
}
