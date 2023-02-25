import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';
import { theme } from '../Core/theme';
import { Avatar } from 'react-native-paper';

interface Props {
    setImage: (image: string) => void;
    image: string;
    previewSize?: number;
}



const AppImagePicker = ({ image, setImage, previewSize = 110 }: Props) => {
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

    const onSaveCallback = async () => {
        console.log("save button was pressed")

        try {
            if (image != "") {
                console.log("uploading image")
                // const url = await StudentModel.uploadImage(image)
                // student.image = url
                // console.log("got url from upload: " + url)
            }
            console.log("saving stundet")
            // await StudentModel.addStudent(student)
        } catch (err) {
            console.log("fail adding studnet: " + err)
        }
    }


    return (
        <>
            <Avatar.Image source={image ? { uri: image } : require('../../assets/ava.png')} size={previewSize} />

            <View style={styles.iconContainer} >

                <TouchableOpacity onPress={openCamera} >
                    <Ionicons name='camera' style={styles.icon} size={50} />
                </TouchableOpacity>

                <TouchableOpacity onPress={openGallery} >
                    <Ionicons name='image' style={styles.icon} size={50} />
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
        color: theme.colors.primary,
        margin: 4,
    }
});


export default AppImagePicker;