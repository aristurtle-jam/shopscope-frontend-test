import React, { useState, useEffect } from 'react';
import {
    View, Image, Text, FlatList, TouchableOpacity, Modal, Alert, TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import Images from '../../theme/Images';
import LikeIcon from '../../assets/icons/like-icon.svg'
import LikedIcon from '../../assets/icons/liked-icon.svg'
import ShareIcon from '../../assets/icons/share-icon.svg'
import { NavigationService } from '../../config';
import MenuIcon from '../../assets/icons/post-menu-icon.svg'
import { Menu } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { requestDeletePost, requestPostDisike, requestPostLike } from '../../ducks/posts';
import DataHandler from '../../utils/DataHandler';
import { timeAgo } from '../../utils/Util';


const Post = ({ item, detail, myProfile, postLikes, myLike }: { item: any, detail: boolean, myProfile: boolean, postLikes?: number, myLike?: boolean }) => {

    const dispatch = useDispatch()

    let post = item
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [likes, setLikes] = useState(detail ? postLikes : post.likes)
    const [isLikedByUser, setIsLikedByUser] = useState(detail ? myLike : post.isLikedByUser)
    const currentUserId = useSelector((state: any) => state.profile.myProfile._id)
    const otherUser = post.customerId._id !== currentUserId

    const handleDeleteItem = () => {
        dispatch(requestDeletePost({ id: post._id }));
        hideModal()
    };
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const renderSmallImageItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 10 }} />
        );
    };

    const onPressEditPost = () => {
        closeMenu()
        NavigationService.navigate('EditPostScreen', { edit: true, postDetails: post })
    }

    const onPressDeletePost = () => {
        closeMenu()
        setModalVisible(true)
    }

    const hideModal = () => {
        setModalVisible(false);
    };

    const likePost = () => {
        //FUNTION FOR LIKE POST
        dispatch(requestPostLike(post._id))
        setLikes((prev: number) => prev + 1)
        setIsLikedByUser(true)
    }

    const dislikePost = () => {
        //FUNTION FOR DISLIKE POST
        dispatch(requestPostDisike(post._id))
        setLikes((prev: number) => prev - 1)
        setIsLikedByUser(false)

    }

    return (
        <>
            <TouchableOpacity disabled={detail} onPress={() => NavigationService.navigate('PostDetailScreen', { myProfile: myProfile, post: post, postLikes: likes, myLike: isLikedByUser })} style={styles.container}>
                <View style={styles.profileView}>
                    <TouchableOpacity onPress={() => otherUser ? NavigationService.navigate('OtherUsersProfileScreen', { otherUser: otherUser, userInfo: post.customerId._id }) : NavigationService.navigate('ProfileScreen')} style={styles.profileTile}>
                        {
                            post.customerId.profile && (post.customerId.profile.includes('https://') || post.customerId.profile.includes('http://')) ?
                                <Image source={{ uri: post.customerId.profile }} style={styles.profileImage} /> :
                                <View style={[styles.profileImage, { backgroundColor: 'black', justifyContent: 'center' }]}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>{post.customerId.profile}</Text>
                                </View>
                        }
                        {/* <Image source={{ uri: post.customerId.profile }} resizeMode='cover' style={styles.profileImage} /> */}
                        <View style={styles.profileLabelView}>
                            <Text style={styles.profileName}>{post.customerId.firstName} {post.customerId.lastName}</Text>
                            <Text style={styles.postTime}>{timeAgo(post.createdAt)}</Text>
                        </View>
                    </TouchableOpacity>
                    {myProfile === true && <View style={styles.menuIcon}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<TouchableOpacity onPress={openMenu}><MenuIcon /></TouchableOpacity>}
                        >
                            <Menu.Item onPress={onPressEditPost} title="Edit Post" />
                            <Menu.Item onPress={onPressDeletePost} title="Delete Post" />
                        </Menu>
                    </View>}
                </View>
                <Image source={{ uri: post.thumbNail }} resizeMode='cover' style={styles.postImage} />
                <FlatList
                    data={post.products}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSmallImageItem}
                    ItemSeparatorComponent={() => <View style={{ marginLeft: 10 }} />}
                    contentContainerStyle={{ marginTop: 10, alignItems: 'center', width: '100%' }}
                />
                <View style={styles.actionView}>
                    <TouchableOpacity onPress={() => isLikedByUser ? dislikePost() : likePost()} style={styles.likeView}>
                        {isLikedByUser === true ? <LikedIcon height={25} width={25} /> : <LikeIcon height={25} width={25} />}
                        <Text style={styles.likesText}>{likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ShareIcon height={25} width={25} />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Delete Post</Text>
                            <Text style={styles.modalText}>Are you sure you want to Delete this Post?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={hideModal}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={{ width: '10%' }} />
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={handleDeleteItem}>
                                    <Text style={styles.textStyle}>Delete Post</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
};

export default Post;
