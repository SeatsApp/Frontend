import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import FilterDialog from "../../src/seats/components/FilterDialog";
import { act } from "react-test-renderer";


beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});


test("renders the filter page correctly for all options", () => {
    const tree = render(<FilterDialog setStartTime={jest.fn()} setEndTime={jest.fn()} startTime={'00:00'}
        endTime={'24:00'} visible={true} setVisible={jest.fn()} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();

    const tree2 = render(<FilterDialog setStartTime={jest.fn()} setEndTime={jest.fn()} startTime={'12:00'}
        endTime={'24:00'} visible={true} setVisible={jest.fn()} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />).toJSON();
    expect(tree2).toMatchSnapshot();

    const tree3 = render(<FilterDialog setStartTime={jest.fn()} setEndTime={jest.fn()} startTime={'00:00'}
        endTime={'12:00'} visible={true} setVisible={jest.fn()} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />).toJSON();
    expect(tree3).toMatchSnapshot();
});

test("handle shortcut buttons correct", () => {
    const mockedSetState = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["00:00", mockedSetState])
        .mockImplementationOnce(() => ["24:00", mockedSetState]);

    const { getByText } = render(<FilterDialog setStartTime={jest.fn()} setEndTime={jest.fn()} startTime={'00:00'}
        endTime={'24:00'} visible={true}
        setVisible={jest.fn()} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />);

    act(() => {
        fireEvent.press(getByText("Forenoon"));
    });

    expect(mockedSetState).toHaveBeenCalledWith("00:00");
    expect(mockedSetState).toHaveBeenCalledWith("12:00");

    act(() => {
        fireEvent.press(getByText("Afternoon"));
    });

    expect(mockedSetState).toHaveBeenCalledWith("12:00");
    expect(mockedSetState).toHaveBeenCalledWith("24:00");

    act(() => {
        fireEvent.press(getByText("Whole Day"));
    });

    expect(mockedSetState).toHaveBeenCalledWith("00:00");
    expect(mockedSetState).toHaveBeenCalledWith("24:00");
});

test("handle filter button correct", () => {
    const mockedSetState = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["10:00", () => null])
        .mockImplementationOnce(() => ["22:00", () => null]);

    const { getByText } = render(<FilterDialog setStartTime={mockedSetState} setEndTime={mockedSetState} startTime={'00:00'}
        endTime={'24:00'} visible={true}
        setVisible={mockedSetState} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />);

    act(() => {
        fireEvent.press(getByText("Filter"));
    });

    expect(mockedSetState).toHaveBeenCalledTimes(3);
    expect(mockedSetState).toHaveBeenCalledWith("10:00")
    expect(mockedSetState).toHaveBeenCalledWith("22:00")
    expect(mockedSetState).toHaveBeenCalledWith(false)
});

test("handle close button correct", () => {
    const mockedSetState = jest.fn();

    const { getByTestId } = render(<FilterDialog setStartTime={jest.fn()} setEndTime={jest.fn()} startTime={'00:00'}
        endTime={'24:00'} visible={true}
        setVisible={mockedSetState} selectedBuilding={{
            buildingId: 0,
            buildingName: "",
            floorId: 0,
            floorName: "",
            floorPoints: [],
            seats: []
        }}
        refetchBuilding={jest.fn()} />);
    act(() => {
        fireEvent.press(getByTestId("iconButton"));
    });

    expect(mockedSetState).toHaveBeenCalledWith(false);
});


