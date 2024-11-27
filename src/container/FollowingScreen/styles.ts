import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
       flex: 1
    },
    textInputContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
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
});

export default styles;
