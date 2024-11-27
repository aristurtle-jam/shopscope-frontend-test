import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Post } from '../../components';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import { NavigationService } from '../../config';


const NotificationScreen = () => {
    const dispatch = useDispatch()
    const notifications = useSelector((state: any) => state.profile.notifications);
    const renderItem = ({item}: {item: any}) => {
       return <TouchableOpacity onPress={() => NavigationService.navigate('OtherUsersProfileScreen', { otherUser: true, userInfo: item.customerId })} style={styles.cardContainer}>
			<Image source={{uri: item.profileImage}} height={50} width={50} resizeMode='cover' style={styles.imageContainer}/>
            <Text style={styles.notificationText}>{item.message}</Text>
		</TouchableOpacity>
    }

    const memoizedFlatList = useMemo(() => {
        return (
            <FlatList
                data={notifications.notifications}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
            />
        );
    }, [notifications]); // Only re-render if allPosts.posts change


    return (
        <View style={{ flex: 1 }}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Notifications'} transparent={false}/>
            {memoizedFlatList}
        </View>
    )
};

export default NotificationScreen