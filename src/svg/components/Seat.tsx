import React from 'react'
import { G, Rect, Text } from 'react-native-svg';
import useStatusColor from '../../seats/hooks/useStatusColor';
import { Seat as SeatObject } from '../../seats/types/Seat';
import { SeatStatus } from '../../seats/types/SeatStatus';

interface SeatProps {
    seat: SeatObject;
    updateDialog(seat: SeatObject, visible: boolean): void
}

export default function Seat({ seat, updateDialog }: SeatProps) {
    let seatStatus;
    if (seat === undefined) {
        seatStatus = SeatStatus["UNAVAILABLE"].toString()
    } else {
        seatStatus = SeatStatus[seat.seatStatus]
    }
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <G testID={seat.name} onPress={() => updateDialog(seat, true)}
            onClick={() => updateDialog(seat, true)} key={seat.id} name={seat.name}>
            <Rect strokeWidth="1" stroke="#000" height={seat.height} width={seat.width}
                y={seat.ycoordinates} x={seat.xcoordinates}
                fill={useStatusColor(seatStatus)} />
            <Text y={(seat.ycoordinates + (seat.height / 2))}
                x={(seat.xcoordinates + (seat.height > seat.width ?
                    (seat.width / 5) : (seat.width / 3)))}
                fontSize={(seat.height < seat.width) ? (seat.height / 2) : (seat.width / 2)}
                fill="blue">{seat.name}</Text>
        </G>
    )
}