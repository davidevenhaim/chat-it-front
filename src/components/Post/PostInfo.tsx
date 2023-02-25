import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../Core/theme";

interface Props {
    text: string;
    image: string;
}

const PostInfo = ({ image, text }: Props) => (
    <View style={styles.container} >
        <Text style={styles.text} >
            {text}
        </Text>
        <Image source={{ uri: image }} style={styles.image} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.snowWhite,
        width: "90%",
        height: 65,
        borderColor: theme.colors.primary,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        overflow: "scroll",
        alignContent: "center",

    },
    text: {},
    image: {
        height: 55,
        width: 55,
        position: "absolute",
        right: 0,
        overflow: "hidden",
        borderRadius: 20,
        top: 5,
        bottom: 5,
    },
})

export default PostInfo;