import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constatns";

const signUpUser = async (email: string, password: string) => {
    return apiClient.post(`/${URL_PATHS.auth}/register`, { email, password });
}

const signInUser = async (email: string, password: string) => {
    return apiClient.post(`/${URL_PATHS.auth}/login`, { email, password });
}

const logoutUser = async () => {
    return apiClient.get(`/${URL_PATHS.auth}/logout`); // pass the refresh
}

const authApi = {
    logoutUser,
    signInUser,
    signUpUser,
}

export default authApi;