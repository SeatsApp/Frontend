import {render} from "@testing-library/react-native";
import React from "react";
import SeatsOverview from "../../src/seats/components/SeatsOverview";
import {SelectedBuilding} from "../../src/seats/types/SelectedBuilding";
import {SeatStatus} from "../../src/seats/types/SeatStatus";
import {Provider} from "react-native-paper";

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});

const building: SelectedBuilding = {
    buildingName: 'test',
    buildingId: 1,
    floorName: 'test',
    floorPoints: [],
    floorId: 1,
    seats: [{
        id: 1,
        height: 1,
        width: 1,
        name: 'test',
        reservations: [],
        ycoordinates: 1,
        xcoordinates: 1,
        seatStatus: SeatStatus.AVAILABLE
    }]
}

test("renders the page correctly", () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, () => null]).mockImplementationOnce(() => [undefined, () => null])

    const tree = render(<Provider><SeatsOverview showSeatsList={true} selectedBuilding={building} date={new Date()} startTime={''} endTime={''} /></Provider>).toJSON()
    expect(tree).toMatchSnapshot()
});

test("renders the page correctly", () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [false, () => null]).mockImplementationOnce(() => [building.seats[0], () => null])

    const tree = render(<Provider><SeatsOverview showSeatsList={false} selectedBuilding={building} date={new Date()} startTime={''} endTime={''} /></Provider>).toJSON()
    expect(tree).toMatchSnapshot()
});