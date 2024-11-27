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
    cardContainer: {
        flexDirection: 'row',
        padding: 8,
        margin: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: Colors.WHITE,
        alignItems: 'center'
    },
    imageContainer: {
		borderRadius: 5,
        backgroundColor: 'red'
	},
    notificationText: {
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.size_15,
        marginLeft: 10
    }


});

export default styles;
