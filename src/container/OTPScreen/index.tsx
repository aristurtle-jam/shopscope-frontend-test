import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
    Alert
} from 'react-native';
import { AuthTextInput, AuthWrapper } from '../../components';
import styles from './styles';
import EmailIcon from '../../assets/icons/email.svg';
import PasswordIcon from '../../assets/icons/password.svg'
import { Button } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import OTPImage from '../../assets/images/email.svg';
import OtpInput from 'react-native-animated-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { requestForgotPassword, requestVerifyOTP } from '../../ducks/auth';

const OTPScreen = () => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    const otpEmail = useSelector((state: any) => state.auth.otpEmail)

    const onChangeOTP = (val: string) => {
        setOtp(val)
    }

    const onSend = (code: string) => {
        let urlParam = otpEmail + "/" + code
        dispatch(requestVerifyOTP({ urlParam, code }))
    }

    const onSendNow = (code: string) => {
        let urlParam = otpEmail + "/" + code.toString()
        dispatch(requestVerifyOTP({ urlParam }))
    }

    const onResend = () => {
        setOtp('');
        dispatch(requestForgotPassword({ email: otpEmail, resend: true }))
    }

    useEffect(() => {
        // Additional handler to ensure OtpInput reacts to otp state change
        if (otp === '') {
            // Optionally force focus on the input after clear
            // Refocus logic if the component supports it
        }
    }, [otp]);


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
                        <OTPImage />
                        <Text style={styles.title}>
                            OTP Verification
                        </Text>
                        <Text style={styles.subtitle}>
                            We just sent you OTP at
                        </Text>
                        <Text style={styles.subtitleBlack}>
                            {otpEmail}
                        </Text>
                        <OtpInput
                            value={otp}
                            otpCount={4}
                            autoFocus={false}
                            onCodeFilled={(code: number) => {
                                // Alert.alert('Notification', `OTP is ${code}`);
                                let codeStr = code.toString().padStart(4, '0');
                                setTimeout(() => onSend(codeStr), 1000)
                            }}
                            onCodeChanged={onChangeOTP}
                        />
                        <Button textColor='white' mode="contained" onPress={() => onSend(otp)} buttonColor={'black'} style={styles.button}>
                            CONFIRM
                        </Button>
                        <Button mode='text' textColor='black' onPress={onResend}>
                            RE-SEND
                        </Button>
                    </View>
                </AuthWrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default OTPScreen;
