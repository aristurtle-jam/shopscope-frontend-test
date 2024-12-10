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
        backgroundColor: Colors.BACKGROUND,
        width: '100%'
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
    },
    footerContainer: {
        height: '18%',
        width: '100%',
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    row: {
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedItemLabel: {
        fontWeight: 'bold'
    },
    checkoutButton: {
        width: '90%',
        backgroundColor: Colors.EERIE_BLACK,
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default styles;
