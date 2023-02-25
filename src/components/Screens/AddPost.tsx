import { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import { TextInput } from 'react-native-paper';
import generalApi from '../../api/GeneralApi';
import postApi from '../../api/PostApi';
import { Post } from '../../utils/types/@Post';
import { theme } from '../Core/theme';
import Button from '../Shared/Button';

import AppImagePicker from '../Shared/ImagePicker';
import Title from '../Shared/Title';


const AddPostScreen = () => {
    const [post, setPost] = useState<Post>({ text: '', image: '' })

    const [errorMsg, setErrorMsg] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleResetForm = () => {
        setPost({ text: '', image: '' });
    }

    const handleSubmitPost = async () => {
        if (!post.text) {
            setErrorMsg("Post description is required!");
            return;
        }

        if (!post.image) {
            setErrorMsg("Post image is required!");
            return;
        }
        setIsLoading(true);

        const res = await postApi.addNewPost({ text: post.text });
        const newPostData: Post | any = res.data;
        if (newPostData._id) {
            const imageUrl = await generalApi.uploadImage(post.image, newPostData._id);

            if (imageUrl) {
                const res = await postApi.editPost(newPostData._id, { image: imageUrl })
                const data: Post | any = res.data;

                if (data._id) {
                    handleResetForm();
                    Alert.alert('New post created successfully!');
                }

            }
        }

        setIsLoading(false);
    }

    const handleChange = (field: 'text' | 'image', value: string) => {
        if (errorMsg) {
            setErrorMsg('');
        }

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

                <Title>
                    Add New Post
                </Title>

                <AppImagePicker
                    image={post.image || ''}
                    setImage={(image: string) => handleChange('image', image)}
                    previewSize={200}
                    disabled={isLoading}
                />
                {errorMsg &&
                    <Text style={{ color: "red", fontSize: 16 }} >
                        {errorMsg}
                    </Text>
                }
                <TextInput
                    multiline
                    numberOfLines={5}
                    style={styles.input}
                    autoFocus={false}
                    label="Description"
                    value={post.text}
                    onChangeText={(value: string) => handleChange('text', value)}
                    disabled={isLoading}
                />

                <View style={{ marginTop: 6 }} >
                    <Button
                        title='Submit Post'
                        onPress={handleSubmitPost}
                        disabled={isLoading}
                        color={isLoading ? theme.colors.darkGrey : undefined}
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