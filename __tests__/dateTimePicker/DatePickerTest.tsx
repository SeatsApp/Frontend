import React from "react";
import renderer from "react-test-renderer";
import DatePicker from "../../src/dateTimePicker/components/DatePicker";
import {fireEvent, render} from "@testing-library/react-native";

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

test("renders the datepicker correctly", () => {
    const tree = renderer.create(<DatePicker  date={new Date()} updateState={() => null} refetchBuilding={() => null}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test useState updated on button click.", () => {
    const mockSetState = jest.spyOn(React, "useState");

    const { getByText } = render(<DatePicker  date={new Date()} updateState={() => null} refetchBuilding={() => null}/>);

    fireEvent.press(getByText(new Date().toLocaleDateString()));

    expect(mockSetState).toHaveBeenCalledTimes(4);
});