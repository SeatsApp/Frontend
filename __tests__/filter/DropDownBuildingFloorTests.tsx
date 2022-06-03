import React from "react";
import DropDownBuildingFloorList from "../../src/seats/components/DropDownBuildingFloorList";
import { AxiosPromise } from "axios";
import { mocked } from "ts-jest/utils";
import AxiosClient from "../../src/utils/AxiosClient";
import { render } from "@testing-library/react-native";


beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});

jest.mock("../../src/utils/AxiosClient");

test("renders the drop down correctly", () => {
    const json = {
        data: [{
            id: 1,
            name: "Building 1",
            floors: [{
                id: 1,
                name: "Floor 1",
                seats: [],
                points: []
            }]
        }]
    }

    mocked(AxiosClient).mockResolvedValue(json as unknown as AxiosPromise<void>);

    const tree = render(<DropDownBuildingFloorList selectedBuilding={{
        buildingId: 1,
        buildingName: "",
        floorId: 1,
        floorName: "",
        floorPoints: [],
        seats: []
    }}
        refetchBuilding={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the drop down correctly with use effect", () => {
    const json = [{
        id: 1,
        name: "Building 1",
        floors: [{
            id: 1,
            name: "Floor 1",
            seats: [],
            points: []
        }]
    }]

    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [json, jest.fn()])
        .mockImplementationOnce(() => [false, jest.fn()])

    const tree = render(<DropDownBuildingFloorList selectedBuilding={{
        buildingId: 1,
        buildingName: "",
        floorId: 1,
        floorName: "",
        floorPoints: [],
        seats: []
    }}
        refetchBuilding={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

