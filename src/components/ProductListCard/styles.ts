import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';

const styles = StyleSheet.create({
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
		backgroundColor: Colors.WHITE
	},
	selectedContainer: {
		flexDirection: 'row',
		padding: 8,
		margin: 16,
		borderRadius: 10,
		backgroundColor: Colors.WHITE,
		borderWidth: 1,
		borderColor: 'black'
	},

	imageContainer: {
		height: 111,
		width: 95,
		borderRadius: 5
	},
	contentContainer: {
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 9,
		paddingTop: 5
	},
	titleText: {
		fontFamily: Fonts.type.regular,
		fontSize: Fonts.size.size_14,
		width: '70%'
	},
	priceText: {
		fontFamily: Fonts.type.semiBold,
		fontSize: Fonts.size.size_15
	},
	button: {
		backgroundColor: 'black',
		marginTop: 5,
		borderRadius: 90,
		width: 140,
		paddingVertical: 2,
		alignItems: 'center'
	},
	greyButton: {
		backgroundColor: Colors.TEXT_GREY_2,
		marginTop: 5,
		borderRadius: 90,
		width: 140,
		paddingVertical: 2,
		alignItems: 'center'
	},
	buttonText: {
		color: Colors.WHITE,
		paddingHorizontal: 15,
		paddingVertical: 5
	},
	bottom: {
		flexDirection: 'row-reverse',
		paddingTop: 5,
		width: 200,
		alignSelf: 'flex-end',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	discountLabel: {
		color: Colors.TEXT_GREY_2
	},
	buttonPosition: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	removeButtonStyle: {
		backgroundColor: '#FF5733',
		marginTop: 5,
		borderRadius: 90,
		width: 100,
		paddingVertical: 2,
		alignItems: 'center'
	},
	counter: {
		fontSize: 20,
		alignSelf: 'center',
		textAlign: 'center'
	},

	//DROPDOWN STYLE

	dropdown: {
		marginTop: 16,
		height: 10,
		width: "100%",
		backgroundColor: 'white',
		borderRadius: 12,
		padding: 12,
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		// alignSelf: 'flex-start',
		elevation: 2,
	  },
	  icon: {
		marginRight: 5,
	  },
	  item: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
	  },
	  textItem: {
		flex: 1,
		fontSize: 12,
		textAlign: 'center'
	  },
	  placeholderStyle: {
		fontSize: 16,
	  },
	  selectedTextStyle: {
		fontSize: 12,
	  },
	  iconStyle: {
		width: 20,
		height: 20,
	  },
	  inputSearchStyle: {
		height: 40,
		fontSize: 16,
	  },
});

export default styles;

