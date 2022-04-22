import axios from "axios";
import { Platform } from "react-native";
import { toast } from "@jamsch/react-native-toastify";

const axiosClient = axios.create({ baseURL: 'http://' 
+ (Platform.OS === 'android' ? '10.0.2.2' : 'localhost') + ':8080'})

axiosClient.interceptors.response.use(
    (response) => toast.success(response.data),
    (error) => toast.error(error.response.data)
);

export default axiosClient;