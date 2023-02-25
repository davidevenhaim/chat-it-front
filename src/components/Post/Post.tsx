import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { Post } from "../../utils/types/@Post";
import PostInfo from "./PostInfo";
import PostOwnerInfo from "./PostOwnerInfo";

interface Props {
    post: Post
}

const PostItem = ({ post }: Props) => {
    const { text } = post;
    const avatar = '';
    const name = 'David';

    return (
        <View style={styles.container} >
            <PostOwnerInfo
                avatar={avatar}
                name={name}
            />

            <View style={{ alignItems: 'center' }} >
                <PostInfo text={text} image={post.image} />
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