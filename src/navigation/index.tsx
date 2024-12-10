import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationService } from '../config';
import { CartScreen, ChangePasswordScreen, CheckoutScreen, CreateBlogScreen, DiscoverScreen, EditPostScreen, EditProfileScreen, FollowersScreen, FollowingScreen, ForgotPasswordScreen, HomeScreen, LikesScreen, LoginScreen, MyPosts, NotificationScreen, OrderDetailScreen, OrdersScreen, PostDetailScreen, ProductDetail, ProductListScreen, ProfileScreen, ResetPasswordScreen, SettingsScreen, SignupScreen, WishlistScreen } from '../container';
import OTPScreen from '../container/OTPScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../assets/icons/home.svg';
import WishlistIcon from '../assets/icons/wishlist.svg';
import DiscoverIcon from '../assets/icons/discover.svg';
import ProfileIcon from '../assets/icons/user-profile.svg';
import CreatePostIcon from '../assets/icons/create-post.svg';
import TabButton from '../components/TabButton';
import styles from './styles';
import Colors from '../theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { requestMyProfile } from '../ducks/profile';


// init stack
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const ProductDetailsStack = createNativeStackNavigator();


const AuthNavigator = () => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{ tabBarStyle: styles.tabBarStyle, headerShown: false }}>
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarButton: (props) => (
          <TabButton focused={props.accessibilityState?.selected} onPress={props.onPress} label="Home">
            <HomeIcon />
          </TabButton>
        ),
      }}
    />
    <Tab.Screen
      name="WishlistScreen"
      component={WishlistScreen}
      options={{
        tabBarButton: (props) => (
          <TabButton focused={props.accessibilityState?.selected} onPress={props.onPress} label="Wish List">
            <WishlistIcon />
          </TabButton>
        ),
      }}
    />
    <Tab.Screen
      name="CreateBlog"
      component={CreateBlogScreen}
      options={{
        tabBarStyle: { display: 'none' },
        tabBarLabel: '',
        tabBarShowLabel: false,
        tabBarIcon: () => <CreatePostIcon />,
      }}
    />
    <Tab.Screen
      name="DiscoverScreen"
      component={DiscoverScreen}
      options={{
        tabBarButton: (props) => (
          <TabButton focused={props.accessibilityState?.selected} onPress={props.onPress} label="Discover">
            <DiscoverIcon />
          </TabButton>
        ),
      }}
    />
    <Tab.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        tabBarButton: (props) => (
          <TabButton focused={props.accessibilityState?.selected} onPress={props.onPress} label="Profile">
            <ProfileIcon />
          </TabButton>
        ),
      }}
    />
  </Tab.Navigator>
);

const MainAppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, drawerActiveBackgroundColor: Colors.BUTTON_GREY, drawerLabelStyle: { color: 'black' } }}>
      <Drawer.Screen name="Home" component={MainTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Orders" component={OrdersScreen} />

    </Drawer.Navigator>
  )
}

const MainStack = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestMyProfile())
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <Stack.Navigator initialRouteName="MainAppStack" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainAppStack"
          component={MainAppStack}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
        />
        <Stack.Screen
          name="LikesScreen"
          component={LikesScreen}
        />
        <Stack.Screen
          name="FollowersScreen"
          component={FollowersScreen}
        />
        <Stack.Screen
          name="FollowingScreen"
          component={FollowingScreen}
        />
        <Stack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
        />
        <Stack.Screen
          name="MyPostsScreen"
          component={MyPosts}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
        />
        <Stack.Screen
          name="EditPostScreen"
          component={EditPostScreen}
        />
        <Stack.Screen
          name="OtherUsersProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          // options={{
          //   headerBackVisible: true,
          //   headerShown: true,
          //   headerTitle: 'Cart',
          //   headerBackTitle: 'Back',
          //   headerStyle: { backgroundColor: Colors.BACKGROUND },
          // }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
        />
         <Stack.Screen
          name="OrderDetailScreen"
          component={OrderDetailScreen}
          // options={{
          //   headerBackVisible: true,
          //   headerShown: true,
          //   headerTitle: 'Checkout',
          //   // headerBackTitle: 'Back',
          //   headerStyle: { backgroundColor: Colors.BACKGROUND },
          // }}
        />
      </Stack.Navigator>
    </SafeAreaView>

  )
}


const AppContainer = () => {
  const isLoggedIn = useSelector((state: any) => state.auth.userLoggedIn)


  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor='black'
      />
      <NavigationContainer
        ref={NavigationService.navigationRef}
      >

        {isLoggedIn ? <MainStack /> : <AuthNavigator />}

      </NavigationContainer>
    </View>
  );
};

export default AppContainer;
