import { useState } from "react";
import AxiosClient from "../../utils/AxiosClient";

export default function useLogin() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function checkLoggedIn() {
        setLoading(true)
        return AxiosClient.get("/api/healthcheck")
            .then((response) => {
                if (response.status >= 300)
                    setLoggedIn(false)
                else
                    setLoggedIn(true)
            })
            .catch(() => {
                setLoggedIn(false)
            }).finally(() => setLoading(false));
    }

    return {
        loggedIn,
        checkLoggedIn,
        loading
    };
}
