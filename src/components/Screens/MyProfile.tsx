import { FC, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { AuthContext } from '../../context/AuthContext';

import Button from '../Shared/Button';
import AppLoading from '../Shared/AppLoading';
import LottieAnimation from '../Shared/Lottie';

const MyProfileScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { logout, currentUser, isLoading } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Profile</Text>
            <AppLoading isLoading={!currentUser} />
            <Button title='Logout' onPress={logout} />
        </View>
    );
}

export default MyProfileScreen