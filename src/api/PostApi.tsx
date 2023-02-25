import { iEditPost, Post } from "../utils/types/@Post";
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

const editPost = async (postId: string, editedPost: iEditPost) => {
    return apiClient.put(`/${post}/${postId}`, editedPost);
}


export default {
    getAllPosts,
    getPostById,
    addNewPost,
    editPost,
};
