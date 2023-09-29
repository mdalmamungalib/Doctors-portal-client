import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState("");
    console.log(email)

    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-smoky-mu.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem("accessToken", data?.accessToken);
                    console.log("use token", data)
                    setToken(data?.accessToken);
                })
        }
    }, [email]);
    return [token];
};

export default useToken;