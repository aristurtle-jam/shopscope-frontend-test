import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Colors from '../../theme/Colors';
import { CommunityScreen, PostsScreen } from '..';
import Fonts from '../../theme/Fonts';

const Tab = createMaterialTopTabNavigator();


const DiscoverScreen = () => {

    const navigation = useNavigation();
    const routeName = getFocusedRouteNameFromRoute(navigation.getState()?.routes[navigation.getState()?.index]);


    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={false} rightComponent={false} share={false} setting={false} title={routeName === 'Posts' ? 'Post' : 'Community'} transparent={true} />
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: Fonts.size.size_14, fontFamily: Fonts.type.semiBold },
                    tabBarItemStyle: { alignSelf: 'center' },
                    tabBarIndicatorStyle: {
                        height: '100%',
                        backgroundColor: 'black',
                        borderBottomWidth: 1.5,
                        borderBottomColor: 'transparent',
                        borderRadius: 40,
                    },
                    tabBarStyle: {
                        width: '90%',
                        alignSelf: 'center',
                        borderRadius: 40,
                        borderColor: Colors.BUTTON_GREY,
                        borderWidth: 1
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'black',
                }}>
                <Tab.Screen name="Posts" component={PostsScreen} />
                <Tab.Screen name="Community" component={CommunityScreen} />
            </Tab.Navigator>
        </View>
    )
};

export default DiscoverScreen;
