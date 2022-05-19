import React from 'react'
import { G, Rect, Text } from 'react-native-svg';
import useStatusColor from '../../seats/hooks/UseStatusColor';
import { Seat } from '../../seats/types/Seat';
import { SeatStatus } from '../../seats/types/SeatStatus';

interface OfficeIslandProps {
    rows: number;
    columns: number;
    startX: number;
    startY: number;
    widthBureau: number;
    heightBureau: number;
    islandId: string;
    seats: Seat[];
}

export default function OfficeIsland({ rows, columns, startX, startY, widthBureau, heightBureau, islandId, seats }: OfficeIslandProps) {
    let i = 1;
    return (
        <G>
            {[...Array(rows)].map((_x, indexX) =>
                <G key={indexX}>
                    {[...Array(columns)].map((_y, indexY) => {
                        const seatName = "" + islandId + i++
                        const seat = seats.find(seat => seat.name === seatName)
                        let seatStatus;
                        if (seat === undefined) {
                            seatStatus = SeatStatus["UNAVAILABLE"].toString()
                        }
                        else {
                            seatStatus = SeatStatus[seat.seatStatus]
                        }
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return (< G key={seatName} name={seatName} >
                            <Rect strokeWidth="1" stroke="#000" height={heightBureau} width={widthBureau}
                                y={startY + (heightBureau * indexY)} x={startX + (widthBureau * indexX)}
                                fill={useStatusColor(seatStatus)} />
                            <Text y={(startY + (heightBureau * indexY) + (heightBureau / 2))}
                                x={(startX + (widthBureau * indexX) + (heightBureau > widthBureau ?
                                    (widthBureau / 5) : (widthBureau / 3)))}
                                fontSize={(heightBureau < widthBureau) ? (heightBureau / 2) : (widthBureau / 2)}
                                fill="blue">{seatName}</Text>
                        </G>)
                    })}
                </G>
            )
            }
        </G >
    );
}