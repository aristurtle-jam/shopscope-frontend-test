import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        // height: 80,
        width: '100%',
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12.35,
        elevation: 2,
        borderRadius: 10
    },
    tile: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    logoutTile: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    view: {
        padding: 20,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: '#E1E1E1'
    },
    label: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_14
    },

    //MODAL

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    noButton: {
        backgroundColor: Colors.GREY,
        paddingVertical: 10,
        paddingHorizontal: 50
    },
    yesButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_18,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTitle: {
        fontFamily: Fonts.type.extraBold,
        fontSize: Fonts.size.size_18,
        marginBottom: 15,
        textAlign: 'center',
    }
});

export default styles;
