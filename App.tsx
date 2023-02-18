import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllPostsScreen from './src/components/Screens/AllPosts';
import AddPostScreen from './src/components/Screens/AddPost';
import MyProfileScreen from './src/components/Screens/MyProfile';
import UnAuthScreen from './src/components/Screens/UnAuthScreen';
import { theme } from './src/components/Core/theme';

const Tab = createBottomTabNavigator();
const App = () => {
  const [accessToken, setAccessToken] = useState<string>("");


  return accessToken ? <AuthNavContainer /> : <UnAuthNavContainer />
}

const UnAuthNavContainer = () => <UnAuthScreen />

const AuthNavContainer = () => (
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

export default App
