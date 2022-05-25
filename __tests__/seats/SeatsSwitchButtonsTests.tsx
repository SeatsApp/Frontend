import React from "react"
import { fireEvent, render } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import SeatsSwitchButtons from "../../src/seats/components/SeatsSwitchButtons";

test("show floorplan by pressing the button", () => {
    const mockSetUseState = jest.fn().mockImplementation();

    const { getByText } = render(<SeatsSwitchButtons setShowSeatsList={function (boolean: boolean): void {
        mockSetUseState(boolean)
    }} />);

    act(() => {
        fireEvent.press(getByText("Floorplan"));
    });

    expect(mockSetUseState).toHaveBeenCalledWith(false);
    expect(mockSetUseState).toHaveBeenCalledTimes(1);
});

test("show seats list by pressing the button", () => {
    const mockSetUseState = jest.fn().mockImplementation();

    const { getByText } = render(<SeatsSwitchButtons setShowSeatsList={function (boolean: boolean): void {
        mockSetUseState(boolean)
    }} />);

    act(() => {
        fireEvent.press(getByText("Seats list"));
    });

    expect(mockSetUseState).toHaveBeenCalledWith(true);
    expect(mockSetUseState).toHaveBeenCalledTimes(1);
});