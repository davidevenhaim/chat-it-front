import React, { useEffect, useCallback, useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay'
import Ionicons from '@expo/vector-icons/Ionicons';

import AppLogo from '../Shared/Logo';
import AuthBackground from '../Shared/AuthBackground';
import Button from '../Shared/Button';
import Title from '../Shared/Title';

import { theme } from '../Core/theme';

import { isEmailValid } from '../../utils/validators';
import { iCurrentScreen } from '../Screens/UnAuthScreen';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../utils/constatns';
import { AuthContext } from '../../context/AuthContext';
import GoogleSignInButton from './GoogleSignIn';

const EMAIL = "email";
const PASSWORD = "password";

type iField = "email" | "password"
type iErrMsg = { field: iField | "", msg: string };
type iFormData = { email: string, password: string };

interface Props {
    setScreen: (newScreen: iCurrentScreen) => void;
}

const LoginScreen = ({ setScreen }: Props) => {
    const { register, handleSubmit, setValue } = useForm<iFormData>({ mode: "onChange" });

    const { isLoading, login } = useContext(AuthContext);

    const [errMsg, setErrMsg] = useState<iErrMsg>({ field: "", msg: "" });

    const onSubmit = useCallback(async (formData: iFormData) => {
        const { email, password } = formData;

        if (!email) {
            setErrMsg({ field: EMAIL, msg: "Required field" });

            return;
        } else if (!isEmailValid(email)) {
            setErrMsg({ field: EMAIL, msg: "Email is not valid" });

            return;
        }

        if (!password) {
            setErrMsg({ field: PASSWORD, msg: "Required field" });

            return;
        }

        const res = await login(email, password);

        setErrMsg({ field: "", msg: res as string });
    }, []);

    const onChangeField = useCallback(
        (name: iField) => (text: string) => {
            setValue(name, text);
            if (errMsg.field) {
                setErrMsg({ field: "", msg: "" })
            }
        },
        []
    );

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return (
        <AuthBackground>
            <Spinner visible={isLoading} />
            <View style={styles.container} >
                <AppLogo />
                <Title>
                    Hello, Welcome Back!
                </Title>
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
                    onPress={() => setScreen("REGISTER")}
                >
                    <Text style={{ color: "gray", fontSize: 11 }} >
                        Doesn't have an account?{" "}
                        <Text style={{ fontSize: 11, color: theme.colors.primary, textDecorationLine: "underline" }} >
                            Sign Up here
                        </Text>
                    </Text>
                </TouchableOpacity>

                <View style={{ marginTop: 2 }} >
                    <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={isLoading} />
                </View>

                {errMsg.msg &&
                    <Text style={{ color: theme.colors.error }} >
                        {errMsg.msg}
                    </Text>
                }
                <GoogleSignInButton disabled={isLoading} />
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

export default LoginScreen;