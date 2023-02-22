import { Post } from "./@Post";

export interface User {
    avatar: string;
    email: string;
    name: string;
    posts: Post[];
}