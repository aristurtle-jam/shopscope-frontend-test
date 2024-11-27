import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard
} from 'react-native';
import { AuthTextInput, AuthWrapper } from '../../components';
import styles from './styles';
import PasswordIcon from '../../assets/icons/password.svg'
import { Button } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import ForgotPasswordImage from '../../assets/images/password.svg';
import { useDispatch, useSelector } from 'react-redux';
import { requestResetPassword } from '../../ducks/auth';

const ResetPasswordScreen = () => {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const email = useSelector((state: any) => state.auth.otpEmail)
    const otp = useSelector((state: any) => state.auth.otpCode)


    const onChangePassword = (val: string) => {
        setPassword(val)
    }
    const onChangeConfirmPassword = (val: string) => {
        setConfirmPassword(val)
    }

    const onPress = () => {
       let payload = {
        email,
        otp,
        password,
        confirmPassword
       }
       dispatch(requestResetPassword(payload))
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <AuthWrapper header={true}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <ForgotPasswordImage />
                        <Text style={styles.title}>
                            Reset Password?
                        </Text>
                        <Text style={styles.subtitle}>
                        Please type in your registered email address so we send verification link                        </Text>

                        <AuthTextInput icon={PasswordIcon} placeholder={'Password'} value={password} onChangeText={onChangePassword} inputStyle={{ marginBottom: 14, width: '100%' }} password />
                        <AuthTextInput icon={PasswordIcon} placeholder={'Confirm Password'} value={confirmPassword} onChangeText={onChangeConfirmPassword} inputStyle={{ marginBottom: 14, width: '100%' }} password />

                        <Button textColor='white' mode="contained" onPress={onPress} buttonColor={'black'} style={styles.button}>
                            SEND NOW
                        </Button>
                    </View>
                </AuthWrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default ResetPasswordScreen;
