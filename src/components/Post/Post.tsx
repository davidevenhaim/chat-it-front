import { StyleSheet, View } from "react-native";

import PostInfo from "./PostInfo";
import PostOwnerInfo from "./PostOwnerInfo";

import { Post } from "../../utils/types/@Post";

interface Props {
    post: Post
}

const PostItem = ({ post }: Props) => {
    const { text } = post;

    return (
        <View style={styles.container} >
            <PostOwnerInfo
                avatar={post.owner?.avatarUrl || ""}
                name={post.owner?.name || ""}
            />

            <View style={{ alignItems: 'center' }} >
                <PostInfo text={text} image={post.image || ""} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
})

export default PostItem;