import React, { useState } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import styles from './styles';
import { CommunityList } from '../../components';
import AppHeader from '../../components/AppHeader';
import SearchIcon from '../../assets/icons/search.svg'


const LikesScreen = () => {

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Likes'} transparent={false} />
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.inputField} placeholder='Search' />
                    <TouchableOpacity style={styles.searchButton}>
                        <SearchIcon />
                    </TouchableOpacity>
                </View>
                <CommunityList />
            </View>
        </View>
    )
};

export default LikesScreen;
