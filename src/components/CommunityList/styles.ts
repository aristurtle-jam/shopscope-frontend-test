import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tileStyle: {
       width: '100%',
       backgroundColor: Colors.WHITE,
       borderRadius: 10,
       shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    profileName: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16,
        marginLeft: 14
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7.5,
        height: 40,
        width: 90,
        borderRadius: 20
    },
    removeButton: {
        backgroundColor: '#AAAAAA',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 7.5,
        height: 40,
        width: 90,
        borderRadius: 20
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_14
    }
});

export default styles;
