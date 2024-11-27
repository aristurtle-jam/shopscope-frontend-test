import React, { useState } from 'react';
import {
    View, FlatList
} from 'react-native';
import styles from './styles';
import { CommunityList, Post } from '../../components';
import AppHeader from '../../components/AppHeader';


const MyPosts = (props: any) => {
    const item = props.route.params.posts
    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'My Posts'} transparent={false} />
            <View style={[styles.container,{padding: 20, marginTop: 50}]}>
                <FlatList showsVerticalScrollIndicator={false} data={item} renderItem={({item}) => <Post item={item} detail={false} myProfile={true} />}/>
            </View>
        </View>
    )
};

export default MyPosts;
