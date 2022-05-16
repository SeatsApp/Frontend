import axios from "axios";
import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

axios.defaults.withCredentials = true

const AxiosClient = axios.create({
    withCredentials: true,
    baseURL: 'https://5040-94-143-189-241.eu.ngrok.io'
})

AxiosClient.interceptors.request.use(async req => {
    if (Platform.OS === "web") {
        const jwtToken = localStorage.getItem("JwtToken")
        if (req.headers !== undefined && jwtToken !== null) {
            req.headers.authorization = "Bearer " + jwtToken;
        }
    } else {
        const jwtToken = await SecureStore.getItemAsync('JwtToken')
        if (req.headers !== undefined && jwtToken !== null)
            req.headers.authorization = "Bearer " + jwtToken;
    }
    return req;
});

export default AxiosClient;