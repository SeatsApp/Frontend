import React from "react";
import renderer, { act } from "react-test-renderer";
import { SeatStatus } from "../../src/seats/types/SeatStatus";
import { fireEvent, render } from "@testing-library/react-native";
import { Seat } from "../../src/seats/types/Seat";
import BuildingFloorPlan from "../../src/svg/components/BuildingFloorPlan";

jest.mock('@react-navigation/native');

test("renders the floorplan from Xplore Group of floor 1 correctly", () => {
    const mockUpdateDialog = jest.fn();

    const tree = renderer.create(<BuildingFloorPlan seats={[{
        id: 1, name: "A1",
        seatStatus: SeatStatus.AVAILABLE, reservations: [],
        xcoordinates: 0, ycoordinates: 0,
        width: 0, height: 0
    }]}
        updateDialog={function (seat: Seat, visible: boolean): void {
            mockUpdateDialog(seat, visible);
        }}
        floorPoints={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the floorplan from Xplore Group of a not existing floor 5", () => {
    const mockUpdateDialog = jest.fn();

    const tree = renderer.create(<BuildingFloorPlan seats={[]}
        updateDialog={function (seat: Seat, visible: boolean): void {
            mockUpdateDialog(seat, visible);
        }} floorPoints={[{ firstPoint: 50, secondPoint: 50 }]} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("handleReserve updateState correctly", async () => {
    const mockedSetState = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockedSetState])
        .mockImplementationOnce(() => [undefined, mockedSetState])

    const mockUpdateDialog = jest.fn();

    const { container } = render(<BuildingFloorPlan seats={[{
        id: 1, name: "A1", reservations: [],
        seatStatus: SeatStatus.AVAILABLE,
        xcoordinates: 0, ycoordinates: 0,
        width: 0, height: 0
    }]}
        updateDialog={function (seat: Seat, visible: boolean): void {
            mockUpdateDialog(seat, visible);
        }} floorPoints={[]} />);

    const element = container.findByProps({ name: "A1" })
    act(() => {
        fireEvent.press(element);
    });

    expect(mockUpdateDialog).toHaveBeenCalledTimes(1);
});
