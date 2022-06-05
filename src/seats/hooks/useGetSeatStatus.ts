import { getEndTime, getTime } from "../../shared/hooks/DateFunctions";
import { Reservation } from "../types/Reservation";
import { Seat } from "../types/Seat";
import { SeatStatus } from "../types/SeatStatus";

export default function useGetSeatStatus(seat: Seat, startHourString: string, endHourString: string) {
    if (SeatStatus[seat.seatStatus] == SeatStatus.UNAVAILABLE.toString()) {
        return SeatStatus[SeatStatus.UNAVAILABLE]
    }

    let startHour = parseInt(startHourString.split(":")[0])
    const endHour = parseInt(endHourString.split(":")[0])

    if (seat.reservations.length === 0 || !areReservationsBetweenHours(seat, startHour, endHour)) {
        return SeatStatus[SeatStatus.AVAILABLE];
    }

    seat.reservations.sort((a, b) => {
        const aStartTime = parseInt(getTime(a.startDateTime))
        const bStartTime = parseInt(getTime(b.startDateTime))
        return aStartTime - bStartTime
    })

    let seatStatus = undefined;
    seat.reservations.forEach((reservation) => {
        const endHourReservation = parseInt(getEndTime(reservation.endDateTime))

        if (isReservationEndingBeforeFilterStartHour(startHour, endHourReservation)) {
            if (isStartHourBetweenReservation(startHour, reservation)) {
                startHour = endHourReservation
            } else {
                seatStatus = SeatStatus[SeatStatus.PARTIALLY_BOOKED];
            }
        }

        if (startHour >= endHour) {
            seatStatus = SeatStatus[SeatStatus.FULLY_BOOKED];
        }
    })
    if (seatStatus !== undefined) {
        return seatStatus
    }

    return SeatStatus[SeatStatus.PARTIALLY_BOOKED];
}

function isReservationEndingBeforeFilterStartHour(startHour: number, endHourReservation: number) {
    return startHour < endHourReservation
}

function areReservationsBetweenHours(seat: Seat, startHour: number, endHour: number) {
    let reservationsBetweenHours = false

    seat.reservations.forEach((reservation) => {
        const startHourReservation = parseInt(getTime(reservation.startDateTime))
        const endHourReservation = parseInt(getEndTime(reservation.endDateTime))

        if (startHour <= startHourReservation && endHour > startHourReservation
            || startHour < endHourReservation && endHour >= endHourReservation
            || startHour > startHourReservation && startHour < endHourReservation) {
            reservationsBetweenHours = true
        }
    })
    return reservationsBetweenHours
}

function isStartHourBetweenReservation(startHour: number, reservation: Reservation): boolean {
    const startHourReservation = parseInt(getTime(reservation.startDateTime))
    const endHourReservation = parseInt(getEndTime(reservation.endDateTime))

    return startHour === startHourReservation
        || startHour > startHourReservation
        && startHour < endHourReservation
}