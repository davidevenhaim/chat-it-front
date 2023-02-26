import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import PostItem from "./Post";

import Button from "../Shared/Button";
import LottieAnimation from "../Shared/Lottie";
import Title from "../Shared/Title";

import { Post } from "../../utils/types/@Post";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


interface Props {
    posts: Post[];
    navToCreatePost: (postId?: string) => void;
    title?: string;
}

const AllPosts = ({ navToCreatePost, posts, title }: Props) => {
    const { userInfo } = useContext(AuthContext);

    const noPosts = !posts || posts?.length === 0;

    return (

        <View style={{ flex: 1, justifyContent: 'center' }}>
            {
                noPosts ?
                    <View style={{ alignItems: 'center' }}>
                        <Title>
                            No posts yet...
                        </Title>
                        <LottieAnimation />
                        <Button onPress={() => navToCreatePost()} title='Add Post Now' />
                    </View>
                    :
                    <>
                        <Title style={{ marginLeft: 15 }} >
                            {title || "All Posts"}
                        </Title>
                        {posts.map(post =>
                            <PostItem
                                key={post._id}
                                post={post}
                                isOwner={userInfo.id === post.userId}
                                handleEdit={() => navToCreatePost(post._id)}
                            />
                        )}
                    </>
            }

        </View>

    )
}
export default AllPosts;