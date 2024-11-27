import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postView: {
        backgroundColor: Colors.WHITE,
        width: '90%',
        height: 361,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.BUTTON_GREY,
    },
    profileView: {
        padding: 12,
        // marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BUTTON_GREY,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImageUploadView: {
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.BUTTON_GREY,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        height: 45,
        width: 45,
        borderRadius: 11
    },
    profileName: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16,
        marginLeft: 9
    },
    uploadImageView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    postImage: {
        width: 180,
        height: 180,
        borderRadius: 10,
    },
    crossIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 25,
        right: 5
    },
    productImageView: {
        width: '90%',
        alignSelf: 'center',
    },
    bottomButton: {
        backgroundColor: 'black', // Example background color
        paddingVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        width: '90%',
        bottom: 10,
        borderRadius: 30
    },
    bottomButtonText: {
        color: 'white', // Example text color
        fontSize: Fonts.size.size_16,
        fontFamily: Fonts.type.semiBold
    },
});

export default styles;
