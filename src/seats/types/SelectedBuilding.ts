import { Point } from "./Point";
import { Seat } from "./Seat";

export type SelectedBuilding = {
    buildingId: number,
    buildingName: string,
    floorId: number,
    floorName: string,
    floorPoints: Point[],
    seats: Seat[]
};
