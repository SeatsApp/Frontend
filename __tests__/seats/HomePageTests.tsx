import { AxiosPromise } from "axios";
import React from "react";
import renderer from "react-test-renderer";
import { mocked } from "ts-jest/utils";
import HomePage from "../../src/seats/components/HomePage";
import useSeat from "../../src/shared/hooks/useSeat";
import AxiosClient from "../../src/utils/AxiosClient";
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

test("should call api with correct parameters", async () => {
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

    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve(jsonSeats) as unknown as AxiosPromise<void>);

    jest.spyOn(React, 'useState')
        .mockImplementation(() => [seats, () => null])

    jest.spyOn(React, 'useCallback')
        .mockImplementation()

    jest.spyOn(React, 'useEffect')
        .mockImplementation()

    const { seats: foundSeats } = readSeats();

    expect(foundSeats).toBe(seats)
});
