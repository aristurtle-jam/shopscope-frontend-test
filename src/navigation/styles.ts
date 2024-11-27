import { StyleSheet } from 'react-native';
import Fonts from '../theme/Fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#fff'
    },
    btn: {
        width: 50,
        height: 50,
        borderWidth: 4,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    text: {
        fontSize: Fonts.size.size_10,
        textAlign: 'center',
        color: 'white'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderRadius: 25
    },
    tabBarStyle: {
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
