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
import EmailIcon from '../../assets/icons/email.svg';
import PasswordIcon from '../../assets/icons/password.svg'
import { Button } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import ForgotPasswordImage from '../../assets/images/password.svg';
import { useDispatch } from 'react-redux';
import { requestForgotPassword } from '../../ducks/auth';

const ForgotPasswordScreen = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');

    const onChangeEmail = (val: string) => {
        setEmail(val.toLocaleLowerCase())
    }

    const onPress = () => {
        dispatch(requestForgotPassword({email, resend: false}))
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
                            Forgot Your Password?
                        </Text>
                        <Text style={styles.subtitle}>
                            Don’t worry Resetting your password is easy. just type in the email you registered to Shopscope
                        </Text>

                        <AuthTextInput icon={EmailIcon} placeholder={'Email'} value={email} onChangeText={onChangeEmail} keyBoardType='email-address' inputStyle={{ marginBottom: 14, width: '100%' }} />
                        <Button textColor='white' mode="contained" onPress={onPress} buttonColor={'black'} style={styles.button}>
                            SEND NOW
                        </Button>
                    </View>
                </AuthWrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default ForgotPasswordScreen;
