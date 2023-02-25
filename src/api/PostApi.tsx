import { Post } from "../utils/types/@Post";
import apiClient from "./ClientApi";

const post = 'post'

const getAllPosts = async () => {
    return apiClient.get(`/${post}`);
};

const getPostById = async (postId: string) => {
    return apiClient.get(`/${post}/${postId}`);
};

const addNewPost = async (newPost: Post) => {
    return apiClient.post(`/${post}/add-post`, newPost);
};

const uploadImage = async (image: any) => {
    return apiClient.post("/file/file", image);
};

export default {
    addNewPost,
    getAllPosts,
    getPostById,
    uploadImage,
};
