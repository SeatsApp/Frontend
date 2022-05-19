import { Reservation } from "./Reservation";
import { SeatStatus } from "./SeatStatus";

export type Seat = {
    id: number,
    name: string,
    seatStatus: SeatStatus,
    reservations: Reservation[]
};
