import React from 'react'
import { ScrollView, DeviceEventEmitter, View } from 'react-native'
import AddSeatButton from './AddSeatButton'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';
import BuildingFloorPlan from '../../svg/buildings/BuildingFloorPlan';
import { Companies } from '../../svg/buildings/Companies';

export default function HomePage() {
  const { readSeats } = useSeat();

  const { seats, refetchSeats } = readSeats()

  DeviceEventEmitter.addListener("event.refetchSeats", () =>
    refetchSeats());

  return (
    <View>
      <BuildingFloorPlan company={Companies.Xplore_Group} floorNumber={1} />
      <AddSeatButton />
      <ScrollView>
        {seats.map((seat: Seat) => (
          <CardSeat key={seat.id} seat={seat} />
        ))}
      </ScrollView>
    </View>
  )
}
