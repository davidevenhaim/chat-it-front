import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllPostsScreen from '../Screens/AllPosts';
import AddEditPostScreen from '../Screens/AddEditPost';
import MyProfileScreen from '../Screens/MyProfile';
import { theme } from '../Core/theme';
import ChatScreen from '../Screens/Chat';
import { AUTH_NAVIGATION_NAMES } from './constants';

const Tab = createBottomTabNavigator();

const AuthNavigationContainer = () => (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "";
                switch (route.name) {
                    case AUTH_NAVIGATION_NAMES.ALL_POSTS:
                        iconName = "newspaper-outline";
                        break;
                    case AUTH_NAVIGATION_NAMES.ADD_POST:
                        iconName = "add-outline";
                        break;
                    case AUTH_NAVIGATION_NAMES.MY_PROFILE:
                        iconName = "person-outline";
                        break;
                    case AUTH_NAVIGATION_NAMES.CHAT:
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
                name={AUTH_NAVIGATION_NAMES.ALL_POSTS}
                component={AllPostsScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={AUTH_NAVIGATION_NAMES.CHAT}
                component={ChatScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={AUTH_NAVIGATION_NAMES.ADD_POST}
                component={AddEditPostScreen}
                options={{
                    title: '',
                    headerShown: false
                }}
            />
            <Tab.Screen
                name={AUTH_NAVIGATION_NAMES.MY_PROFILE}
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