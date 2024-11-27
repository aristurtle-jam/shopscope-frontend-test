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
		borderRadius: 90
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
	}
});

export default styles;

