import { Text, View } from 'react-native';
import LottieAnimation from '../Shared/Lottie';

const AllPostsScreen = () => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>All Posts</Text>
            <LottieAnimation />
        </View>
    );
}

export default AllPostsScreen