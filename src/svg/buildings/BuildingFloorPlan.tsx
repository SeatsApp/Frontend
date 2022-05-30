import React from 'react'
import {View} from 'react-native';
import {Seat} from '../../seats/types/Seat';
import {Companies} from './Companies';
import XploreGroupFloorPlan from './Xplore Group/XploreGroupFloorPlan';

interface BuildingFloorPlanProps {
    seats: Seat[];
    company: Companies;
    floorNumber: number;
    updateDialog(seat: Seat, visible: boolean): void
}

export default function BuildingFloorPlan({seats, company, floorNumber, updateDialog}: BuildingFloorPlanProps) {
    if (company == Companies.Xplore_Group)
        return (
            <View>
                <XploreGroupFloorPlan updateDialog={updateDialog} seats={seats} floorNumber={floorNumber}/>
            </View>
        )
    return <View/>
}
