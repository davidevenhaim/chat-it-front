import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import authApi from '../api/AuthApi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constatns';


type UserInfo = {
    accessToken: string;
    refreshToken: string;
};

type AuthContextType = {
    isLoading: boolean;
    userInfo: UserInfo;
    splashLoading: boolean;
    register: (email: string, password: string, name: string) => Promise<true | string> | null;
    login: (email: string, password: string) => Promise<true | string> | null;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    userInfo: { accessToken: '', refreshToken: '' },
    splashLoading: false,
    register: (email: string, password: string, name: string) => null,
    login: (email: string, password: string) => null,
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({ accessToken: '', refreshToken: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [splashLoading, setSplashLoading] = useState<boolean>(false);

    const register = async (email: string, password: string, name: string): Promise<true | string> => {
        setIsLoading(true);
        const res = await authApi.signUpUser({ email, password, name });

        const data: any = res.data;
        if (data.err) {
            setIsLoading(false);
            return data.err as string;
        }

        setIsLoading(false);
        return true;
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const res = await authApi.signInUser({ email, password });

        const data: any = res.data;

        if (data.err) {
            setIsLoading(false);
            return data.err as string;
        }
        const { accessToken, refreshToken } = data;

        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);

        setUserInfo({ accessToken, refreshToken });

        setIsLoading(false);
        return true;
    };

    const logout = async () => {
        setIsLoading(true);

        await Promise.all([
            authApi.logoutUser(userInfo.refreshToken),
            AsyncStorage.removeItem('userInfo'),
            AsyncStorage.clear()
        ]);

        setIsLoading(false);
        setUserInfo({ accessToken: '', refreshToken: '' });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo: any = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};