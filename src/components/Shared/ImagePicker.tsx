import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

import * as ImagePicker from 'expo-image-picker';

import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '../Core/theme';

interface Props {
    setImage: (image: string) => void;
    image: string;
    previewSize?: number;
    disabled?: boolean
}

const AppImagePicker = ({ image, setImage, previewSize = 110, disabled }: Props) => {
    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const askPermission = async () => {
        try {
            const res = await requestPermission();
            if (!res.granted) {
                alert("If you want to take a picture, camera permsission is required.")
            }
        } catch (err) {
            console.log("ask permission error " + err)
        }
    }

    const openCamera = async () => {
        try {
            if (!status?.granted) {
                await askPermission();
            }

            const res = await ImagePicker.launchCameraAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setImage(uri)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }

    const openGallery = async () => {
        try {
            const res = await ImagePicker.launchImageLibraryAsync()
            if (!res.canceled && res.assets.length > 0) {
                const uri = res.assets[0].uri
                setImage(uri)
            }

        } catch (err) {
            console.log("open camera error:" + err)
        }
    }

    return (
        <>
            <Avatar.Image source={image ? { uri: image } : require('../../assets/ava.png')} size={previewSize} />

            <View style={styles.iconContainer} >

                <TouchableOpacity onPress={openCamera} disabled={disabled} >
                    <Ionicons
                        name='camera'
                        style={styles.icon}
                        size={50}
                        color={disabled ? theme.colors.darkGrey : theme.colors.primary}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={openGallery} disabled={disabled} >
                    <Ionicons
                        name='image'
                        style={styles.icon}
                        size={50}
                        color={disabled ? theme.colors.darkGrey : theme.colors.primary}
                    />
                </TouchableOpacity>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        flexDirection: "row",

    },
    avatar: {
        height: 250,
        resizeMode: "contain",
        alignSelf: 'center',
        width: '100%',
    },
    icon: {
        margin: 4,
    }
});


export default AppImagePicker;