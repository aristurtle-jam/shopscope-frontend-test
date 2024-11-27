import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    header: {
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10
    },
    text: {
        fontFamily: Fonts.type.semiBold,
        padding: 15,
        fontSize: Fonts.size.size_18
    },
    textInputContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputField: {
        width: '80%',
        paddingHorizontal: 20,
        borderRadius: 50,
        backgroundColor: Colors.WHITE,
        height: 46,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    searchButton: {
        backgroundColor: 'black',
        width: 46,
        height: 46,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'cover'
    },
    swiperCancelStyle: {
        position: 'absolute',
        zIndex: 2,
        bottom: 30,
        left: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    swiperWishlistStyle: {
        position: 'absolute',
        zIndex: 2,
        bottom: 30,
        right: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }

});

export default styles;
