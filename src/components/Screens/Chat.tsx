import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { baseUrl } from '../../api/ClientApi';
import { AuthContext } from '../../context/AuthContext';
import { CHAT } from '../../utils/constatns';

import socket from '../../utils/socket';
import SendMessage from '../Chat/SendMessage';
import ShowMessages from '../Chat/ShowMessages';
import { theme } from '../Core/theme';

const ChatScreen = () => {
    const { userInfo } = useContext(AuthContext);

    const [roomId, setRoomId] = useState<string>('');
    const [currentMessages, setCurrentMessages] = useState<any[]>([]);

    const handleSendMessage = (message: string, userId: string) => {
        socket.emit(CHAT.SEND_MESSAGE, {
            message,
            userId,
        });
    }

    useEffect(() => {
        socket.auth = {
            token: `Bearer ${userInfo.accessToken}`
        };
        socket.connect();
        const roomId = socket.id;
        setRoomId(socket.id);

        socket.on(CHAT.RES_MESSAGES, (messages) => {
            console.log("CHAT.MESSAGE_DATA");
            setCurrentMessages(messages);
        });

        socket.on(CHAT.NEW_MESSAGE, (data) => {
            if (data) {
                setCurrentMessages(prevState => [...prevState, data]);
            }
        })

        socket.emit(CHAT.GET_MESSAGES, roomId);
    }, []);

    return (
        <View  >
            <ShowMessages messages={currentMessages} />
            <SendMessage handleSendMessage={(val: string) => handleSendMessage(val, userInfo.id)} />
        </View>
    );
}


export const styles = StyleSheet.create({

});

export default ChatScreen