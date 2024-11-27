import React from 'react';
import { Svg } from 'react-native-svg';
const SvgIcon = (props: { icon?: any; height?: any; width?: any; color?: any; strokeWidth?: any; style?: any; }) => {
    // const MenuIcon = Images.menuIcon
    const Icon = props.icon

    const {height, width, color, strokeWidth, style} = props

    return (
        <Svg width={width} height={height} stroke={color} style={style}>
            <Icon width={width} height={height} color={color} stroke={color} strokeWidth = {strokeWidth} />
        </Svg>
    );
};

export default SvgIcon;
