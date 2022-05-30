import React from 'react'
import { View } from 'react-native';
import { Seat } from '../../../seats/types/Seat';
import XploreGroupFloor1 from './XploreGroupFloor1';

interface XploreGroupFloorPlanProps {
    seats: Seat[];
    floorNumber: number;
    updateDialog(seat: Seat, visible: boolean): void
}

export default function XploreGroupFloorPlan({ seats, floorNumber, updateDialog }: XploreGroupFloorPlanProps) {
    if (floorNumber == 1) {
        return (<XploreGroupFloor1 updateDialog={updateDialog} seats={seats} />)
    }
    return (<View />)
}