import React from 'react'
import {View} from 'react-native';
import {Seat} from '../../seats/types/Seat';
import {Companies} from './Companies';
import XploreGroupFloorPlan from './Xplore Group/XploreGroupFloorPlan';

interface BuildingFloorPlanProps {
    seats: Seat[];
    company: Companies;
    floorNumber: number;
    date: Date;
}

export default function BuildingFloorPlan({seats, company, floorNumber, date}: BuildingFloorPlanProps) {
    if (company == Companies.Xplore_Group)
        return (
            <View>
                <XploreGroupFloorPlan date={date} seats={seats} floorNumber={floorNumber}/>
            </View>
        )
    return <View/>
}
