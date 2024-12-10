import React, { useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import { CommunityList } from '../../components';


const CommunityScreen = () => {

    return (
        <View style={styles.container}>
            {/* <CommunityList/> */}
            <Text style={{fontSize: 30, fontWeight: 'bold'}}> COMING SOON 🎉</Text>
        </View>
    )
};

export default CommunityScreen;
