import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

import { KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from '../Core/theme';

interface Props {
    handleSendMessage: (msg: string) => void;
}

const SendMessage = ({ handleSendMessage }: Props) => {
    const [msg, setMsg] = useState<string>('');

    const handleSend = () => {
        if (msg.length === 0) {

        } else {
            handleSendMessage(msg);
            setMsg('');
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding">
            <View style={styles.container} >

                <TextInput
                    value={msg}
                    onChangeText={(val) => setMsg(val)}
                    style={styles.textBox}
                />

                <TouchableOpacity onPress={handleSend} >
                    <Ionicons name="send-outline" size={36} />
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    textBox: {
        width: "85%",
        borderRadius: 40,
        backgroundColor: theme.colors.snowWhite,
        borderWidth: 1,
        paddingLeft: 17,
        borderColor: theme.colors.primary,
    },
})

export default SendMessage;