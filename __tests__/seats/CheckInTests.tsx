import React from "react";
import renderer, {act} from "react-test-renderer";
import CheckIn from "../../src/seats/components/CheckIn";
import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {mocked} from "ts-jest/utils";
import AxiosClient from "../../src/utils/AxiosClient";
import {AxiosPromise} from "axios";
import useSeat from "../../src/shared/hooks/useSeat";
import { BarCodeScanner, PermissionResponse } from "expo-barcode-scanner";

jest.spyOn(BarCodeScanner, 'requestPermissionsAsync').mockImplementation(() => Promise.resolve({status : 'granted'} as PermissionResponse));

test("renders correctly", () => {
    const tree = renderer.create(<CheckIn />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Right text when permission null", () => {
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [null, () => null])

    const {getByText} = render(<CheckIn/>);

    waitFor(() => {
            expect(getByText(`Requesting for camera permission`)).toBeInTheDocument()
        }, {
            interval: 2000,
            timeout: 60000
        }
    );
});

test("Right text when permission false", () => {
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, () => null])

    const {getByText} = render(<CheckIn/>);

    waitFor(() => {
            expect(getByText(`No access to camera`)).toBeInTheDocument()
        }, {
            interval: 2000,
            timeout: 60000
        }
    );
});

test("Right content when permission true", () => {
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, () => null])

    const { getByTestId } = render(<CheckIn/>);

    waitFor(() => {
            expect(getByTestId(`CheckInView`)).toBeInTheDocument()
        }, {
            interval: 2000,
            timeout: 60000
        }
    );
});

test("right change usestate when button click", () => {
    const mockSetUseState = jest.fn();

    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => [true, () => null])
        .mockImplementationOnce(() => [true, mockSetUseState])

    const { getByText } = render(<CheckIn/>);

    act(() => {
        fireEvent.press(getByText("Tap to Scan Again"));
    });

    expect(mockSetUseState).toHaveBeenCalledWith(false);
    expect(mockSetUseState).toHaveBeenCalledTimes(1);
});

jest.mock("../../src/utils/AxiosClient");
const { checkInSeat } = useSeat();

test("should call api with correct parameters", async () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    await checkInSeat(1);

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/1/checkIn', method: 'patch', headers: {
            'Content-Type': 'application/json'
        }
    });
});


