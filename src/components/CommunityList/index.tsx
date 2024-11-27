import React, { useState } from 'react';
import {
    View, Image, Text, FlatList, TouchableOpacity
} from 'react-native';
import styles from './styles';
import Images from '../../theme/Images';
import LikeIcon from '../../assets/icons/like-icon.svg'
import ShareIcon from '../../assets/icons/share-icon.svg'


const CommunityList = ({following}:{following: boolean}) => {

    const data = [1, 2, 3]

    const renderTile = () => {
        return (
            <View style={styles.tileStyle}>
                <View style={styles.profileView}>
                    <Image source={Images.profileImage} style={styles.profileImage} />
                    <Text style={styles.profileName}>Darlene Robertson</Text>
                </View>
                <TouchableOpacity style={following ? styles.removeButton : styles.button}>
                    <Text style={styles.buttonText}>{following ? 'Remove' : 'Follow'}</Text>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View style={styles.container}>

            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTile}
                contentContainerStyle={{ padding: 20 }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />


        </View>
    )
};

export default CommunityList;
