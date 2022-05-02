import React from "react";
import AxiosClient from "../src/utils/AxiosClient";
import { AxiosPromise } from 'axios'
import renderer from "react-test-renderer";
import { mocked } from "ts-jest/utils"; // a helper function from ts-jest
import useSeat from "../src/shared/hooks/useSeat";
import CreateSeat from "../src/createSeats/components/CreateSeat"
import {fireEvent, render} from "@testing-library/react-native";

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => { });
});

test("renders correctly", () => {
  const tree = renderer.create(<CreateSeat />).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock("../src/utils/AxiosClient");
const { createSeat } = useSeat();

test("should call api with correct parameters", async () => {
  // mock to resolve a Promise<void>
  mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

  await createSeat("test");

  expect(AxiosClient).toHaveBeenCalledWith({
    url: '/api/seat', method: 'post',
    data: JSON.stringify({ name: "test" }), headers: {
      'Content-Type': 'application/json'
    }
  });
});

test("Create api call on button press", () => {
  // mock to resolve a Promise<void>
  mocked(AxiosClient).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

  const { getByText } = render(<CreateSeat />);

  fireEvent.press(getByText('Submit'));

  expect(AxiosClient).toHaveBeenCalledWith({
    url: '/api/seat', method: 'post',
    data: JSON.stringify({ name: "test" }), headers: {
      'Content-Type': 'application/json'
    }
  });
});