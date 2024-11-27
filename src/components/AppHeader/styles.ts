import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
	header: {
		width: '100%',
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.WHITE,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		// position: 'absolute',
		// top: 0,
		// left: 0,
		// right: 0,
		// zIndex: 999,
		shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12.35,
        elevation: 2,
	},
	transparentHeader: {
		width: '100%',
		// paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		// position: 'absolute',
		alignItems: 'center',
		// top: 0,
		// left: 0,
		// right: 0,
		// zIndex: 999
	},
	view: {
		marginHorizontal: 16,
	},
	titleView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	rightView: {
		justifyContent: 'flex-end',
		marginHorizontal: 16,
		alignItems: 'center',
		flexDirection: 'row',
	},
	rowView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 10,
	},
	rowViewReverse: {
		flexDirection: 'row',
		alignItems: 'center',
	}
});

export default styles;
