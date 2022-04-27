import axios from "axios";
import { Platform } from "react-native";
import { toast } from "@jamsch/react-native-toastify";

const AxiosClient = axios.create({
    baseURL: 'http://'
        + (Platform.OS === 'android' ? '10.0.2.2' : 'localhost') + ':8080'
})

AxiosClient.interceptors.response.use(
    (response) => {
        if (response.config.method != "get")
            toast.success(response.data)
        return response
    },
    (error) => toast.error(error.response.data)
);

export default AxiosClient;