import React, { useState } from 'react';
import { View, Animated, Text, TextStyle, KeyboardType, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper'
import Colors from '../../theme/Colors';
import { SvgProps } from 'react-native-svg';
import { SvgIcon } from '..';
import { CountryPicker } from 'react-native-country-codes-picker';
import Fonts from '../../theme/Fonts';


// Define a type for the props
type TextInputPlaceHolderProps = {
    placeholder: string; // Define the type of placeholder as string
    value: string;
    onChangeText: (text: string) => void;
    inputStyle?: TextStyle;
    password?: boolean;
    keyBoardType?: KeyboardType;
    icon?: React.FC<SvgProps>; // SVG icon component
    selectedCountry?: string; // New prop for selected country code
    setSelectedCountry?: (countryCode: string) => void; // New prop for setting selected country code
    edit?: boolean
};



const AuthTextInput: React.FC<TextInputPlaceHolderProps> = ({ placeholder, value, onChangeText, inputStyle, password, keyBoardType, icon, selectedCountry, setSelectedCountry, edit }) => {

    const [iconColor, setIconColor] = useState(Colors.GREY)
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    // const [selectedCountry, setSelectedCountry] = useState(null);

    const renderIcon = () => {
        if (keyBoardType === 'phone-pad' && icon && !edit) {
            return (
                <TextInput.Icon
                style={{width: 80, marginLeft: 60}}
                    icon={() => <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <SvgIcon icon={icon} width={24} height={24} color={iconColor} />
                        <TouchableOpacity style={{width: '100%'}} onPress={() => setShowCountryPicker(true)}>
                            <Text style={{ color: Colors.TEXT_BLACK, fontSize: Fonts.size.size_16, width: '100%', marginLeft: 5 }}>{selectedCountry}</Text>
                        </TouchableOpacity>
                    </View>}
                />
            );
        } else if (icon) {
            return <TextInput.Icon icon={() => <SvgIcon icon={icon} width={24} height={24} color={iconColor} />} />;
        }
        return null;
    };

    return (
        <>
            <TextInput
                label={placeholder}
                left={renderIcon()} // Conditionally render the icon inside the left prop
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
                style={[{ borderRadius: 10, paddingHorizontal: (keyBoardType === 'phone-pad' && !edit) ? 40 : 10, backgroundColor: Colors.WHITE }, inputStyle]} // Apply border radius and background color
            />
            {showCountryPicker && (
                <CountryPicker
                    style={{
                        modal: {height: 500}
                    }}
                    onBackdropPress={() => setShowCountryPicker(false)}
                    show={showCountryPicker}
                    pickerButtonOnPress={(item) => {
                        setSelectedCountry(item.dial_code);
                        setShowCountryPicker(false);
                    }}
                // onClose={() => setShowCountryPicker(false)}
                // onSelect={(country) => {
                //     setSelectedCountry(country);
                //     setShowCountryPicker(false);
                // }}
                />
            )}
        </>
    );
};

export default AuthTextInput;
