import MockAdapter from "axios-mock-adapter";
import faker from "faker";
import { Platform } from "react-native";
import AxiosClient from "../../src/utils/AxiosClient";
import 'jest-localstorage-mock';
import * as SecureStore from 'expo-secure-store';

const mockAxios = new MockAdapter(AxiosClient);
const expectedResult = {
  id: faker.datatype.uuid(),
};
mockAxios.onGet(`google.com`).reply((config: any) => {
  expect(config.headers.authorization).toEqual("Bearer test");
  return [200, expectedResult, {
    "Content-type": "application/json",
  }];
});

test("testing axios request interceptors for web", async () => {
  Platform.OS = "web"

  jest.spyOn(localStorage, 'getItem');

  localStorage.setItem("JwtToken", "test")

  AxiosClient.get("google.com")
});

test("testing axios request interceptors for Android", async () => {
  Platform.OS = "android"

  SecureStore.setItemAsync("JwtToken", "test")

  AxiosClient.get("google.com")
});