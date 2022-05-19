import React from 'react'
import { View } from 'react-native';
import { Seat } from '../../seats/types/Seat';
import { Companies } from './Companies';
import XploreGroupFloorPlan from './Xplore Group/XploreGroupFloorPlan';

interface BuildingFloorPlanProps {
    seats: Seat[];
    company: Companies;
    floorNumber: number;
}

export default function BuildingFloorPlan({ seats, company, floorNumber }: BuildingFloorPlanProps) {
    if (company == Companies.Xplore_Group)
        return <XploreGroupFloorPlan seats={seats} floorNumber={floorNumber} />
    return <View />
}
