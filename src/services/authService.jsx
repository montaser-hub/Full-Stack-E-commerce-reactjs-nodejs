import { axiosInstance } from "../App/AxiosInstance/AxiosInstance";

export const ProtectRoute = async () => {
    try {
        const res = await axiosInstance.get("/users/check", {
            withCredentials: true,
        });

        if (res.data?.authenticated) {
            console.log("Your Authantcated :", res.data.authenticated);
            return { authenticated: true, user: res.data.user };

        } else {
            console.log("Your not Authantcated :");
            return { authenticated: false };
        }
    } catch (err) {
        console.error("Auth check failed:", err.response?.data || err.message);
        return { authenticated: false };
    }
};

