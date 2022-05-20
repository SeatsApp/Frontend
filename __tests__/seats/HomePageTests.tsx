import { AxiosPromise } from "axios";
import React from "react";
import renderer from "react-test-renderer";
import { mocked } from "ts-jest/utils";
import HomePage from "../../src/seats/components/HomePage";
import useSeat from "../../src/shared/hooks/useSeat";
import AxiosClient from "../../src/utils/AxiosClient";
import { act, renderHook } from '@testing-library/react-hooks'
import { Seat } from "../../src/seats/types/Seat";
import { SeatStatus } from "../../src/seats/types/SeatStatus";

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });
  
jest.mock('@react-navigation/native');

test("renders the homepage correctly", () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock("../../src/utils/AxiosClient");
const { readSeats } = useSeat();

test("should call get api to retrieve seats", async () => {
    // Arrange
    const jsonSeats = {
        data: [
            {
                id: 1,
                name: '1A',
                seatStatus: SeatStatus.AVAILABLE,
                reservations: []
            },
            {
                id: 2,
                name: '2B',
                seatStatus: SeatStatus.AVAILABLE,
                reservations: []
            }
        ],
    }
    const stringSeats = JSON.stringify(jsonSeats.data);
    const seats: Seat[] = JSON.parse(stringSeats)

    mocked(AxiosClient).mockResolvedValue(Promise.resolve(jsonSeats) as unknown as AxiosPromise<void>);

    // Act
    const { result, waitForValueToChange } = renderHook(() => readSeats());

    await waitForValueToChange(() => result.current.seats, { timeout: 60000 });

    // Assert
    expect(result.current.seats).toStrictEqual(seats);
});

test("should call get api to refetch seats", async () => {
    // Arrange
    const jsonSeats = {
        data: [
            {
                id: 1,
                name: '1A',
                seatStatus: SeatStatus.PARTIALLY_BOOKED,
                reservations: []
            },
            {
                id: 2,
                name: '2B',
                seatStatus: SeatStatus.FULLY_BOOKED,
                reservations: []
            }
        ],
    }
    const stringSeats = JSON.stringify(jsonSeats.data);
    const seats: Seat[] = JSON.parse(stringSeats)

    const jsonSeatsRefetch = {
        data: [
            {
                id: 1,
                name: '1A',
                reservations: []
            }
        ],
    }
    const stringSeatsRefetch = JSON.stringify(jsonSeatsRefetch.data);
    const seatsRefetch: Seat[] = JSON.parse(stringSeatsRefetch)

    mocked(AxiosClient).mockResolvedValueOnce(Promise.resolve(jsonSeats) as unknown as AxiosPromise<void>)
        .mockResolvedValueOnce(Promise.resolve(jsonSeatsRefetch) as unknown as AxiosPromise<void>)

    // Act
    const { result, waitForValueToChange } = renderHook(() => readSeats());
    await act(async () => {
        await waitForValueToChange(() => result.current.seats);
    })
    expect(result.current.seats).toStrictEqual(seats);


    await act(async () => {
        await result.current.refetchSeats()
    })
    // Assert
    expect(result.current.seats).toStrictEqual(seatsRefetch);
});