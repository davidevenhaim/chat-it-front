import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import { TextInput } from 'react-native-paper';
import generalApi from '../../api/GeneralApi';
import postApi from '../../api/PostApi';
import { Post } from '../../utils/types/@Post';
import { theme } from '../Core/theme';
import Button from '../Shared/Button';

import AppImagePicker from '../Shared/ImagePicker';
import Title from '../Shared/Title';

interface Props {
    route: any;
}

const initPost = { text: '', image: '' };

const AddEditPostScreen = ({ route }: Props) => {
    const [post, setPost] = useState<Post>({ ...initPost })

    const [errorMsg, setErrorMsg] = useState<string>('');

    const [existingPostId, setExistingPostId] = useState<false | string>(false);

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

        if (existingPostId) {
            await handleEditPost();
        } else {
            await handleCreatePost();
        }

        setIsLoading(false);
    }
    const handleEditPost = async () => {
        if (existingPostId) {
            const imageUrl = await generalApi.uploadImage(post.image || '', existingPostId);
            if (imageUrl) {
                const res = await postApi.editPost(existingPostId, { image: imageUrl, text: post.text })
                const data: Post | any = res.data;

                if (data._id) {
                    handleResetForm();
                    Alert.alert('New post created successfully!');
                }
            }
        }
    }

    const handleCreatePost = async () => {
        console.log("!@!@")
        const res = await postApi.addNewPost({ text: post.text });
        const newPostData: Post | any = res.data;
        if (newPostData._id) {
            const imageUrl = await generalApi.uploadImage(post.image || '', newPostData._id);

            if (imageUrl) {
                const res = await postApi.editPost(newPostData._id, { image: imageUrl })
                const data: Post | any = res.data;

                if (data._id) {
                    handleResetForm();
                    Alert.alert('New post created successfully!');
                }

            }
        }
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

    const handleGetPost = async () => {
        if (route?.params) {
            const { postId } = route.params;

            const res = await postApi.getPostById(postId);
            if (res.data) {
                const postData = res.data as Post;
                if (postData.image && postData.text && postData._id) {
                    setPost({ image: postData?.image || '', text: postData?.text || '' })
                    setExistingPostId(postData._id);
                }
            }
        }
    }

    useEffect(() => {
        handleGetPost();
    },
        [route.params]
    )

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >

                <Title>
                    {existingPostId ? 'Edit Post' : 'Add New Post'}
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

                <View style={{ marginTop: 6, flexDirection: "row" }} >
                    {existingPostId &&
                        <Button
                            onPress={() => {
                                setPost({ ...initPost });
                                setExistingPostId('');
                            }}
                            title="Cancel"
                            disabled={isLoading}
                            color={isLoading ? theme.colors.darkGrey : theme.colors.error}
                            style={{
                                marginLeft: 5,
                                marginRight: 5,
                            }}
                        />
                    }
                    <Button
                        title={existingPostId ? 'Edit Post' : 'Submit Post'}
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

export default AddEditPostScreen