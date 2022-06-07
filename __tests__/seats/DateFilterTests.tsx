import {fireEvent, render} from "@testing-library/react-native";
import React from "react";
import DateFilterButtons from "../../src/seats/components/DateFilterButtons";
import {act} from "react-test-renderer";

test("renders the buttons correctly", () => {
    const setState = jest.fn()
    const { getByText } = render(<DateFilterButtons setDate={jest.fn()} date={new Date()} setFilterVisible={setState} refetchBuilding={jest.fn()} selectedBuilding={{
        buildingId: 1,
        buildingName: 'hey',
        floorId: 2,
        floorPoints: [],
        floorName: 'test',
        seats: []
    }} />)
    act(() => {
        fireEvent.press(getByText('filter'))
    })

    expect(setState).toHaveBeenCalledTimes(1)
    expect(setState).toHaveBeenCalledWith(true)
});