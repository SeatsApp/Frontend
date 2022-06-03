import React from "react";
import renderer, { act } from "react-test-renderer";
import { mocked } from "ts-jest/utils";
import AxiosClient from "../../src/utils/AxiosClient";
import { AxiosPromise } from "axios";
import ReservationCard from "../../src/reservations/components/ReservationCard";
import useCancelReservation from "../../src/reservations/hooks/useCancelReservation";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("../../src/utils/AxiosClient");

test("renders the reservationCard correctly", () => {
    const tree = renderer.create(<ReservationCard userReservation={{
        id: 1,
        seatName: "Test",
        startDateTime: "2022-5-20 5:00:00",
        endDateTime: "2022-5-21 0:00:00",
        checkedIn: true
    }} refetchMyReservations={function (): void {
        throw new Error("Function not implemented.");
    }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the reservationCard correctly after midday", () => {
    const tree = renderer.create(<ReservationCard userReservation={{
        id: 1,
        seatName: "Test",
        startDateTime: "2022-5-20 15:00:00",
        endDateTime: "2022-5-20 16:00:00",
        checkedIn: true
    }} refetchMyReservations={function (): void {
        throw new Error("Function not implemented.");
    }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("patch should call api cancel reservation with correct parameters", async () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    await useCancelReservation(1);

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/reservations/' + 1 + '/cancel', method: 'patch'
    });
});

test("cancel reservation succesfull test", async () => {
    const json = {
        data: 1
    }

    mocked(AxiosClient).mockResolvedValue(Promise.resolve(json) as unknown as AxiosPromise<void>);

    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["15:00", () => null])
        .mockImplementationOnce(() => ["16:00", () => null])

    const { getByTestId } = render(<ReservationCard userReservation={{
        id: 1,
        seatName: "Test",
        startDateTime: "2200-5-20 15:00:00",
        endDateTime: "2200-5-20 16:00:00",
        checkedIn: true
    }} refetchMyReservations={jest.fn()} />);

    act(() => {
        fireEvent.press(getByTestId("CancelReservation"));
    });

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/reservations/1/cancel', method: 'patch'
    });
});
