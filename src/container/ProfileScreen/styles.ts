import { StyleSheet, Platform } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE_BACKGROUND
    },
    profileHeader: {
        width: '100%',
    },
    profileContainer: {
        padding: 20,
    },
    profileCard: {
        width: '100%',
        height: 300,
        backgroundColor: Colors.WHITE,
        borderRadius: 12,
        justifyContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        overflow: 'hidden',
    },
    profileCardWrapper: {
        borderRadius: 12,
        // overflow: 'hidden', // Ensure content inside is clipped by border radius
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderWidth: 1,
        borderColor: Colors.GREY,
    },
    profileDetailView: {
        height: '60%',
        width: '100%',
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
    },
    profileImageView: {
        position: 'absolute',
        alignSelf: 'center',
        top: -50,
    },
    profileImage: {
        height: 96,
        width: 96,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: Colors.WHITE,
    },
    cameraIconView: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: -5,
    },
    name: {
        fontFamily: Fonts.type.interbold,
        fontSize: Fonts.size.size_16,
        marginTop: 50
    },
    email: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_16,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    box: {
        width: 145,
        height: 55,
        backgroundColor: Colors.BUTTON_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 16
    },
    boxText: {
        fontFamily: Fonts.type.interbold,
        fontSize: Fonts.size.size_17
    },
    boxLabel: {
        position: 'absolute',
        backgroundColor: 'black',
        top:-5,
        borderRadius: 90,
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    boxLabelText: {
        color: Colors.WHITE,
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.size_12

    },
    sectionView: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionTitleLabel: {
        fontFamily: Fonts.type.interbold,
        fontSize: Fonts.size.size_18
    },
    sectionActionLabel: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_14
    },
    followButton: {
        backgroundColor: 'black',
        width: '90%',
        padding: 10,
        marginTop: 15,
        borderRadius: 20
    },
    followButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
    unfollowButton: {
        backgroundColor: Colors.TEXT_GREY,
        width: '90%',
        padding: 10,
        marginTop: 15,
        borderRadius: 20
    }
});

export default styles;
