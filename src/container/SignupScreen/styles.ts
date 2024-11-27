import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.type.extraBold,
        fontWeight: 'bold',
        fontSize: Fonts.size.size_22
    },
    subtitle: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_18,
        color: Colors.TEXT_GREY_2,
        marginTop: 8,
        marginBottom: 20
    },
    forgotPassword: {
        color: Colors.TEXT_GREY_2,
        alignSelf: 'flex-end',
        marginTop: 10
    },
    button: {
        height: 60,
        justifyContent: 'center',
        // marginTop: 30
    },
    footerTextView: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 28,
        alignSelf: 'center'
    },
    greyText: {
        color: Colors.TEXT_GREY_2,
    },
    signup: {
        fontFamily: Fonts.type.extraBold,
        fontWeight: 'bold',
        marginLeft: 10
    }


});

export default styles;
