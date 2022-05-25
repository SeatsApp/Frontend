import React from "react";
import useGetMyReservations from "../hooks/useGetMyReservations";
import {UserReservation} from "../type/UserReservation";
import ReservationCard from "./ReservationCard";
import {ImageBackground, ScrollView} from "react-native";

export default function MyReservations() {
    const {userReservations, refetchSeats} = useGetMyReservations()

    return (
        <ImageBackground resizeMode='cover' style={{
            flex: 1,
            justifyContent: "center"
        }} source={require('../../../assets/background.png')}>
            <ScrollView>
                {userReservations.map((userReservation: UserReservation) => (
                    <ReservationCard key={userReservation.id} userReservation={userReservation}
                                     refetchMyReservations={refetchSeats}/>
                ))}
            </ScrollView>
        </ImageBackground>
    )
}