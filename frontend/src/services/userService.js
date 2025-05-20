import api from "../utils/api";

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/users/login', userData);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}