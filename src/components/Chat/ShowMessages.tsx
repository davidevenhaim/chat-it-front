import { useContext, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { Message } from "../../utils/types/@Message";
import MessageView from "./MessageView";

interface Props {
    messages: Message[];
}

const ShowMessages = ({ messages }: Props) => {
    const { userInfo } = useContext(AuthContext);
    const [ref, setRef] = useState<ScrollView | null>();

    return (
        <View style={{ height: "85%" }} >
            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={styles.messagingscreen}
                    ref={ref => setRef(ref)}
                    onContentSizeChange={(width, height) => {
                        if (ref?.scrollTo) {
                            ref?.scrollTo({ y: height, animated: true });
                        }
                    }}
                >
                    {messages.map(msg => (
                        <TouchableWithoutFeedback>
                            <MessageView
                                key={msg._id}
                                msg={msg.message}
                                isOwner={msg.userId === userInfo.id}
                                avatar={msg?.owner?.avatarUrl || ''}
                                name={msg?.owner?.name || ''}
                            />
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    messagingscreen: {
        justifyContent: "center",
        flexGrow: 1,
        minHeight: "100%"
    }
})

export default ShowMessages;