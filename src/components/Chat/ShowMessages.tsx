import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Message } from "../../utils/types/@Message";
import MessageView from "./Message";

interface Props {
    messages: Message[];
}

const ShowMessages = ({ messages }: Props) => {
    const { userInfo } = useContext(AuthContext);
    console.log(messages.length);
    return (
        <View style={styles.messagingscreen} >
            {messages.map(msg => (
                <MessageView
                    key={msg._id}
                    msg={msg.message}
                    isOwner={msg.userId === userInfo.id}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    messagingscreen: {
        // flex: 1,
        justifyContent: "center",
        alignContent: "center",
        alignItems: 'center',
        // height: "90%",
        height: 700,
        overflow: "scroll"
    },
    messaginginputContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: "white",
        paddingVertical: 30,
        paddingHorizontal: 15,
        justifyContent: "center",
        flexDirection: "row",
    },
})

export default ShowMessages;