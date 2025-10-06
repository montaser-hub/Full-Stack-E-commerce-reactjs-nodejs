import axios from "axios";

const API_URL = "http://localhost:3000/api/wishlist";

export const fetchWishlist = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data.data;
};
