import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Images from '../../theme/Images';
import CameraIcon from '../../assets/icons/camera.svg'
import { Post } from '../../components';
import { NavigationService } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import posts, { requestGetMyPosts, requestGetOthersPosts } from '../../ducks/posts';
import { useFocusEffect } from '@react-navigation/native';
import { requestFollowUser, requestMyProfile, requestOthersProfile, requestUnfollowUser } from '../../ducks/profile';


const ProfileScreen = (props: any) => {
    const dispatch = useDispatch()
    let others = props.route?.params?.otherUser
    let userInfo = props.route?.params?.userInfo
    const othersProfile = useSelector((state: any) => state.profile.othersProfile)
    const profile = useSelector((state: any) => state.profile.myProfile)
    const myPosts = useSelector((state: any) => state.posts.myPosts)
    const othersPosts = useSelector((state: any) => state.posts.othersPosts)
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    let profileImage = others ? othersProfile.profile : profile.profile

    const amIFollowing = othersProfile.followers && othersProfile.followers.includes(profile._id)


    useFocusEffect(

        React.useCallback(() => {
            let payload = {
                page: 1,
                limit: 5
            }
            others ? dispatch(requestGetOthersPosts({ pagination: payload, id: userInfo })) : dispatch(requestGetMyPosts(payload));
            others ? dispatch(requestOthersProfile({ id: userInfo })) : dispatch(requestMyProfile())
        }, [others])
    );

    // useEffect(() => {
    //     let payload = {
    //         page: 1,
    //         limit: 5
    //     }
    //     dispatch(requestGetMyPosts(payload))
    // }, [])

    const loadMorePosts = () => {
        let payload = {
            page: page + 1,
            limit: 5
        }
        dispatch(requestGetMyPosts(payload))
        setPage(page + 1);
    }

    const onRefresh = () => {
        setRefreshing(true);
        let payload = {
            page: 1,
            limit: 5
        }
        dispatch(requestGetMyPosts(payload))
        setRefreshing(false);
        setPage(1);
    }

    const onPressFollow = () => {
        const payload = {
            id: othersProfile._id
        }
        dispatch(requestFollowUser(payload))
    }

    const onPressUnfollow = () => {
        const payload = {
            id: othersProfile._id
        }
        dispatch(requestUnfollowUser(payload))
    }


    return (
        <View style={{ flex: 1 }}>
            <AppHeader menu={false} back={others ? true : false} rightComponent={others ? false : true} share={false} setting={others ? false : true} title={others ? `${othersProfile.firstName} ${othersProfile.lastName}` : 'Profile'} transparent={true} />
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <View style={styles.profileContainer}>
                    <View style={styles.profileCardWrapper}>
                        <ImageBackground resizeMode='stretch' source={Images.profileCover} style={[styles.profileCard, others && {height: 380}]}>
                            <View style={styles.profileDetailView}>
                                <View style={styles.profileImageView}>
                                    {
                                        profileImage && (profileImage.includes('https://') || profileImage.includes('http://')) ?
                                            <Image source={{ uri: profileImage }} style={styles.profileImage} /> :
                                            <View style={[styles.profileImage, { backgroundColor: 'black', justifyContent: 'center' }]}>
                                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{profileImage}</Text>
                                            </View>
                                    }
                                    {/* <TouchableOpacity style={styles.cameraIconView}>
                                        <CameraIcon />
                                    </TouchableOpacity> */}
                                </View>
                                <Text style={styles.name}>{others ? othersProfile.firstName + " " + othersProfile.lastName : profile.firstName + " " + profile.lastName}</Text>
                                <Text style={styles.email}>{others ? othersProfile.email : profile.email}</Text>
                                <View style={styles.boxContainer}>
                                    <TouchableOpacity disabled onPress={() => NavigationService.navigate('FollowersScreen')} style={styles.box}>
                                        <View style={styles.boxLabel}>
                                            <Text style={styles.boxLabelText}>Follower</Text>
                                        </View>
                                        <Text style={styles.boxText}>{others ? othersProfile.followersLength : profile.followersLength}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled onPress={() => NavigationService.navigate('FollowingScreen')} style={styles.box}>
                                        <View style={styles.boxLabel}>
                                            <Text style={styles.boxLabelText}>Following</Text>
                                        </View>
                                        <Text style={styles.boxText}>{others ? othersProfile.followingLength : profile.followingLength}</Text>
                                    </TouchableOpacity>
                                </View>
                                {others && <TouchableOpacity onPress={amIFollowing ? onPressUnfollow : onPressFollow} style={amIFollowing ? styles.unfollowButton : styles.followButton}>
                                    <Text style={styles.followButtonText}>{amIFollowing ? 'Unfollow' : 'Follow'}</Text>
                                </TouchableOpacity>}
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.sectionView}>
                    <Text style={styles.sectionTitleLabel}>{others ? 'Posts' : 'My Posts'}</Text>
                    {/* <TouchableOpacity onPress={() => NavigationService.navigate('MyPostsScreen', { posts: myPosts.posts })}>
                        <Text style={styles.sectionActionLabel}>View All</Text>
                    </TouchableOpacity> */}
                </View>

                <View style={{ padding: 20 }}>
                    <FlatList
                        onEndReached={loadMorePosts}
                        onEndReachedThreshold={0.1}
                        showsVerticalScrollIndicator={false}
                        data={others ? othersPosts.posts : myPosts.posts}
                        renderItem={(item) => <Post item={item.item} detail={false} myProfile={others ? false : true} />} />
                </View>
            </ScrollView>
        </View>
    )
};

export default ProfileScreen;
