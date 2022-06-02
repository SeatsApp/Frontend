import {AxiosPromise} from "axios";
import React from "react";
import {mocked} from "ts-jest/utils";
import HomePage from "../../src/seats/components/HomePage";
import useSeat from "../../src/shared/hooks/useSeat";
import AxiosClient from "../../src/utils/AxiosClient";
import {Seat} from "../../src/seats/types/Seat";
import {SeatStatus} from "../../src/seats/types/SeatStatus";
import {render} from "@testing-library/react-native";
import {Provider} from "react-native-paper";


beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            setOptions: mockedNavigate,
        }),
    };
});

jest.mock("../../src/utils/AxiosClient");
const {readSeats} = useSeat();

test("renders the homepage correctly", () => {
    const jsonBuilding = {
        data: {
            buildingId: 1,
            buildingName: '1A',
            floorId: 1,
            floorName: 'test',
            floorPoints: [
                {
                    firstPoint: 5,
                    secondPoint: 5
                }
            ],
            seats: [{
                id: 1,
                name: '1A',
                seatStatus: SeatStatus.AVAILABLE,
                reservations: []
            }]
        }
    }

    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(jsonBuilding as unknown as AxiosPromise<void>);

    const tree = render(<Provider><HomePage/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
});

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

    const {seats: foundSeats} = readSeats();

    expect(foundSeats).toBe(seats)
});
