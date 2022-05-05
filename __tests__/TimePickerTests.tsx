import React from "react";
import renderer from "react-test-renderer";
import TimePicker from "../src/dateTimePicker/components/TimePickerDropDown";
import {render} from "@testing-library/react-native";

test("renders the datepicker correctly", () => {
    const tree = renderer.create(<TimePicker updateState={() => true} time={""} timeName={""}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Update useState on render", () => {
    const mockSetState = jest.spyOn(React, "useState");

    render(<TimePicker time={""} timeName={""} updateState={() => true}/>);

    expect(mockSetState).toHaveBeenCalledTimes(1);
});