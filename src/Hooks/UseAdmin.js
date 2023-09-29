import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-smoky-mu.vercel.app/allUsers/admin/${email}`, {
                headers: {
                    authorization: `Berar ${localStorage.getItem("accessToken")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data?.isAdmin);
                    setIsAdminLoading(false);
                })
        }
    }, [email]);
    return [isAdmin, isAdminLoading];
}

export default useAdmin;