import React, { useState } from 'react';
import { View, Animated, Text, TextStyle, KeyboardType } from 'react-native';
import { TextInput } from 'react-native-paper'
import Colors from '../../theme/Colors';
import { SvgProps } from 'react-native-svg';
import { SvgIcon } from '..';

// Define a type for the props
type TextInputPlaceHolderProps = {
    placeholder: string; // Define the type of placeholder as string
    value: string;
    onChangeText: (text: string) => void;
    inputStyle?: TextStyle;
    password?: boolean;
    keyBoardType?: KeyboardType;
    icon?: React.FC<SvgProps>; // SVG icon component
    flex?: number;
};



const AuthTextInput: React.FC<TextInputPlaceHolderProps> = ({ placeholder, value, onChangeText, inputStyle, password, keyBoardType, icon, flex }) => {

    const [iconColor, setIconColor] = useState(Colors.GREY)
    return (

        <TextInput
            label={placeholder}
            left={icon ? <TextInput.Icon icon={() => <SvgIcon icon={icon} width={24} height={24} color={iconColor}/>} /> : undefined} // Conditionally render the icon inside the left prop
            mode='outlined'
            value={value}
            onFocus={() => setIconColor('black')}
            onBlur={() => setIconColor(Colors.GREY)}
            secureTextEntry={password ?? false}
            onChangeText={onChangeText}
            selectionColor='black'
            underlineColor='transparent'
            activeUnderlineColor='black'
            outlineColor={Colors.GREY}
            activeOutlineColor='black'
            autoCapitalize='none'
            textColor='black'
            keyboardType={keyBoardType}
            theme={{ roundness: 10 }}
            style={[{  borderRadius: 10, paddingHorizontal: 10, backgroundColor: Colors.WHITE, flex: flex}, inputStyle]} // Apply border radius and background color
        />
    );
};

export default AuthTextInput;
