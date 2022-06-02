import React from 'react'
import { Dimensions, View } from 'react-native';
import { G, Polyline, Svg } from 'react-native-svg';
import { Point } from '../../seats/types/Point';
import { Seat as SeatObject } from '../../seats/types/Seat';
import Seat from './Seat';
import {theme} from "../../../theme";

interface BuildingFloorPlanProps {
    seats: SeatObject[];
    floorPoints: Point[];
    updateDialog(seat: SeatObject, visible: boolean): void
}

export default function BuildingFloorPlan({ seats, floorPoints, updateDialog }: BuildingFloorPlanProps) {
    let heightPoint = 0
    let widthPoint = 0
    let stringPoints = ""

    floorPoints.forEach((point: Point) => {
        if (widthPoint < point.firstPoint) {
            widthPoint = point.firstPoint
        }

        if (heightPoint < point.secondPoint) {
            heightPoint = point.secondPoint
        }
        stringPoints += point.firstPoint + "," + point.secondPoint + " "
    })

    let aspectRatio = 1;
    if (widthPoint !== 0 && heightPoint !== 0) {
        aspectRatio = widthPoint / heightPoint;
    }
    const windowWidth = Dimensions.get("window").width / 1.5;

    return (
        <View style={{ display: 'flex', alignItems: 'center' }} >
            <View style={{ width: windowWidth, aspectRatio }}>
                <Svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${widthPoint} ${heightPoint}`}
                >
                    <G>
                        <Polyline
                            //width,height
                            points={stringPoints}
                            fill={theme.colors.accent}
                            stroke="black"
                            strokeWidth="15"
                        />
                    </G>
                    {seats.map((seat: SeatObject) => (
                        <Seat key={seat.id} seat={seat} updateDialog={updateDialog} />
                    ))}
                </Svg>
            </View>
        </View>
    )
}
