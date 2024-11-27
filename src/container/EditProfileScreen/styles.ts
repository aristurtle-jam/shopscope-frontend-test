import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        padding: 20,
        paddingTop: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.78,
        elevation: 4,
        backgroundColor: Colors.WHITE,
        borderRadius: 10
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
    view: {
        padding: 20,
        paddingVertical: 80
    },
    button: {
        width: '100%',
        padding: 10,
        borderRadius: 30,
        marginTop: 42
    }
});

export default styles;
