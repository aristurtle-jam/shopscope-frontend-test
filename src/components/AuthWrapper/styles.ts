import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        // justifyContent: 'space-between',
    },
    logo: {
        paddingBottom: 20,
        alignSelf: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        alignSelf: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        // position: 'absolute', // Position it absolutely
        // bottom: 0, // Place it at the bottom
        // left: 0, // Align it with the left edge
    },
});

export default styles;
