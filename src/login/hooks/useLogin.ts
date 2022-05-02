import { useState } from "react";
import AxiosClient from "../../utils/AxiosClient";

export default function useLogin() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    function checkLoggedIn() {
        return AxiosClient.get("/api/healthcheck")
            .then((response) => {
                if (response.status >= 300)
                    setLoggedIn(false)
                else
                    setLoggedIn(true)
            })
            .catch(() => {
                setLoggedIn(false)
            });
    }

    return {
        loggedIn,
        checkLoggedIn,
    };
}
