import React from "react";
import renderer, {act} from "react-test-renderer";
import {SeatStatus} from "../../src/seats/types/SeatStatus";
import BuildingFloorPlan from "../../src/svg/buildings/BuildingFloorPlan";
import {Companies} from "../../src/svg/buildings/Companies";
import {fireEvent, render} from "@testing-library/react-native";
import XploreGroupFloor1 from "../../src/svg/buildings/Xplore Group/XploreGroupFloor1";

jest.mock('@react-navigation/native');

test("renders the floorplan from Xplore Group of floor 1 correctly", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[{
        id: 1, name: "A1",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }]} company={Companies.Xplore_Group} floorNumber={1}  date={new Date()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the floorplan from Xplore Group of a not existing floor 5", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[]} company={Companies.Xplore_Group} floorNumber={5}  date={new Date()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the floorplan from Xplore Group of a not existing floor 5", () => {
    const tree = renderer.create(<BuildingFloorPlan seats={[]} company={Companies.None} floorNumber={0}  date={new Date()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("handleReserve updateState correctly", async () => {
    const mockedSetState = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockedSetState])
        .mockImplementationOnce(() => [undefined, mockedSetState])

    const { container } = render(<XploreGroupFloor1 seats={[{id: 1, name: "A1", reservations: [], seatStatus: SeatStatus.AVAILABLE}]} date={new Date()}/>);

    const element = container.findByProps({name: "A1"})
    act(() => {
        fireEvent.press(element);
    });

    expect(mockedSetState).toHaveBeenCalledTimes(2);
    expect(mockedSetState).toHaveBeenCalledWith({id: 1, name: "A1", reservations: [], seatStatus: SeatStatus.AVAILABLE});
    expect(mockedSetState).toHaveBeenCalledWith(true);
});
