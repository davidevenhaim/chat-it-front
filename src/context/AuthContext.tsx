import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import authApi from '../api/AuthApi';
import apiClient from '../api/ClientApi';
import userApi from '../api/UserApi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constatns';
import { Post } from '../utils/types/@Post';
import { User } from '../utils/types/@User';


type UserInfo = {
    accessToken: string;
    refreshToken: string;
    id: string;
};

type AuthContextType = {
    isLoading: boolean;
    userInfo: UserInfo;
    splashLoading: boolean;
    register: (email: string, password: string, name: string) => Promise<true | string> | null;
    login: (email: string, password: string) => Promise<true | string> | null;
    logout: () => void;
    getUserInfo: (id: string) => void;
    googleSignin: (accessToken: string) => Promise<boolean> | null;
    userData?: User;
};

export const AuthContext = createContext<AuthContextType>({
    isLoading: false,
    userInfo: { accessToken: '', refreshToken: '', id: '' },
    splashLoading: false,
    register: (email: string, password: string, name: string) => null,
    login: (email: string, password: string) => null,
    googleSignin: () => null,
    getUserInfo: () => null,
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({ accessToken: '', refreshToken: '', id: '' });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [splashLoading, setSplashLoading] = useState<boolean>(false);

    const [userData, setUserData] = useState<User>();

    const register = async (email: string, password: string, name: string): Promise<true | string> => {
        setIsLoading(true);
        const res = await authApi.signUpUser({ email, password, name });

        const data: any = res?.data;
        if (data?.err) {
            setIsLoading(false);
            return data.err as string;
        }

        setIsLoading(false);
        return true;
    };

    const login = async (email: string, password: string) => {
        console.log("Login")
        setIsLoading(true);
        const res = await authApi.signInUser({ email, password });

        const data: UserInfo | any = res.data;

        if (data.err) {
            setIsLoading(false);

            return data.err as string;
        }

        await createUserSession(data);

        setIsLoading(false);
        return true;
    };

    const googleSignin = async (googleToken: string) => {
        const userInfo = await authApi.fetchUserInfo(googleToken);

        const res = await
            authApi.googleSignUser({
                email: userInfo.email,
                name: userInfo.given_name,
                avatar: userInfo.picture
            });

        const data: UserInfo | any = res.data;
        console.log(data);
        if (!data.err) {
            await createUserSession(data);
        }

        return true;
    }

    const logout = async () => {
        setIsLoading(true);

        await Promise.all([
            authApi.logoutUser(userInfo.refreshToken),
            AsyncStorage.removeItem('userInfo'),
            AsyncStorage.clear()
        ]);

        setIsLoading(false);
        setUserInfo({ accessToken: '', refreshToken: '', id: '' });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo: any = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
                apiClient.setHeader('Authorization', `Bearer ${userInfo.accessToken}`)
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    const getUserInfo = async (userId: string) => {
        const res = await userApi.getUser(userId)
        setUserData(res.data as User);
    }

    const createUserSession = async (data: UserInfo) => {
        const [userRes] = await Promise.all([userApi.getUser(data.id), AsyncStorage.setItem(ACCESS_TOKEN, data.accessToken), AsyncStorage.setItem(REFRESH_TOKEN, data.refreshToken)])
        const userData = userRes.data;
        setUserData(userData as User);
        setUserInfo(data);

        apiClient.setHeader('Authorization', `Bearer ${data.accessToken}`)
    }

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
                getUserInfo,
                googleSignin,
                userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};