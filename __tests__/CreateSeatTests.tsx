import React from "react";
import AxiosClient from "../src/utils/AxiosClient";
import { AxiosPromise } from 'axios'
import renderer from "react-test-renderer";
import { mocked } from "ts-jest/utils"; // a helper function from ts-jest
import useSeat from "../src/seats/hooks/useSeat";
import CreateSeat from "../src/seats/components/CreateSeat";

test("renders correctly", () => {
  const tree = renderer.create(<CreateSeat />).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock("../src/utils/AxiosClient");
const { createSeat } = useSeat()

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