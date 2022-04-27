import CardSeat from "../src/seats/components/CardSeat";
import React from "react";
import renderer from "react-test-renderer";
import useSeat from "../src/shared/hooks/useSeat";
import {mocked} from "ts-jest/utils";
import AxiosClient from "../src/utils/AxiosClient";
import {AxiosPromise} from "axios";
import {fireEvent, render} from "@testing-library/react-native";

test("renders the cardseat correctly", () => {
    const tree = renderer.create(<CardSeat seat={{ id: 1, name: "1A" }} />).toJSON();
    expect(tree).toMatchSnapshot();
});

jest.mock("../src/utils/AxiosClient");
const { deleteSeat } = useSeat()

test("should call api with correct parameters", async () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    await deleteSeat(1);

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/' + 1, method: 'delete'
    });
});

test("Test api call on button press", () => {
    // mock to resolve a Promise<void>
    mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

    const { getByText } = render(<CardSeat seat={{id: 1, name: "Test"}} />);

    fireEvent.press(getByText('Delete'));

    expect(AxiosClient).toHaveBeenCalledWith({
        url: '/api/seats/' + 1, method: 'delete'
    });
});