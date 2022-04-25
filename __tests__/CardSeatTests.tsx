import CardSeat from "../src/seats/components/CardSeat";
import React from "react";
import renderer from "react-test-renderer";

test("renders the cardseat correctly", () => {
    const tree = renderer.create(<CardSeat seat={{ id: 1, name: "1A" }} />).toJSON();
    expect(tree).toMatchSnapshot();
});