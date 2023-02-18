import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllPostsScreen from '../Screens/AllPosts';
import AddPostScreen from '../Screens/AddPost';
import MyProfileScreen from '../Screens/MyProfile';
import { theme } from '../Core/theme';
import ChatScreen from '../Screens/Chat';

const Tab = createBottomTabNavigator();

const AuthNavigationContainer = () => (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "";
                switch (route.name) {
                    case "All Posts":
                        iconName = "newspaper-outline";
                        break;
                    case "Add Post":
                        iconName = "add-outline";
                        break;
                    case "My Profile":
                        iconName = "person-outline";
                        break;
                    case "Chat":
                        iconName = "chatbubbles-outline"
                        break;
                    default:
                        iconName = "help-outline"
                        break;
                }

                return <Ionicons
                    name={iconName}
                    size={25}
                    color={focused ? theme.colors.iconFocused : color}
                    style={{ marginTop: 10 }}
                />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen
                name="All Posts"
                component={AllPostsScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Add Post"
                component={AddPostScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="My Profile"
                component={MyProfileScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
        </Tab.Navigator>

    </NavigationContainer>
)

export default AuthNavigationContainer;