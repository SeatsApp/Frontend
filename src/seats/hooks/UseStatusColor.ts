import { SeatStatus } from "../types/SeatStatus";

export default function useStatusColor(seatStatus: string) {
    if (seatStatus == SeatStatus.AVAILABLE.toString()) {
        return '#00bf5f'
    }

    if (seatStatus == SeatStatus.PARTIALLY_BOOKED.toString()) {
        return "orange"
    }

    if (seatStatus == SeatStatus.FULLY_BOOKED.toString()) {
        return 'red'
    }

    if (seatStatus == SeatStatus.UNAVAILABLE.toString()) {
        return "gray"
    }
}