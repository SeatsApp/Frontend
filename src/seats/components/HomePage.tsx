import React, { useEffect, useState } from 'react'
import ActionMenu from './ActionMenu'
import CardSeat from './CardSeat';
import { Seat } from '../types/Seat';
import BuildingFloorPlan from '../../svg/components/BuildingFloorPlan';
import {DeviceEventEmitter, View, ScrollView, ImageBackground} from 'react-native';
import DatePicker from "../../dateTimePicker/components/DatePicker";
import {Button, Portal, ToggleButton, Text} from "react-native-paper";
import ReserveSeatDialog from './ReserveSeatDialog';
import useGetSeatStatus from '../hooks/useGetSeatStatus';
import useBuilding from '../hooks/useBuilding';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { theme } from "../../../theme";
import FilterDialog from "./FilterDialog";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { RootStackParamList } from "../../../App";
import { SelectedBuilding } from '../types/SelectedBuilding';

type homeScreenProp = NavigationProp<RootStackParamList, 'Home'>;

export default function HomePage() {
    const navigation = useNavigation<homeScreenProp>();
    const [date, setDate] = useState<Date>(new Date());
    const { readSelectedBuildingByDate } = useBuilding();
    const [showSeatsList, setShowSeatsList] = useState<boolean>(false);

    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("24:00");
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [clickedSeat, setClickedSeat] = useState<Seat | undefined>(undefined);

    const [selectedBuilding, setSelectedBuilding] = useState<SelectedBuilding>({
        buildingId: 0,
        buildingName: "",
        floorId: 0,
        floorName: "",
        floorPoints: [],
        seats: []
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { selectedBuilding: foundBuilding, refetchBuilding: refetchSelectedBuilding } =
        readSelectedBuildingByDate(1, 2, date.toJSON().split("T")[0]);

    const refetchBuilding = (() => {
        refetchSelectedBuilding(selectedBuilding.buildingId,
            selectedBuilding.floorId, date.toJSON().split("T")[0]);
    });

    DeviceEventEmitter.removeAllListeners()
    DeviceEventEmitter.addListener("event.refetchSeats", () => {
        refetchBuilding();
    });

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ToggleButton status={!showSeatsList ? 'unchecked' : 'checked'}
                              style={{
                                  marginRight: 2, marginLeft: 5,
                                  backgroundColor: showSeatsList ? theme.colors.primary : '#fff'
                              }}
                              color={showSeatsList ? '#fff' : theme.colors.primary}
                              icon={'format-list-text'} onPress={onToggleSwitch}

                />
            ),
        });
    }, [navigation, showSeatsList])

    const onToggleSwitch = () => {
        setShowSeatsList((c) => !c);
    };


    const updateDialog = (seat: Seat, visible: boolean) => {
        setClickedSeat(seat)
        setDialogVisible(visible)
    };

    const setStatusForSeats = (changedSeats: Seat[], startHour: string, endHour: string, setLoadingAssignStatus: (boolean: boolean) => void) => {
        setLoadingAssignStatus(true);
        (async () =>
            changedSeats.forEach((seat, index) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                changedSeats[index].seatStatus = useGetSeatStatus(seat, startHour, endHour)
            })
        )()
            .then(() => {
                setLoadingAssignStatus(false)
            })
    }

    useEffect(() => {
        setStatusForSeats(foundBuilding.seats, startTime, endTime, setLoading)
        setSelectedBuilding(foundBuilding)
    }, [foundBuilding])

    useEffect(() => {
        setStatusForSeats(selectedBuilding.seats, startTime, endTime, setLoading)
    }, [startTime, endTime])

    return (

        <View style={{
            flexShrink: 1,
            height: '100%',
            width: '100%'
        }}>
            <ImageBackground resizeMode='cover' style={{
                flex: 1,
                justifyContent: "center"
            }} source={require('../../../assets/cronosLogin.png')}>
            <ActionMenu/>
            {clickedSeat !== undefined &&
                <Portal>
                    <ReserveSeatDialog date={date} visible={dialogVisible} setDialogVisible={setDialogVisible}
                        seat={clickedSeat} startTime={startTime} endTime={endTime} />
                </Portal>
            }
            <Portal>
                <FilterDialog endTime={endTime} setEndTime={setEndTime} setStartTime={setStartTime}
                    setVisible={setFilterVisible} startTime={startTime} visible={filterVisible}
                    selectedBuilding={selectedBuilding}
                    refetchBuilding={refetchBuilding} />
            </Portal>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                margin: 5,
                justifyContent: 'space-evenly',
                backgroundColor: theme.colors.primary
            }}>
                <DatePicker updateState={setDate} date={date}/>
                <Text style={{color: theme.colors.accent}}>|</Text>
                <Button onPress={() => setFilterVisible(true)}
                        color={theme.colors.accent} icon='tune'>filter</Button>
            </View>
            {showSeatsList ?
                <ScrollView>
                    <View>
                        {selectedBuilding.seats.map((seat: Seat) => (
                            <CardSeat updateDialog={updateDialog} key={seat.id} seat={seat} />
                        ))}
                    </View>
                </ScrollView> :
                <ReactNativeZoomableView
                    maxZoom={30}
                    contentWidth={300}
                    contentHeight={150}
                >
                    <BuildingFloorPlan updateDialog={updateDialog} seats={selectedBuilding.seats}
                        floorPoints={selectedBuilding.floorPoints} />
                </ReactNativeZoomableView>
            }
            </ImageBackground>
        </View>
    )
}
