import React from "react";
import renderer from "react-test-renderer";
import DateTimePicker from "../src/dateTimePicker/components/DateTimePicker";

test("renders the datepicker correctly", () => {
    const tree = renderer.create(<DateTimePicker  date={new Date()} endTime={""} setDate={() => true}
                                                  setEndTime={() => true} setStartTime={() => true} startTime={""}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
