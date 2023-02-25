import { FC, useContext, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, } from 'react-native';
import { Badge } from 'react-native-paper';

import { AuthContext } from '../../context/AuthContext';

import { theme } from '../Core/theme';

// @ Custom Components
import Button from '../Shared/Button';
import AppLoading from '../Shared/AppLoading';
import AppImagePicker from '../Shared/ImagePicker';
import AllPosts from '../Post/AllPosts';
import { AUTH_NAVIGATION_NAMES } from '../navigation/constants';


const MyProfileScreen: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const { logout, isLoading, userInfo, getUserInfo, userData } = useContext(AuthContext);

    const [image, setImage] = useState<string>(userData?.avatarUrl || '');

    const [editMode, setEditMode] = useState<boolean>(false);

    const handleCreatePost = () => {
        navigation.navigate(AUTH_NAVIGATION_NAMES.ADD_POST)
    }

    const onRefresh = () => getUserInfo(userInfo.id);

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.infoContainer} >
                <AppImagePicker image={image} setImage={(image: string) => setImage(image)} />

                <Text>Hi, {userData?.name || ""}</Text>

                <View style={{ alignContent: "center", marginTop: 10 }} >
                    <Badge>{userData?.posts.length || 0}</Badge>
                </View>

                <Text style={{ color: theme.colors.caption, fontSize: 11 }}>Posts Number</Text>

                <View style={styles.btnContainer} >
                    <Button
                        title='Logout'
                        onPress={logout}
                        style={styles.btn}
                    />
                    <Button
                        title={editMode ? "Submit" : "Edit Details"}
                        onPress={() => setEditMode(prevState => !prevState)}
                        style={styles.btn}
                    />
                </View>

            </View>


            <ScrollView
                contentContainerStyle={styles.postsContainer}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
            >
                <AllPosts
                    posts={userData?.posts || []}
                    navToCreatePost={handleCreatePost}
                    title="My Posts"
                />
            </ScrollView>

            <AppLoading isLoading={!userInfo || isLoading} />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.95
    },
    btnContainer: {
        flexDirection: "row",
    },
    btn: {
        margin: 5
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: "center",
    },
    postsContainer: {
        // alignItems: 'center',
        // flex: 0.8,
        justifyContent: "center",
        // maxHeight: 350,
        // padding: 20,
        // height: "50%",
    },
})

export default MyProfileScreen