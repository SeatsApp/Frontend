import MockAdapter from "axios-mock-adapter";
import faker from "faker";
import { Platform } from "react-native";
import AxiosClient from "../src/utils/AxiosClient";
import 'jest-localstorage-mock';
import * as SecureStore from 'expo-secure-store';

test("testing axios request interceptors for web", async () => {
  Platform.OS = "web"

  jest.spyOn(localStorage, 'getItem');

  const mockAxios = new MockAdapter(AxiosClient);
  const expectedResult = {
    id: faker.datatype.uuid(),
  };

  localStorage.setItem("JwtToken", "test")

  mockAxios.onGet(`google.com`).reply((config: any) => {
    expect(config.headers.authorization).toEqual("Bearer test");
    return [200, expectedResult, {
      "Content-type": "application/json",
    }];
  });
  AxiosClient.get("google.com")
});

test("testing axios request interceptors for Android", async () => {
  Platform.OS = "android"

  jest.spyOn(localStorage, 'getItem');

  const mockAxios = new MockAdapter(AxiosClient);
  const expectedResult = {
    id: faker.datatype.uuid(),
  };

  SecureStore.setItemAsync("JwtToken", "test")

  mockAxios.onGet(`google.com`).reply((config: any) => {
    expect(config.headers.authorization).toEqual("Bearer test");
    return [200, expectedResult, {
      "Content-type": "application/json",
    }];
  });
  AxiosClient.get("google.com")
});