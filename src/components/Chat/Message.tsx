import { StyleSheet, Text, View } from "react-native";
import { Message } from "../../utils/types/@Message"
import { theme } from "../Core/theme";

interface Props {
    msg: string;
    isOwner?: boolean;
}

const MessageView = ({ msg, isOwner }: Props) => {
    return (
        <View style={styles.container} >
            <Text>{msg}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.caption,
        padding: 4,
        borderRadius: 5,
        height: 10,
        width: "70%",
    }
})

export default MessageView;