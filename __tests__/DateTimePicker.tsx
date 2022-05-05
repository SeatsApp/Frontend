import React from "react";
import renderer from "react-test-renderer";
import TimePicker from "../src/dateTimePicker/components/TimePicker";

test("renders the datepicker correctly", () => {
    const tree = renderer.create(<TimePicker endTime={""}
                                             setEndTime={() => true} setStartTime={() => true} startTime={""}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
