import React from "react";
import useGetMyReservations from "../hooks/useGetMyReservations";
import {UserReservation} from "../type/UserReservation";
import ReservationCard from "./ReservationCard";
import {ImageBackground, ScrollView, View} from "react-native";
import LoadingScreen from "../../shared/components/LoadingScreen";
import {getDateMilliseconds} from "../../shared/hooks/DateFunctions";
import {Title} from "react-native-paper";

export function sortReservations(reservation1: UserReservation, reservation2: UserReservation): number {
    const dateSumRes1 = getDateMilliseconds(reservation1.startDateTime)
    const dateSumRes2 = getDateMilliseconds(reservation2.startDateTime)
    if (dateSumRes1 > dateSumRes2) {
        return -1
    } else if (dateSumRes2 > dateSumRes1) {
        return 1
    }
    return 0
}

export default function MyReservations() {
    const {userReservations, refetchSeats, loading} = useGetMyReservations()

    return (
        <ImageBackground resizeMode='cover' style={{
            flex: 1,
            justifyContent: "center",
        }} source={require('../../../assets/background.png')}>
            {loading && <LoadingScreen />}
            {
                userReservations.length < 1 ?
                    <View style={{alignSelf: 'center'}}>
                        <Title style={{fontSize: 20, fontWeight: 'bold'}}>Currently no reservations.</Title>
                    </View>
                    : <ScrollView>
                        {userReservations.sort(sortReservations).map((userReservation: UserReservation) => (
                            <ReservationCard key={userReservation.id} userReservation={userReservation}
                                             refetchMyReservations={refetchSeats}/>
                        ))}
                    </ScrollView>
            }
        </ImageBackground>
    )
}