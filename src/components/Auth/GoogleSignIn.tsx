import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

// @ expo
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import Ionicons from '@expo/vector-icons/Ionicons';
// @ Constants
import { theme } from '../Core/theme';

// @ Api
import authApi from '../../api/AuthApi';

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
    const [_, response, promptAsync] = Google.useAuthRequest({
        expoClientId: process.env.EXPO_CLIENT_ID,
        iosClientId: process.env.OAUTH_IOS_CLIENT_ID,
        scopes: ['email', 'profile'],
    });

    const logGoogleUser = async (accessToken: string): Promise<boolean> => {
        const userInfo = await authApi.fetchUserInfo(accessToken);
        const res = await authApi.googleSignUser({ email: userInfo.email, name: userInfo.name });

        // if(res.data.status === 200) {
        // write user to the AuthContext
        // }
        return true;

        return false;
    }

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication) {
                const { accessToken } = authentication;
                logGoogleUser(accessToken);
            }
        }
    }, [response]);

    return (
        <TouchableOpacity
            style={{
                marginTop: 35,
                borderWidth: 0.5,
                borderRadius: 40,
                padding: 7,
                borderColor: theme.colors.primary
            }}
            onPress={() => {
                promptAsync();
            }}
        >
            <Ionicons name="logo-google" size={35} color="#f4c20d" />
        </TouchableOpacity>
    );
}

export default GoogleSignInButton;