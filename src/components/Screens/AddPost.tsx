import { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import { TextInput } from 'react-native-paper';
import postApi from '../../api/PostApi';
import { Post } from '../../utils/types/@Post';
import { theme } from '../Core/theme';
import Button from '../Shared/Button';

import AppImagePicker from '../Shared/ImagePicker';
import Title from '../Shared/Title';



const AddPostScreen = () => {
    const [post, setPost] = useState<Post>({ text: '', image: 'https://samplelib.com/lib/preview/png/sample-boat-400x300.png' })

    const [errorMsg, setErrorMsg] = useState<string>('a');

    const [loading, setLoading] = useState<boolean>(false);

    const handleResetForm = () => {
        setPost({ text: '', image: '' });
    }

    const handleSubmitPost = async () => {
        console.log("!!!! ", post)

        if (!post.text) {
            setErrorMsg("Post description is required!");
            return;
        }

        if (!post.image) {
            setErrorMsg("Post image is required!");
            return;
        }
        setLoading(true);
        const res = await postApi.addNewPost({ text: post.text, image: post.image });
        setLoading(false);
        const data: Post | any = res.data;
        if (data._id) {
            handleResetForm();
            Alert.alert('New post created successfully!');
        }
    }

    const handleChange = (field: 'text' | 'image', value: string) => {
        switch (field) {
            case 'image':
                setPost(prevState => ({ ...prevState, image: value }));
                break;
            case 'text':
                setPost(prevState => ({ ...prevState, text: value }));
                break;
            default:
                break;
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >

                <Title text='Add New Post' />

                <AppImagePicker
                    image={post.image}
                    setImage={(image: string) => handleChange('image', image)}
                    previewSize={200}
                />

                <TextInput
                    multiline
                    numberOfLines={5}
                    style={styles.input}
                    autoFocus={false}
                    label="Description"
                    value={post.text}
                    onChangeText={(value: string) => handleChange('text', value)}
                />

                <View style={{ marginTop: 6 }} >
                    <Button
                        title='Submit Post'
                        onPress={handleSubmitPost}
                        disbaled={loading}
                    />
                </View>
            </View>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: 100,
        backgroundColor: theme.colors.lightGrey,
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
    container: {
        flex: 1,
        padding: 20,
    },
})

export default AddPostScreen