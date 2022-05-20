import React from "react";
import { View } from "react-native";
import useGetMyReservations from "../hooks/useGetMyReservations";
import { UserReservation } from "../type/UserReservation";
import ReservationCard from "./ReservationCard";

export default function MyReservations() {
    const { userReservations, refetchSeats } = useGetMyReservations()

    return (
        <View>
            {userReservations.map((userReservation: UserReservation) => (
                <ReservationCard key={userReservation.id} userReservation={userReservation}
                    refetchMyReservations={refetchSeats} />
            ))}
        </View>
    )
}