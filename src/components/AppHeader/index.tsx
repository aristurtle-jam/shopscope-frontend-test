import React from 'react'
import { View, StyleSheet, TouchableOpacity, useColorScheme, StatusBar } from 'react-native'
import { Badge, Surface, Text, Title, useTheme } from 'react-native-paper'
import styles from './styles';
import Colors from '../../theme/Colors';
import { NavigationService } from '../../config';
import HeaderBack from '../../assets/icons/header-back.svg';
import ShareIcon from '../../assets/icons/share.svg'
import SettingsIcon from '../../assets/icons/settings-header.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
const IconSize = 24;

const AppHeader = ({ menu, back, rightComponent, share, setting, title, transparent }: { menu: boolean, back: boolean, rightComponent: boolean, share: boolean, setting: boolean, title: string, transparent: boolean }) => {

	const navigation = useNavigation()
	const onPressBack = () => {
		console.log('Back pressed')
        if (navigation.canGoBack()) {
            NavigationService.goBack();
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'MainAppStack' }], // Replace 'Home' with your actual Home screen name
                })
            );
        }
    };
	const onPressMenu = () => NavigationService.openDrawer()
	const onPressShare = () => { console.log('share pressed') }
	const onPressSettings = () => {NavigationService.navigate('SettingsScreen')}
	const LeftView = () => (
		<View style={styles.view}>
			{menu && <TouchableOpacity onPress={onPressMenu}>

			</TouchableOpacity>}
			{back && <TouchableOpacity onPress={onPressBack}>
				<HeaderBack />
			</TouchableOpacity>}
		</View>
	)
	const RightView = () => (
		rightComponent ? <View>
			{share && <TouchableOpacity style={styles.rowView} onPress={onPressShare}>
				<ShareIcon />
			</TouchableOpacity>}
			{setting && <TouchableOpacity style={styles.rowViewReverse} onPress={onPressSettings}>
				<SettingsIcon />
			</TouchableOpacity>}
		</View> : null

	)
	const TitleView = () => (
		<View style={styles.titleView}>
			<Title style={{ color: 'black', textAlign: 'center', marginRight: !rightComponent ? 50 : -30  }}>{title}</Title>
		</View>
	)
	return (
		<View style={transparent ? styles.transparentHeader : styles.header}>
			<LeftView />
			<TitleView />
			<View>
			<RightView />
			</View>
		</View>
	)
}

export default AppHeader
