import React, { useEffect, useState } from 'react'
import ActionMenu from './ActionMenu'
import { DeviceEventEmitter, View, ImageBackground } from 'react-native';
import { Portal, ToggleButton } from "react-native-paper";
import {setStatusMultipleSeats} from '../hooks/useGetSeatStatus';
import useBuilding from '../hooks/useBuilding';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { theme } from "../../../theme";
import FilterDialog from "./FilterDialog";
import { RootStackParamList } from "../../../App";
import { SelectedBuilding } from '../types/SelectedBuilding';
import LoadingScreen from "../../shared/components/LoadingScreen";
import DateFilterButtons from "./DateFilterButtons";
import SeatsOverview from "./SeatsOverview";

type homeScreenProp = NavigationProp<RootStackParamList, 'Home'>;

export default function HomePage() {
    const navigation = useNavigation<homeScreenProp>();
    const [date, setDate] = useState<Date>(new Date());
    const { readSelectedBuildingByDate, readAllBuildings } = useBuilding();
    const [showSeatsList, setShowSeatsList] = useState<boolean>(false);

    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("24:00");
    const [filterVisible, setFilterVisible] = useState<boolean>(false);

    const [selectedBuilding, setSelectedBuilding] = useState<SelectedBuilding>({
        buildingId: 0,
        buildingName: "",
        floorId: 0,
        floorName: "",
        floorPoints: [],
        seats: []
    });
    const [loading, setLoading] = useState<boolean>(false);

    const { allBuildings, loading: loadingAllBuildings, refetch: refetchAllBuildings } = readAllBuildings(false)

    const { selectedBuilding: foundBuilding, refetchBuilding: refetchSelectedBuilding, loading: loadingBuilding } =
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
                    icon={'format-list-text'} onPress={() => setShowSeatsList((c) => !c)}

                />
            ),
        });
    }, [navigation, showSeatsList])

    useEffect(() => {
        setStatusMultipleSeats(foundBuilding.seats, startTime, endTime, setLoading)
        setSelectedBuilding(foundBuilding)
    }, [foundBuilding])

    useEffect(() => {
        setStatusMultipleSeats(selectedBuilding.seats, startTime, endTime, setLoading)
    }, [startTime, endTime])

    useEffect(() => {
        if (allBuildings.length === 0) {
            refetchAllBuildings()
        }
    }, [!loadingBuilding])

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
                <ActionMenu />
                <DateFilterButtons selectedBuilding={selectedBuilding} date={date} setDate={setDate} setFilterVisible={setFilterVisible} refetchBuilding={refetchBuilding}/>
                {
                    (loading || loadingBuilding || loadingAllBuildings) && <LoadingScreen />
                }
                <Portal>
                    <FilterDialog endTime={endTime} setEndTime={setEndTime} setStartTime={setStartTime}
                        setVisible={setFilterVisible} startTime={startTime} visible={filterVisible}
                        selectedBuilding={selectedBuilding}
                        refetchBuilding={refetchBuilding} allBuildings={allBuildings} />
                </Portal>
                <SeatsOverview  date={date} endTime={endTime} selectedBuilding={selectedBuilding} showSeatsList={showSeatsList} startTime={startTime}/>
            </ImageBackground>
        </View>
    )
}
