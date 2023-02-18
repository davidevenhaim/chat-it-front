import { FC, useState } from 'react';
import { StatusBar, StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Google from 'expo-auth-session/providers/google';
import GoogleSignInButton from '../Auth/GoogleSignIn';
import Login from '../Auth/Login';
import AppLogo from '../Shared/Logo';
import LoginScreen from '../Auth/Login';
import RegisterScreen from '../Auth/Register';
import ForgetPasswordScreen from '../Auth/ForgetPassword';

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";
const FORGET_PASSWORD = "FORGET_PASSWORD";

export type iCurrentScreen = "LOGIN" | "REGISTER" | "FORGET_PASSWORD";

const UnAuthScreen = () => {
    const [currentScreen, setCurrentScreen] = useState<iCurrentScreen>(LOGIN);

    const googleSignIn = async () => {
        const [request, response, promptAsync] = await Google.useAuthRequest({
            expoClientId: '',
            iosClientId: '',
            androidClientId: '',
        });

        if (response?.type === 'success') {
            const { authentication } = response;
        }
    }

    const getCurrentScreen = () => {
        switch (currentScreen) {
            case LOGIN:
                return <LoginScreen setScreen={(newScreen: iCurrentScreen) => setCurrentScreen(newScreen)} />
            case REGISTER:
                return <RegisterScreen setScreen={(newScreen: iCurrentScreen) => setCurrentScreen(newScreen)} />
            case FORGET_PASSWORD:
                return <ForgetPasswordScreen setScreen={(newScreen: iCurrentScreen) => setCurrentScreen(newScreen)} />
            default:
                return <LoginScreen setScreen={(newScreen: iCurrentScreen) => setCurrentScreen(newScreen)} />
        }
    }

    return (
        <>
            {getCurrentScreen()}
        </>
    );
}


const styles = StyleSheet.create({
    unAuthContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

});

export default UnAuthScreen