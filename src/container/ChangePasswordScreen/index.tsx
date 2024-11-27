import React, { useState } from 'react';
import {
    View
} from 'react-native';
import styles from './styles';
import { AuthTextInput } from '../../components';
import PasswordIcon from '../../assets/icons/password.svg';
import AppHeader from '../../components/AppHeader';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { requestChangePassword } from '../../ducks/profile';



const ChangePasswordScreen = () => {

    const dispatch = useDispatch()

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChangeCurrentPassword = (val: string) => {
        setCurrentPassword(val)
    }
    const onChangeNewPassword = (val: string) => {
        setNewPassword(val)
    }
    const onChangeConfirmPassword = (val: string) => {
        setConfirmPassword(val)
    }


    const onSavePress = () => {
        const payload = {
            password : currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }  
        dispatch(requestChangePassword(payload))
    }

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Change Password'} transparent={false} />
            <View style={styles.view}>
                <View style={styles.card}>
                <AuthTextInput icon={PasswordIcon} placeholder={'Current Password'} value={currentPassword} onChangeText={onChangeCurrentPassword} inputStyle={{ marginBottom: 14 }} password />
                <AuthTextInput icon={PasswordIcon} placeholder={'New Password'} value={newPassword} onChangeText={onChangeNewPassword} inputStyle={{ marginBottom: 14 }} password />
                <AuthTextInput icon={PasswordIcon} placeholder={'Confirm Password'} value={confirmPassword} onChangeText={onChangeConfirmPassword} inputStyle={{ marginBottom: 14 }} password />
                </View>
                <Button textColor='white' mode="contained" onPress={() => onSavePress()} buttonColor={'black'} style={styles.button}>
                    SAVE
                </Button>
            </View>
        </View>
    )
};

export default ChangePasswordScreen;
