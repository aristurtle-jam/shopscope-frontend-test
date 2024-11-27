import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.type.extraBold,
        fontWeight: 'bold',
        fontSize: Fonts.size.size_22,
        marginTop: 24
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    },
    headerText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.size_18
    },
    cartButton: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        backgroundColor: 'black',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 90
    },
    cartButtonText: {
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_14,
        color: Colors.WHITE
    }
});

export default styles;
