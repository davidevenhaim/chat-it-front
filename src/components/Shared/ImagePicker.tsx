import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from 'react';

interface Props {
    setImage: (image: string) => void;
    image: string;
}

const AppImagePicker = ({ image, setImage }: Props) => {

    const askPermission = async () => {
        try {
            const res = await ImagePicker.getCameraPermissionsAsync()
            if (!res.granted) {
                alert("camera permission is requiered!")
            }
        } catch (err) {
            console.log("ask permission error " + err)
        }
    }
    useEffect(() => {
        askPermission()
    }, [])

    const openCamera = async () => {
        try {
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
            <View>
                {image == "" && <Image source={require('../../../assets/ava.png')} style={styles.avatar}></Image>}
                {image != "" && <Image source={{ uri: image }} style={styles.avatar}></Image>}

                <TouchableOpacity onPress={openCamera} >
                    <Ionicons name={'camera'} style={styles.cameraButton} size={50} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery} >
                    <Ionicons name={'image'} style={styles.galleryButton} size={50} />
                </TouchableOpacity>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        height: 250,
        resizeMode: "contain",
        alignSelf: 'center',
        width: '100%'
    },
    cameraButton: {
        position: 'absolute',
        bottom: -10,
        left: 10,
        width: 50,
        height: 50,
    },
    galleryButton: {
        position: 'absolute',
        bottom: -10,
        right: 10,
        width: 50,
        height: 50,
    },
});


export default AppImagePicker;