import React from 'react'
import { View } from 'react-native';
import XploreGroupFloor1 from './XploreGroupFloor1';

interface XploreGroupFloorPlanProps {
    floorNumber: number;
}

export default function XploreGroupFloorPlan({ floorNumber }: XploreGroupFloorPlanProps) {
    if (floorNumber == 1) {
        return (<XploreGroupFloor1 />)
    }
    return (<View />)
}