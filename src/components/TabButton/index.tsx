import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import Colors from '../../theme/Colors';
import HomeIcon from '../../assets/icons/home.svg';
import HomeIconFocused from '../../assets/icons/home-focused.svg';
import WishlistIcon from '../../assets/icons/wishlist.svg';
import WishlistIconFocused from '../../assets/icons/wishlist-focused.svg';
import DiscoverIcon from '../../assets/icons/discover.svg';
import DiscoverIconFocused from '../../assets/icons/discover-focused.svg';
import ProfileIcon from '../../assets/icons/user-profile.svg';
import ProfileIconFocused from '../../assets/icons/user-profile-focused.svg';

const TabButton = ({ focused, onPress, children, label }: { focused: any, onPress: any, children: any, label: any }) => {
  const viewRef: any = useRef(null);
  const circleRef: any = useRef(null);
  const textRef: any = useRef(null);
  const { colors } = useTheme();
  const isDarkMode = colors.background === 'black'; // Assuming you have a Colors module with black and white

  const animate1 = { 0: { scale: 0.5, translateY: 7 }, 0.92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } };
  const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } };

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  // Define the icons for different tabs
  const getIcon = () => {
    switch (label) {
      case 'Home':
        return focused ? <HomeIconFocused /> : <HomeIcon />;
      case 'Wish List':
        return focused ? <WishlistIconFocused/> : <WishlistIcon />;
      case 'Discover':
        return focused ? <DiscoverIconFocused/> : <DiscoverIcon />;
      case 'Profile':
        return focused ? <ProfileIconFocused/> : <ProfileIcon />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 70 }}>
      <Animatable.View ref={viewRef} duration={300} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 45, height: 45, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
          {focused && <Animatable.View ref={circleRef} style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', borderRadius: 25 }} />}
          {getIcon()}
        </View>
        <Animatable.Text ref={textRef} style={{ fontSize: 12, textAlign: 'center', color: isDarkMode ? Colors.WHITE : Colors.TEXT_BLACK, fontWeight: '500' }}>{label}</Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default TabButton;
