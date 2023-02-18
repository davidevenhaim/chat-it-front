import { FC, useContext } from 'react';
import { Text, View, } from 'react-native';

import { AuthContext } from '../../context/AuthContext';

import Button from '../Shared/Button';

const MyProfileScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { logout } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Profile</Text>
            <Button title='Logout' onPress={logout} />
        </View>
    );
}

export default MyProfileScreen