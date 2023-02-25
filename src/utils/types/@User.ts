import { Post } from "./@Post";

export interface User {
    avatarUrl: string;
    email: string;
    name: string;
    posts: Post[];
}