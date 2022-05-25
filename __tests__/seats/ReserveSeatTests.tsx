import React from "react";
import renderer, { act } from "react-test-renderer";
import ReserveSeatDialog from "../../src/seats/components/ReserveSeatDialog";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mocked } from "ts-jest/utils"; // a helper function from ts-jest
import AxiosClient from "../../src/utils/AxiosClient";
import { AxiosPromise } from "axios";
import { toast } from "@jamsch/react-native-toastify";
import { fireEvent, render } from "@testing-library/react-native";
import { SeatStatus } from "../../src/seats/types/SeatStatus";
import * as SecureStore from 'expo-secure-store';

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'debug').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../src/utils/AxiosClient");

test("renders correctly", () => {
    const tree = renderer.create(<ReserveSeatDialog seat={{
        id: 1, name: "test", seatStatus: SeatStatus.AVAILABLE,
        reservations: [{ id: 1, startDateTime: "2022-04-22 15:00:00", endDateTime: "2022-04-22 16:00:00", checkedIn: false }]
    }}
        setDialogVisible={() => true}
        visible={true} date={new Date()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("handleReserve succesfull test", async () => {
    jest.spyOn(SecureStore, 'setItemAsync').mockImplementation();

    const json = {
        data: 1
    }

    mocked(AxiosClient).mockResolvedValue(Promise.resolve(json) as unknown as AxiosPromise<void>);

    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["15:00", () => null])
        .mockImplementationOnce(() => ["16:00", () => null])

    const { getByTestId } = render(<ReserveSeatDialog seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} setDialogVisible={() => true}
        visible={true} date={new Date(2024, 11, 24, 10, 5, 6)} />);

    act(() => {
        fireEvent.press(getByTestId("ReserveButton"));
    });


    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/1/reserve', method: 'patch',
        data: JSON.stringify({ startDateTime: "2024-12-24 15:00:00", endDateTime: "2024-12-24 16:00:00" }), headers: {
            'Content-Type': 'application/json'
        }
    });
});

test("handleReserve with failure", async () => {
    const alertMock = jest.spyOn(toast, 'error').mockImplementation();

    const { getByTestId } = render(<ReserveSeatDialog seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} setDialogVisible={() => true}
        visible={true} date={new Date()} />);

    act(() => {
        fireEvent.press(getByTestId("ReserveButton"));
    });

    expect(alertMock).toHaveBeenCalledTimes(1);
});

test("cancel dialog on button click", async () => {
    const mockSetState = jest.fn();

    const { getByTestId } = render(<ReserveSeatDialog seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} setDialogVisible={mockSetState}
        visible={true} date={new Date()} />);

    act(() => {
        fireEvent.press(getByTestId("CancelButton"));
    });

    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(false);
});

test("handle shortcut buttons correct", () => {
    const mockedSetState = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["", mockedSetState])
        .mockImplementationOnce(() => ["", mockedSetState]);

    const { getByText } = render(<ReserveSeatDialog seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} setDialogVisible={() => true} visible={true} date={new Date(2024, 11, 24, 10, 5, 6)} />);

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