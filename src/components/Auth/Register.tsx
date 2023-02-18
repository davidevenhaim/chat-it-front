import React, { useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

import Ionicons from '@expo/vector-icons/Ionicons';

import AppLogo from '../Shared/Logo';
import AuthBackground from '../Shared/AuthBackground';
import Button from '../Shared/Button';
import Title from '../Shared/Header';

import { theme } from '../Core/theme';

import authApi from '../../api/AuthApi';

import { isEmailValid } from '../../utils/validators';
import { iCurrentScreen } from '../Screens/UnAuthScreen';

const EMAIL = "email";
const PASSWORD = "password";

type iErrMsg = { field: "email" | "password" | "", msg: string };

interface Props {
    setScreen: (newScreen: iCurrentScreen) => void;
}

const RegisterScreen = ({ setScreen }: Props) => {
    const { register, handleSubmit, setValue } = useForm({ mode: "onChange" });

    const [errMsg, setErrMsg] = useState<iErrMsg>({ field: "", msg: "" });

    const onSubmit = useCallback(async (formData) => {
        const { email, password } = formData;

        if (!email) {
            setErrMsg({ field: EMAIL, msg: "Required field" });
            return;
        }
        if (!password) {
            setErrMsg({ field: PASSWORD, msg: "Required field" });
            return;
        }

        if (!isEmailValid(email)) {
            setErrMsg({ field: EMAIL, msg: "Email is not valid" });
            return;
        }

        const res = await authApi.signInUser(email, password);
        const data: any = res.data;
        if (data.err) {
            setErrMsg({ field: "", msg: data.err });
        }
        console.log(res.data)
    }, []);

    const onChangeField = useCallback(
        name => text => {
            setValue(name, text);
        },
        []
    );

    const loginWithGoogle = () => { }

    useEffect(() => {
        register('name');
        register('email');
        register('password');
    }, [register]);

    return (
        <AuthBackground>
            <View style={styles.container} >
                <AppLogo />
                <TextInput
                    keyboardType="default"
                    placeholder="Name"
                    label="Name"
                    onChangeText={onChangeField('name')}
                    style={[styles.input, { borderColor: errMsg.field === EMAIL ? "red" : theme.colors.primary }]}
                />

                <TextInput
                    autoComplete="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Email"
                    label="Email"
                    onChangeText={onChangeField('email')}
                    style={[styles.input, { borderColor: errMsg.field === EMAIL ? "red" : theme.colors.primary }]}

                />

                <TextInput
                    secureTextEntry
                    label="Password"
                    style={[styles.input, { borderColor: errMsg.field === PASSWORD ? "red" : theme.colors.primary }]}
                    autoComplete="password"
                    placeholder="Password"
                    onChangeText={onChangeField('password')}
                />

                <TouchableOpacity
                    style={{ marginBottom: 4 }}
                    onPress={() => setScreen("LOGIN")}
                >
                    <Text style={{ color: "gray", fontSize: 11 }} >
                        Already have an account?{" "}
                        <Text style={{ fontSize: 11, color: theme.colors.primary, textDecorationLine: "underline" }} >
                            Login here
                        </Text>
                    </Text>
                </TouchableOpacity>

                <View style={{ marginTop: 2 }} >
                    <Button title="Signup" onPress={handleSubmit(onSubmit)} />
                </View>

                {errMsg.msg &&
                    <Text style={{ color: theme.colors.error }} >
                        {errMsg.msg}
                    </Text>
                }

                <TouchableOpacity
                    style={{
                        marginTop: 35,
                        borderWidth: 0.5,
                        borderRadius: 40,
                        padding: 7,
                        borderColor: theme.colors.primary
                    }}
                    onPress={loginWithGoogle}
                >
                    <Ionicons name="logo-google" size={35} color="#f4c20d" />
                </TouchableOpacity>
            </View>

        </AuthBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        height: 55,
        width: 250,
        margin: 10,
        padding: 5,
        borderWidth: 1.2,
        borderRadius: 5,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.snowWhite
    },

});

export default RegisterScreen;