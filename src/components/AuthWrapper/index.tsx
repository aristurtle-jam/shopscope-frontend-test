import React from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo/shopscope.svg';
import styles from './styles';
import BackButton from '../../assets/icons/back.svg'
import { NavigationService } from '../../config';

const AuthWrapper = ({ children, header }: { children: React.ReactNode, header: boolean }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, marginTop: 20 }}>
                {header && <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <BackButton />
                </TouchableOpacity>}
                <View style={styles.logo}>
                    <Logo />
                </View>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
         </SafeAreaView>
    );
};

export default AuthWrapper;
