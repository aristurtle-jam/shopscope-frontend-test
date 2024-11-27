import React, { useCallback, useState } from 'react';
import {
    View, Image, TouchableOpacity
} from 'react-native';
import styles from './styles';
import { AuthTextInput, CommunityList } from '../../components';
import EmailIcon from '../../assets/icons/email.svg';
import NameIcon from '../../assets/icons/profile.svg';
import PhoneIcon from '../../assets/icons/phone.svg';
import CameraIcon from '../../assets/icons/camera.svg'
import AppHeader from '../../components/AppHeader';
import Images from '../../theme/Images';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { requestUpdateProfile } from '../../ducks/profile';



const EditProfileScreen = () => {

    const dispatch = useDispatch()


    const profile = useSelector((state: any) => state.profile.myProfile)
    const [firstName, setFirstName] = useState(profile.firstName)
    const [lastName, setLastName] = useState(profile.lastName)
    const [email, setEmail] = useState(profile.email)
    const [phone, setPhone] = useState(profile.phone)
    const [image, setImage] = useState(profile.profile);



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

    const onImageGalleryClick = useCallback(() => {
        const options: ImagePicker.ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: true,
        };

        ImagePicker.launchImageLibrary(options, (res: ImagePicker.ImagePickerResponse) => {
            if (res.didCancel) {
                console.log('User cancelled')
            } else if (res.errorCode) {
                console.log('ImagePickerError: ', res.errorMessage)
            } else {


                const uri = res.assets[0].uri

                setImage(uri)
            }
        });
    }, [])

    const onPressSave = () => {
        const formData = new FormData();
        formData.append('userProfile', { uri: image, type: 'image/jpeg', name: 'thumbnail.jpg' });
        formData.append(`firstName`, firstName);
        formData.append(`lastName`, lastName);
        formData.append(`email`, email);
        formData.append(`mobileNumber`, phone);

        dispatch(requestUpdateProfile(formData))
    }

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Edit Profile'} transparent={false} />
            <View style={styles.view}>
                <View style={styles.card}>
                    <View style={styles.profileImageView}>
                        <Image source={{uri: image}} style={styles.profileImage} />
                        <TouchableOpacity onPress={onImageGalleryClick} style={styles.cameraIconView}>
                            <CameraIcon />
                        </TouchableOpacity>
                    </View>
                    <AuthTextInput icon={NameIcon} placeholder={'First Name'} value={firstName} onChangeText={onChangeFirstName} inputStyle={{ marginBottom: 14 }} />
                    <AuthTextInput icon={NameIcon} placeholder={'Last Name'} value={lastName} onChangeText={onChangeLastName} inputStyle={{ marginBottom: 14 }} />
                    {/* <AuthTextInput icon={EmailIcon} placeholder={'Last Name'} value={email} onChangeText={onChangeEmail} inputStyle={{ marginBottom: 14 }} /> */}
                    <AuthTextInput icon={PhoneIcon} placeholder={'Mobile number'} value={phone} onChangeText={onChangePhone} inputStyle={{ marginBottom: 14 }} keyBoardType='phone-pad' />
                </View>
                <Button textColor='white' mode="contained" onPress={onPressSave} buttonColor={'black'} style={styles.button}>
                    SAVE
                </Button>
            </View>
        </View>
    )
};

export default EditProfileScreen;
