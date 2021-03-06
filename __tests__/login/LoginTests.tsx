import React from "react";
import { LoginContainer } from "../../src/login/components/LoginContainer";
import renderer from "react-test-renderer";
import { Linking, Platform, Text } from "react-native";
import useLogin from "../../src/login/hooks/useLogin";
import AxiosClient from "../../src/utils/AxiosClient";
import { render as renderDom } from "react-dom";
import 'jest-localstorage-mock';
import { act } from "@testing-library/react-native";
import { mocked } from "ts-jest/utils";
import { AxiosPromise } from "axios";

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();
});

jest.mock("../../src/utils/AxiosClient");

test("renders not logged in correctly", () => {
  mocked(AxiosClient.get).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);
  const tree = renderer.create(<LoginContainer>
    <Text>Test</Text>
  </LoginContainer>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders logged in correctly", () => {
  mocked(AxiosClient.get).mockResolvedValue(Promise.resolve() as unknown as AxiosPromise<void>);

  const setState = jest.fn();
  jest.spyOn(React, 'useState')
    .mockImplementationOnce(() => [true, setState])
    .mockImplementationOnce(() => [false, setState])

  const tree = renderer.create(<LoginContainer>
    <Text>Test</Text>
  </LoginContainer>).toJSON();
  expect(tree).toMatchSnapshot();
});

test("should call api with correct parameters", async () => {
  const setState = jest.fn();
  jest.spyOn(React, 'useState')
    .mockImplementationOnce(() => [true, setState])
    .mockImplementationOnce(() => [false, setState])

  const mockAxios = jest.spyOn(AxiosClient, 'get')
  mockAxios.mockImplementation(() => Promise.resolve({
    status: 200
  }));

  const { checkLoggedIn } = useLogin();

  await checkLoggedIn();

  expect(setState).toBeCalledWith(true);
});


test("should call api with wrong parameters", async () => {
  const setState = jest.fn();
  jest.spyOn(React, 'useState')
    .mockImplementationOnce(() => [true, setState])
    .mockImplementationOnce(() => [false, setState])

  const mockAxios = jest.spyOn(AxiosClient, 'get')
  mockAxios.mockImplementation(() => Promise.resolve({
    status: 302
  }));

  const { checkLoggedIn } = useLogin();

  await checkLoggedIn();

  expect(setState).toBeCalledWith(false);
});

test("should retrieve the JWT token correctly after redirection by web", async () => {
  const linkingSpy = jest.spyOn(Linking, 'getInitialURL');
  linkingSpy.mockImplementation(() => Promise.resolve("https://fb0c-94-143-189-241.eu.ngrok.io?JWT=123456789123456789#"))

  Platform.OS = "web"

  jest.spyOn(localStorage, 'setItem');

  await act(async () => {
    renderDom(<LoginContainer><Text>Test</Text></LoginContainer>, document.createElement("div"));
  })
  expect(localStorage.setItem).toBeCalledWith("JwtToken", "123456789123456789");
});

