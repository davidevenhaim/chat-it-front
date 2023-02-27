import { Avatar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "../Core/theme";

interface Props {
    msg: string;
    isOwner?: boolean;
    avatar: string;
    name: string;
}

const MessageView = ({ msg, isOwner, avatar, name }: Props) => {
    return (
        <View style={{ alignItems: isOwner ? "flex-end" : "flex-start", marginTop: 5 }} >
            <View style={{ flexDirection: "row", alignItems: "center" }} >
                <Text style={{ paddingLeft: 5, paddingRight: 5 }} >
                    {name}
                </Text>
                <Avatar.Image size={42} source={avatar ? { uri: avatar } : require('../../assets/ava.png')} />
            </View>
            <View style={[styles.msgBox, isOwner ? styles.msgBoxOwner : styles.msgBoxNotOwner]} >
                <Text>{msg}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    msgBox: {
        backgroundColor: theme.colors.caption,
        padding: 4,
        borderRadius: 10,
        width: "70%",
        margin: 5,
        borderWidth: 0.5,
    },
    msgBoxOwner: {
        borderColor: theme.colors.primary
    },
    msgBoxNotOwner: {
        borderColor: theme.colors.secondary
    },
    container: {
        height: "10%"
    },
})

export default MessageView;