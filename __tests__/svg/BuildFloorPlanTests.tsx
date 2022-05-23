import React from "react";
import renderer from "react-test-renderer";
import { SeatStatus } from "../../src/seats/types/SeatStatus";
import BuildingFloorPlan from "../../src/svg/buildings/BuildingFloorPlan";
import { Companies } from "../../src/svg/buildings/Companies";

jest.mock('@react-navigation/native');

test("renders the floorplan from Xplore Group of floor 1 correctly", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[{
        id: 1, name: "A1",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }]} company={Companies.Xplore_Group} floorNumber={1} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the floorplan from Xplore Group of a not existing floor 5", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[]} company={Companies.Xplore_Group} floorNumber={5} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the floorplan from Xplore Group of a not existing floor 5", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[]} company={Companies.None} floorNumber={0} />).toJSON();
    expect(tree).toMatchSnapshot();
});
