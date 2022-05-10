import { ToastContainer } from "@jamsch/react-native-toastify";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Linking, Platform } from "react-native";
import { Provider } from "react-native-paper";
import renderer, { act } from "react-test-renderer";
import { OpenURLButton } from "../src/login/components/OpenUrlButton";
import '@testing-library/jest-dom'
import * as WebBrowser from 'expo-web-browser';

beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

test("renders correctly", () => {
    const tree = renderer.create(<OpenURLButton url={""} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test unsupported button press", async () => {
    const screen = render(<Provider><ToastContainer /><OpenURLButton url="slack:/open?team=123456" /></Provider>);

    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    linkingSpy.mockImplementation(() => Promise.resolve(false));

    act(() => {
        fireEvent.press(screen.getByText("Login"));
    });

    waitFor(() =>{
        expect(screen.getByText(`Do not know how to open this URL: slack:/open?team=123456`)).toBeInTheDocument()
    }, {
        interval: 2000,
        timeout: 60000
      }
    );
});

test("Test web button press", async () => {
    Platform.OS = "web"

    const screen = render(<OpenURLButton url="https://google.be" />);

    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    linkingSpy.mockImplementation(() => Promise.resolve(true));

    Linking.openURL = jest.fn()

    fireEvent.press(screen.getByText("Login"));

    await waitFor(() => {
        expect(Linking.openURL).toBeCalled();
    })
});

test("Test Android button press", async () => {
    Platform.OS = "android"

    const screen = render(<OpenURLButton url="https://google.be" />);

    const linkingSpy = jest.spyOn(Linking, 'canOpenURL');
    linkingSpy.mockImplementation(() => Promise.resolve(true));

    const webBrowserSpy = jest.spyOn(WebBrowser, 'openBrowserAsync');

    fireEvent.press(screen.getByText("Login"));

    await waitFor(() => {
        expect(webBrowserSpy).toBeCalled();
    })
}); 