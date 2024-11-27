import React, { useState } from 'react';
import {
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Text,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import { requestLogout, successLogout } from '../../ducks/auth';
import { useDispatch } from 'react-redux';



const SettingsScreen = () => {

    const dispatch = useDispatch()
    const [closeAccountModalVisible, setCloseAccountModalVisible] = useState(false)
    const [logoutModalVisible, setLogoutModalVisible] = useState(false)

    const hideModal = () => {
        setCloseAccountModalVisible(false);
        setLogoutModalVisible(false)
    };

    const onPressLogout = () => {
        dispatch(requestLogout())
        hideModal()
    }




    const data = [
        { name: 'Wishlist', screen: 'WishlistScreen' },
        { name: 'Edit profile', screen: 'EditProfileScreen' },
        { name: 'My Wallet', screen: 'MyWalletScreen' },
        { name: 'Change password', screen: 'ChangePasswordScreen' },
        { name: 'Terms & Conditions', screen: 'TermsConditionScreen' },
        { name: 'Privacy Policy', screen: 'PrivacyPolicyScreen' },
        { name: 'FAQ', screen: 'FAQScreen' },
        { name: 'Close your account' }]

    const renderItem = ({ item }: { item: { name: string, screen: string } }) => {
        return (
            <TouchableOpacity
                onPress={() => item.screen ? NavigationService.navigate(item.screen) : setCloseAccountModalVisible(true)}
                style={styles.tile}

            >
                <Text style={styles.label}>{item.name}</Text>
                <ChevronRight />

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Settings'} transparent={false} />
            <View style={styles.view}>
                <View style={styles.card}>
                    <FlatList ItemSeparatorComponent={() => <View style={styles.separator} />} data={data} renderItem={renderItem} scrollEnabled={false} />
                </View>
                <View style={[styles.card, { marginTop: 20 }]}>
                    <TouchableOpacity
                        onPress={() => setLogoutModalVisible(true)}
                        style={styles.tile}
                    >
                        <View style={styles.logoutTile}>
                            <LogoutIcon />
                            <Text style={[styles.label, { color: Colors.RED, marginLeft: 10 }]}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={closeAccountModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setCloseAccountModalVisible(!closeAccountModalVisible);
                }}>
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Are you sure you want to close your account?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.noButton]}
                                    onPress={hideModal}>
                                    <Text style={styles.textStyle}>NO</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.yesButton]}
                                    onPress={hideModal}>
                                    <Text style={styles.textStyle}>YES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={logoutModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setLogoutModalVisible(!closeAccountModalVisible);
                }}>
                <TouchableWithoutFeedback onPress={hideModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>Are you sure you want to logout from your account?</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.noButton]}
                                    onPress={hideModal}>
                                    <Text style={styles.textStyle}>NO</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.yesButton]}
                                    onPress={onPressLogout}>
                                    <Text style={styles.textStyle}>YES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
};

export default SettingsScreen;
