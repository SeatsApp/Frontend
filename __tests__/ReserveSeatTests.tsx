import React from "react";
import renderer, {act} from "react-test-renderer";
import ReserveSeatDialog from "../src/seats/components/ReserveSeatDialog";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {mocked} from "ts-jest/utils"; // a helper function from ts-jest
import AxiosClient from "../src/utils/AxiosClient";
import {AxiosPromise} from "axios";
import {toast} from "@jamsch/react-native-toastify";
import {fireEvent, render} from "@testing-library/react-native";

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
});

Enzyme.configure({adapter: new Adapter()});

jest.mock("../src/utils/AxiosClient");

test("renders correctly", () => {
    const tree = renderer.create(<ReserveSeatDialog seat={{id: 1, name: "test", reservations: [{id: 1, startTime: "2022-04-22 15:00:00", endTime: "2022-04-22 16:00:00"}]}} setDialogVisible={() => true}
                                                    visible={true} date={new Date()}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("handleReserve succesfull test", async () => {
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    jest.spyOn(React, 'useState')
        .mockImplementationOnce(() => ["15:00", () => null])
        .mockImplementationOnce(() => ["16:00", () => null])

    const { getByText } = render(<ReserveSeatDialog seat={{id: 1, name: "test", reservations: []}} setDialogVisible={() => true}
                                               visible={true} date={new Date(2024,11,24, 10,5,6)}/>);

    act(() => {
        fireEvent.press(getByText("Reserve"));
    });

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/1/reserve', method: 'patch',
        data: JSON.stringify({startTime: "2024-12-24 15:00:00", endTime: "2024-12-24 16:00:00"}), headers: {
            'Content-Type': 'application/json'
        }
    });
});

test("handleReserve with failure", async () => {
    const alertMock = jest.spyOn(toast,'error').mockImplementation();

    const {getByText} = render(<ReserveSeatDialog seat={{id: 1, name: "test", reservations: []}} setDialogVisible={() => true}
                                               visible={true} date={new Date()}/>);

    act(() => {
        fireEvent.press(getByText("Reserve"));
    });

    expect(alertMock).toHaveBeenCalledTimes(1);
});

