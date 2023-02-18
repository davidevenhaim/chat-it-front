import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }, [response]);

    return (
        <Button
            disabled={!request}
            title="Login With Google"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}

export default GoogleSignInButton;