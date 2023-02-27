import { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

// @ Custom Components
import Title from '../Shared/Title';
import SendMessage from '../Chat/SendMessage';
import ShowMessages from '../Chat/ShowMessages';

// @ Utils, Types & Constants
import { Message } from '../../utils/types/@Message';
import socket from '../../utils/socket';
import { CHAT } from '../../utils/constants';

const ChatScreen = () => {
    const { userInfo } = useContext(AuthContext);

    const [roomId, setRoomId] = useState<string>('');
    const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

    const handleSendMessage = (message: string, userId: string) => {
        socket.emit(CHAT.SEND_MESSAGE, {
            message,
            userId,
        });
    }

    useEffect(() => {
        socket.on(CHAT.RES_MESSAGES, (messages) => {
            setCurrentMessages(messages);
        });
        return () => {
            socket.off(CHAT.RES_MESSAGES);
        }
    }, [])

    useEffect(() => {
        socket.on(CHAT.NEW_MESSAGE, (data) => {
            if (data) {
                setCurrentMessages(prevState => [...prevState, data]);
            }
        })
        return () => {
            socket.off(CHAT.NEW_MESSAGE);
        }
    }, [])

    useEffect(() => {
        socket.auth = {
            token: `Bearer ${userInfo.accessToken}`
        };
        socket.connect();
        const roomId = socket.id;
        setRoomId(socket.id);



        socket.emit(CHAT.GET_MESSAGES, roomId);

        return () => {
            socket.off('connect');
        }
    }, []);

    return (
        <SafeAreaView >
            <KeyboardAvoidingView behavior="padding">
                <Title>Global Chat</Title>
                <ShowMessages messages={currentMessages} />
                <SendMessage handleSendMessage={(val: string) => handleSendMessage(val, userInfo.id)} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export const styles = StyleSheet.create({

});

export default ChatScreen