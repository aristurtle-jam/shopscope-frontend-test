import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { AuthTextInput, AuthWrapper } from '../../components';
import styles from './styles';
import EmailIcon from '../../assets/icons/email.svg';
import PasswordIcon from '../../assets/icons/password.svg'
import { Button } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import { showSnackbar } from '../../ducks/snackbar';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../ducks/auth';




const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()


    const onChangeEmail = (val: string) => {
        setEmail(val.toLocaleLowerCase())
    }
    const onChangePassword = (val: string) => {
        setPassword(val)
    }

    const onPressLogin = () => {
        if (!email.trim() || !password.trim() )
        {
            dispatch(showSnackbar({ message: "All fields are required.", type: 'error' }));
        }
        let payload = {email, password}
        dispatch(requestLogin(payload))
    }

    const onPressSignup = () => {

        NavigationService.navigate('SignupScreen')
    }
    const onPressForgotPassword = () => {
        NavigationService.navigate('ForgotPasswordScreen')
    }

    return (
        <AuthWrapper>
            <Text style={styles.title}>
                Welcome to Login
            </Text>
            <Text style={styles.subtitle}>
                Please Login your account
            </Text>

            <AuthTextInput icon={EmailIcon} placeholder={'Email'} value={email} onChangeText={onChangeEmail} keyBoardType='email-address' inputStyle={{ marginBottom: 14 }} />
            <AuthTextInput icon={PasswordIcon} placeholder={'Password'} value={password} onChangeText={onChangePassword} password={true} />
            <TouchableOpacity onPress={onPressForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password</Text>
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}>
                <Button textColor='white' mode="contained" onPress={onPressLogin} buttonColor={'black'} style={styles.button}>
                    LOG IN
                </Button>
            </KeyboardAvoidingView>

            <View style={styles.footerTextView}>
                <Text style={styles.greyText}>
                    Don’t have an account?
                </Text>
                <TouchableOpacity onPress={onPressSignup}>
                    <Text style={styles.signup}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthWrapper>
    )
};

export default LoginScreen;
