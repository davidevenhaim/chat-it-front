import apiClient from "./ClientApi";
import { URL_PATHS } from "../utils/constatns";

const getUser = async (userId: string) => {
    return apiClient.get(`/${URL_PATHS.user}/${userId}`);
};

const editUserInfo = async (userJson: any) => {
    return apiClient.post(`/${URL_PATHS.user}`, userJson);
};

const uploadUserImage = async (image: FormData) => {
    return apiClient.post(`/${URL_PATHS.file}/file`, image);
};

const userApi = {
    getUser,
    editUserInfo,
    uploadUserImage
};

export default userApi;


