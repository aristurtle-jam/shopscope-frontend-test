import { StyleSheet } from 'react-native';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Colors';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
    profileView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    profileImage: {
        width: 42,
        height: 42,
        // borderRadius: 50
    },
    profileTile: {
      flexDirection: 'row'
    },
    profileName: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.size_14
    },
    postTime: {
        fontFamily: Fonts.type.light,
        fontSize: Fonts.size.size_12
    },
    profileLabelView: {
        justifyContent: 'center',
        marginLeft: 12
    },
    postImage: {
        width: '100%',
        height: verticalScale(450),
        alignSelf: 'center',
        marginTop: 10
    },
    actionView: {
        flexDirection: 'row',
        marginTop: 12,
        width: '25%',
        justifyContent: 'space-between'
    },
    likesText: {
        fontSize: Fonts.size.size_12,
        fontFamily: Fonts.type.regular,
        marginLeft: 10
    },
    likeView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
       justifyContent: 'center',
       alignItems: 'flex-end',
    },

    //MODAL:

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
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: 'black',
        width: 100
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
