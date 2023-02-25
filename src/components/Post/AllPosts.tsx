import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import PostItem from "./Post";

import Button from "../Shared/Button";
import LottieAnimation from "../Shared/Lottie";
import Title from "../Shared/Title";

import { Post } from "../../utils/types/@Post";


interface Props {
    posts: Post[];
    navToCreatePost: () => void;
}

const AllPosts = ({ navToCreatePost, posts }: Props) => {
    const noPosts = !posts || posts?.length === 0;

    return (

        <View style={{ flex: 1, justifyContent: 'center' }}>


            {
                noPosts ?
                    <View style={{ alignItems: 'center' }}>
                        <Title text="No posts yet..." />
                        <LottieAnimation />
                        <Button onPress={navToCreatePost} title='Add Post Now' />
                    </View>
                    :
                    <>
                        <Title text="All Posts" />
                        {posts.map(post => <PostItem key={post._id} post={post} />)}
                    </>
            }

        </View>

    )
}
export default AllPosts;