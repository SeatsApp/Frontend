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

Enzyme.configure({ adapter: new Adapter() });


test("renders the cardseat correctly", () => {
    const tree = renderer.create(<CardSeat seat={{
        id: 1, name: "1A",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} date={new Date()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("renders the cardseat correctly with reservation", () => {
    const tree = renderer.create(<CardSeat seat={{
        id: 1, name: "test",
        seatStatus: SeatStatus.AVAILABLE,
        reservations: [{ id: 1, startDateTime: "2022-04-22 15:00:00", endDateTime: "2022-04-22 16:00:00", checkedIn: false }]
    }} date={new Date()} />).toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock("../../src/utils/AxiosClient");
const { deleteSeat, reserveSeat } = useSeat();
const startTime = "2022-02-22 14:00:00";
const endtime = "2022-02-22 15:00:00";


test("Delete should call api with correct parameters", async () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    await deleteSeat(1);

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/' + 1, method: 'delete'
    });
});

test("Delete api call on button press", () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    const wrapper = shallow(<CardSeat seat={{
        id: 1, name: "1A",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} date={new Date()} />);

    wrapper.find(Button).at(1).simulate('press');

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/' + 1, method: 'delete'
    });
});

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
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(() => [false, setState])

    const wrapper = shallow(<CardSeat seat={{
        id: 1, name: "1A",
        seatStatus: SeatStatus.AVAILABLE, reservations: []
    }} date={new Date()} />);

    wrapper.find(Button).at(0).simulate('press');

    expect(setState).toHaveBeenCalledTimes(1);
});
