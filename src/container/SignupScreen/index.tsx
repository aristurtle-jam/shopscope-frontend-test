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
import NameIcon from '../../assets/icons/profile.svg';
import PhoneIcon from '../../assets/icons/phone.svg'
import PasswordIcon from '../../assets/icons/password.svg'
import EmailIcon from '../../assets/icons/email.svg'


import { Button } from 'react-native-paper';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { requestSignup } from '../../ducks/auth';
import { showSnackbar } from '../../ducks/snackbar';




const SignupScreen = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector((state: any) => state.auth.isLoading )
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('+92');

    const handleSignUp = () => {
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
            // Optionally, you can alert the user or set error messages here
            dispatch(showSnackbar({ message: "All fields are required.", type: 'error' }));
            return; // Prevent the dispatch
        }
        const payload = {
            firstName,
            lastName,
            email,
            mobileNumber: selectedCountry + phone,
            password,
            confirmPassword
        };
        dispatch(requestSignup(payload));
    };




    const onChangeFirstName = (val: string) => {
        setFirstName(val)
    }
    const onChangeLastName = (val: string) => {
        setLastName(val)
    }
    const onChangeEmail = (val: string) => {
        setEmail(val)
    }
    const onChangePhone = (val: any) => {
        setPhone(val)
    }
    const onChangePassword = (val: any) => {
        setPassword(val)
    }
    const onChangeConfrimPassword = (val: any) => {
        setConfirmPassword(val)
    }

    const onPressLogin = () => {
        NavigationService.navigate('LoginScreen')
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}>
            <ScrollView scrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <AuthWrapper>
                    <Text style={styles.title}>
                        Hi There Welcome!
                    </Text>
                    <Text style={styles.subtitle}>
                        Please create your account to continue.
                    </Text>
                    <AuthTextInput icon={NameIcon} placeholder={'First Name'} value={firstName} onChangeText={onChangeFirstName} inputStyle={{ marginBottom: 14 }} />
                    <AuthTextInput icon={NameIcon} placeholder={'Last Name'} value={lastName} onChangeText={onChangeLastName} inputStyle={{ marginBottom: 14 }} />
                    <AuthTextInput icon={EmailIcon} placeholder={'Email'} value={email} onChangeText={onChangeEmail} inputStyle={{ marginBottom: 14 }} />
                    <AuthTextInput icon={PhoneIcon} placeholder={'Mobile number'} value={phone} onChangeText={onChangePhone} inputStyle={{ marginBottom: 14 }} keyBoardType='phone-pad' selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}  />
                    <AuthTextInput icon={PasswordIcon} placeholder={'Password'} value={password} onChangeText={onChangePassword} inputStyle={{ marginBottom: 14 }} />
                    <AuthTextInput icon={PasswordIcon} placeholder={'Confirm Password'} value={confirmPassword} onChangeText={onChangeConfrimPassword} inputStyle={{ marginBottom: 14 }} />
                    <Button textColor='white' mode="contained" onPress={handleSignUp} buttonColor={'black'} style={styles.button}>
                        SIGN UP
                    </Button>
                    <View style={styles.footerTextView}>
                        <Text style={styles.greyText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={onPressLogin}>
                            <Text style={styles.signup}>
                                Log In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </AuthWrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};

export default SignupScreen;
