import { FC, useContext, useState } from 'react';
import { Text, View, } from 'react-native';
import { Badge } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import { theme } from '../Core/theme';

// @ Custom Components
import Button from '../Shared/Button';
import AppLoading from '../Shared/AppLoading';
import AppImagePicker from '../Shared/ImagePicker';


const MyProfileScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { logout, isLoading, userInfo } = useContext(AuthContext);
    const [image, setImage] = useState<string>(userInfo.avatar || '');

    const { postsNumber } = { postsNumber: 12 }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AppImagePicker image={image} setImage={(image: string) => setImage(image)} />

            <Text>Hi, {userInfo?.name || ""}</Text>

            <View style={{ alignContent: "center", marginTop: 10 }} >
                <Badge>{postsNumber}</Badge>
            </View>

            <Text style={{ color: theme.colors.caption, fontSize: 11 }}>Posts Number</Text>

            <AppLoading isLoading={!userInfo || isLoading} />

            <Button title='Logout' onPress={logout} />
        </View>
    );
}

export default MyProfileScreen