import React from "react";
import useGetMyReservations from "../hooks/useGetMyReservations";
import { UserReservation } from "../type/UserReservation";
import ReservationCard from "./ReservationCard";
import {ScrollView} from "react-native";

export default function MyReservations() {
    const { userReservations, refetchSeats } = useGetMyReservations()

    return (
        <ScrollView>
            {userReservations.map((userReservation: UserReservation) => (
                <ReservationCard key={userReservation.id} userReservation={userReservation}
                    refetchMyReservations={refetchSeats} />
            ))}
        </ScrollView>
    )
}