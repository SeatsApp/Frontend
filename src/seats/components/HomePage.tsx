import React from 'react'
import { ScrollView, View, DeviceEventEmitter } from 'react-native'
import AddSeatButton from './AddSeatButton'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import useSeat from '../../shared/hooks/useSeat';

export default function HomePage() {
  const { readSeats } = useSeat();

  const { seats, refetchSeats } = readSeats()

  DeviceEventEmitter.addListener("event.createSeat", () =>
    refetchSeats());

  return (
    <View>
      <AddSeatButton />
      <ScrollView>
        {
          seats.map((seat: Seat) => (
            <CardSeat key={seat.id} seat={seat}></CardSeat>
          ))
        }
      </ScrollView>
    </View>
  )
}
