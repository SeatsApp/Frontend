import { Point } from "./Point";
import { Seat } from "./Seat";

export type Floor = {
    id: number,
    name: string,
    points: Point[],
    seats: Seat[]
};
