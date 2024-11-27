import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const styles = StyleSheet.create({
    scrollViewContentContainer: {
        flexGrow: 1,
        paddingBottom: 20, // Adjust as needed to ensure content is not hidden behind the bottom navigation bar
    },
    container: {
        flex: 1,
        // position: 'relative',
    },
    imageContainer: {
        position: 'relative', // Add relative positioning
        flex: 1,
    },
    image: {
        width: '100%',
        height: 650,
    },
    heartButton: {
        position: 'absolute',
        top: 65,
        right: 10,
        zIndex: 1
    },
    detailView: {
        // position: 'absolute',
        // zIndex: 1,
        // top: 200, // Adjust as needed
        backgroundColor: Colors.WHITE,

        padding: 20,
        flex: 1,
    },
    detailContentContainer: {
        flexGrow: 1,
        paddingBottom: 400,
        flex: 1
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 100 / 2,
    },
    profileName: {
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.size_15,
        marginLeft: 8
    },
    productName: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_18,
        marginTop: 12
    },
    priceView: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    price: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16,
    },
    priceCut: {
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.size_14,
        marginLeft: 8,
        color: Colors.TEXT_GREY_2,
        textDecorationLine: 'line-through'
    },
    buttonsView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    wishButton: {
        backgroundColor: Colors.BUTTON_GREY,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 43,
        borderColor: Colors.TEXT_GREY_2,
        borderWidth: 1
    },
    storeButton: {
        backgroundColor: 'black',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 43,
    },
    wishButtonText: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16
    },
    storeButtonText: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16,
        color: Colors.WHITE
    },
    divider: {
        borderBottomWidth: 0.5,
        width: '100%',
        paddingVertical: 10,
        marginBottom: 10,
        borderColor: Colors.GREY
    },
    label: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_16,
        color: 'black',
        paddingVertical: 10,
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: Colors.SIZE_BUTTON_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 55,
        borderRadius: 7,
    },
    selectedSizeButton: {
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 55,
        borderRadius: 7,
        backgroundColor: 'black'
    },
    sizeText: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.size_16,
        color: Colors.TEXT_GREY_2,
    },
    selectedSizeText: {
        fontFamily: Fonts.type.regular,
        fontSize: Fonts.size.size_16,
        color: Colors.WHITE,
        paddingVertical: 10
    },
    separator: {
        width: 10,
    },
    flatListContainer: {
        height: 50,
    },
    productDetailsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    productDetailsLeftText: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_14,
        flexGrow: 1
    },
    productDetailsRightText: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_14,
    }

});

export default styles;
