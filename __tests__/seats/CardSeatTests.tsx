import CardSeat from "../../src/seats/components/CardSeat";
import React from "react";
import renderer from "react-test-renderer";
import useSeat from "../../src/shared/hooks/useSeat";
import { mocked } from "ts-jest/utils";
import AxiosClient from "../../src/utils/AxiosClient";
import { AxiosPromise } from "axios";
import Enzyme, { shallow } from "enzyme";
import { Button } from "react-native-paper";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { SeatStatus } from "../../src/seats/types/SeatStatus";
import { Seat } from "../../src/seats/types/Seat";

Enzyme.configure({ adapter: new Adapter() });


test("renders the cardseat correctly", () => {
    const mockUpdateDialog = jest.fn();

    const tree = renderer.create(<CardSeat seat={{
        id: 1, name: "1A",
        seatStatus: SeatStatus.AVAILABLE, reservations: [],
        xcoordinates: 0, ycoordinates: 0,
        width: 0, height: 0
    }} updateDialog={function (seat: Seat, visible: boolean): void {
        mockUpdateDialog(seat, visible)
    }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the cardseat correctly with reservation", () => {
    const mockUpdateDialog = jest.fn();

    const tree = renderer.create(<CardSeat seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE,
        reservations: [{ id: 1, startDateTime: "2022-04-22 15:00:00", endDateTime: "2022-04-22 16:00:00", checkedIn: false }],
        xcoordinates: 0, ycoordinates: 0,
        width: 0, height: 0
    }} updateDialog={function (seat: Seat, visible: boolean): void {
        mockUpdateDialog(seat, visible)
    }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock("../../src/utils/AxiosClient");
const { reserveSeat } = useSeat();
const startTime = "2022-02-22 14:00:00";
const endtime = "2022-02-22 15:00:00";

test("Reserve should call api with correct parameters", async () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    await reserveSeat(1, startTime, endtime);

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/' + 1 + '/reserve', method: 'patch',
        data: JSON.stringify({ startDateTime: startTime, endDateTime: endtime }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});

test("changeState on button press", async () => {
    const mockUpdateDialog = jest.fn();

    const wrapper = shallow(<CardSeat seat={{
        id: 1, name: "1A",
        seatStatus: SeatStatus.AVAILABLE, reservations: [],
        xcoordinates: 0, ycoordinates: 0,
        width: 0, height: 0
    }} updateDialog={function (seat: Seat, visible: boolean): void {
        mockUpdateDialog(seat, visible)
    }} />);

    wrapper.find(Button).at(0).simulate('press');

    expect(mockUpdateDialog).toHaveBeenCalledTimes(1);
});
