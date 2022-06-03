import React from "react";
import renderer from "react-test-renderer";
import { mocked } from "ts-jest/utils";
import AxiosClient from "../../src/utils/AxiosClient";
import { AxiosPromise } from "axios";
import MyReservations, {sortReservations} from "../../src/reservations/components/MyReservations";

jest.mock("../../src/utils/AxiosClient");

test("renders the myReservations correctly", () => {
    const jsonSeats = {
        data: [
            {
                id: 1,
                seatName: '1A',
                startDateTime: "2022-05-20 0:00:00",
                endDateTime: "2022-05-20 5:00:00",
                checkedIn: true
            },
            {
                id: 2,
                seatName: '1A',
                startDateTime: "2022-05-20 15:00:00",
                endDateTime: "2022-05-20 16:00:00",
                checkedIn: false
            }
        ],
    }

    mocked(AxiosClient).mockResolvedValue(Promise.resolve(jsonSeats) as unknown as AxiosPromise<void>);

    const tree = renderer.create(<MyReservations />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("sortfuntion sorts right", () => {
    const array = [
            {
                id: 1,
                seatName: '1A',
                startDateTime: "2022-05-20 0:00:00",
                endDateTime: "2022-05-20 5:00:00",
                checkedIn: true
            },
            {
                id: 2,
                seatName: '2A',
                startDateTime: "2022-05-21 15:00:00",
                endDateTime: "2022-05-21 16:00:00",
                checkedIn: false
            }
        ]

    const sortedArray = array.sort(sortReservations)

    expect(sortedArray[0].id).toEqual(2);
});