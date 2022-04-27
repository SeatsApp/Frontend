import React from 'react'
import { View } from 'react-native';
import { Companies } from './Companies';
import XploreGroupFloorPlan from './Xplore Group/XploreGroupFloorPlan';

interface BuildingFloorPlanProps {
    company: Companies;
    floorNumber: number;
}

export default function BuildingFloorPlan({ company, floorNumber }: BuildingFloorPlanProps) {
    if (company == Companies.Xplore_Group)
        return <XploreGroupFloorPlan floorNumber={floorNumber} />
    return <View />
}
