import React, { useState } from 'react';
import {
    ScrollView,
    View,
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import { Post } from '../../components';
import { useNavigation } from '@react-navigation/native';


const PostDetailScreen = (props: any) => {
    const myProfile = props.route.params.myProfile
    const post = props.route.params.post
    const  postLikes= props.route.params.postLikes
    const  isLikedByUser= props.route.params.myLike
    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Post Detail'} transparent={false} />
            <ScrollView style={styles.container}>
                <View style={styles.postContainer}>
                    <Post item={post} detail={true} myProfile={myProfile} postLikes={postLikes} myLike={isLikedByUser} />
                </View>
            </ScrollView>
        </View>
    )
};

export default PostDetailScreen;
