import {ScrollView, View} from "react-native";
import {Seat} from "../types/Seat";
import CardSeat from "./CardSeat";
import {ReactNativeZoomableView} from "@openspacelabs/react-native-zoomable-view";
import BuildingFloorPlan from "../../svg/components/BuildingFloorPlan";
import React, {useState} from "react";
import {Portal} from "react-native-paper";
import ReserveSeatDialog from "./ReserveSeatDialog";
import {SelectedBuilding} from "../types/SelectedBuilding";

interface SeatsViewProps {
    showSeatsList: boolean;
    selectedBuilding: SelectedBuilding;
    date: Date;
    startTime: string;
    endTime: string;
}

export default function SeatsOverview({selectedBuilding, showSeatsList, date, startTime, endTime}: SeatsViewProps) {
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [clickedSeat, setClickedSeat] = useState<Seat | undefined>(undefined);

    const updateDialog = (seat: Seat, visible: boolean) => {
        setClickedSeat(seat)
        setDialogVisible(visible)
    };

    return (
        <>
            {showSeatsList ?
                <ScrollView>
                    <View>
                        {selectedBuilding.seats.map((seat: Seat) => (
                            <CardSeat updateDialog={updateDialog} key={seat.id} seat={seat}/>
                        ))}
                    </View>
                </ScrollView> :
                <ReactNativeZoomableView
                    maxZoom={30}
                    contentWidth={300}
                    contentHeight={150}
                >
                    <BuildingFloorPlan updateDialog={updateDialog} seats={selectedBuilding.seats}
                                       floorPoints={selectedBuilding.floorPoints}/>
                </ReactNativeZoomableView>
            }

            {clickedSeat !== undefined &&
                <Portal>
                    <ReserveSeatDialog date={date} visible={dialogVisible} setDialogVisible={setDialogVisible}
                                       seat={clickedSeat} startTime={startTime} endTime={endTime}/>
                </Portal>
            }
        </>
    )
}