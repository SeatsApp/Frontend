import DropDown from "react-native-paper-dropdown";
import React, { useState } from 'react'
import { Building } from "../types/Building";
import { SelectedBuilding } from "../types/SelectedBuilding";
import useBuilding from "../hooks/useBuilding";
import { Floor } from "../types/Floor";
import { View } from "react-native";

interface DropDownBuildingFloorListProps {
    selectedBuilding: SelectedBuilding;
    refetchBuilding: () => void;
}

interface ListProps {
    label: string;
    value: string;
}

export default function DropDownBuildingFloorList({ selectedBuilding, refetchBuilding }
    : DropDownBuildingFloorListProps) {
    const { readAllBuildings } = useBuilding();
    const { allBuildings, loading: loadingAllBuildings } = readAllBuildings()

    const [showBuildingDropDown, setShowBuildingDropDown] = useState<boolean>(false);
    const [showFloorDropDown, setShowFloorDropDown] = useState<boolean>(false);

    const buildingList: ListProps[] = [];
    const floorList: ListProps[] = [];

    const reloadFloorList = (buildingForReload: Building) => {
        buildingForReload.floors.forEach((floor: Floor) => {
            const length = floorList.length
            floorList[length] = {
                label: floor.name,
                value: floor.id.toLocaleString(),
            }
        });
    }

    allBuildings.forEach((building: Building) => {
        const buildingsLength = buildingList.length
        buildingList[buildingsLength] = {
            label: building.name,
            value: building.id.toLocaleString(),
        }

        if (selectedBuilding.buildingId === building.id) {
            reloadFloorList(building)
        }
    });

    const clickBuilding = (newBuildingId: string) => {
        const buildingWithId: Building | undefined = allBuildings.find(obj => {
            return obj.id === Number(newBuildingId);
        });
        let foundFloorId = 0;
        if (buildingWithId !== undefined) {
            if (buildingWithId.floors.length !== 0) {
                foundFloorId = buildingWithId.floors[0].id
            }

            reloadFloorList(buildingWithId)
        }

        selectedBuilding.buildingId = Number(newBuildingId)
        selectedBuilding.floorId = foundFloorId
        refetchBuilding()
    }

    const clickFloor = (newFloorId: string) => {
        selectedBuilding.floorId = Number(newFloorId)
        refetchBuilding()
    }

    if (!loadingAllBuildings) {
        <View></View>
    }

    return (
        <View>
            <DropDown
                label={"Building name"}
                mode={"outlined"}
                visible={showBuildingDropDown}
                showDropDown={() => setShowBuildingDropDown(true)}
                onDismiss={() => setShowBuildingDropDown(false)}
                value={selectedBuilding.buildingId.toLocaleString()}
                setValue={clickBuilding}
                list={buildingList}
                dropDownStyle={{ marginTop: 0 }}
            />
            <DropDown
                label={"floor name"}
                mode={"outlined"}
                visible={showFloorDropDown}
                showDropDown={() => setShowFloorDropDown(true)}
                onDismiss={() => setShowFloorDropDown(false)}
                value={selectedBuilding.floorId.toLocaleString()}
                setValue={clickFloor}
                list={floorList}
                dropDownStyle={{ marginTop: 0 }}
            />
        </View>
    );
}