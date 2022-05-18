import React from 'react'
import { View } from 'react-native';
import { Seat } from '../../../seats/types/Seat';
import XploreGroupFloor1 from './XploreGroupFloor1';

interface XploreGroupFloorPlanProps {
    seats: Seat[];
    floorNumber: number;
}

export default function XploreGroupFloorPlan({ seats, floorNumber }: XploreGroupFloorPlanProps) {
    if (floorNumber == 1) {
        return (<XploreGroupFloor1 seats={seats} />)
    }
    return (<View />)
}