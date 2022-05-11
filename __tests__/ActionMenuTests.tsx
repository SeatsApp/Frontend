import React from "react";
import renderer from "react-test-renderer";
import ActionMenu from "../src/seats/components/ActionMenu";

jest.mock('@react-navigation/native');

test("renders correctly", () => {
    const tree = renderer.create(<ActionMenu />).toJSON();
    expect(tree).toMatchSnapshot();
});


