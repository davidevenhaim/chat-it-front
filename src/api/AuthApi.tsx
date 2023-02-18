import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constatns";

const signUpUser = async (data: { email: string, password: string, name: string }) => {
    const { email, password, name } = data;
    return apiClient.post(`/${URL_PATHS.auth}/register`, { email, password, name });
}

const signInUser = async (data: { email: string, password: string }) => {
    const { email, password } = data;
    return apiClient.post(`/${URL_PATHS.auth}/login`, { email, password });
}

const logoutUser = async (token: string) => {
    return apiClient.get(
        `/${URL_PATHS.auth}/logout`,
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
    );
}

const authApi = {
    logoutUser,
    signInUser,
    signUpUser,
}

export default authApi;