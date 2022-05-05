import {Reservation} from "./Reservation";

export type Seat = {
    id: number,
    name: string
    reservations: Reservation[]
};
