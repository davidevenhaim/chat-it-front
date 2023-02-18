import { FC, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const MyProfileScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {

    // useEffect(() => {
    //     navigation.setOptions({ title: 'new Title' + id });
    // })

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Profile</Text>
        </View>
    );
}

export default MyProfileScreen