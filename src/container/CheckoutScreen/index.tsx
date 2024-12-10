// CartScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import styles from './styles';
import ProductListCard from '../../components/ProductListCard';
import { useDispatch, useSelector } from 'react-redux';
import { successAddToCart, updateItemQuantity } from '../../ducks/cart';
import Colors from '../../theme/Colors';
import { TextInput } from 'react-native-paper';
import { ArrayIterator, first } from 'lodash';
import { showSnackbar } from '../../ducks/snackbar';
import { requestCreateOrder } from '../../ducks/order';
import AppHeader from '../../components/AppHeader';

const CheckoutScreen = () => {
    const dispatch = useDispatch();
    const cartList = useSelector((state: any) => state.cart.cartList);
    const totalPrice = useSelector((state: any) => state.cart.totalPrice);
    const profile = useSelector((state: any) => state.profile.myProfile)
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [city, setCity] = useState();
    const [province, setProvince] = useState();
    const [country, setCountry] = useState();
    const [zip, setZip] = useState();

    const onChangeFirstName = (val: any) => {
        setFirstName(val)
    }
    const onChangeLastName = (val: any) => {
        setLastName(val)
    }
    const onChangeAddress = (val: any) => {
        setAddress(val)
    }
    const onChangePhone = (val: any) => {
        setPhone(val)
    }
    const onChangeCity = (val: any) => {
        setCity(val)
    }
    const onChangeProvince = (val: any) => {
        setProvince(val)
    }
    const onChangeCountry = (val: any) => {
        setCountry(val)
    }
    const onChangeZip = (val: any) => {
        setZip(val)
    }

    const incrementCount = (id: string) => {
        const item = cartList.find(item => item._id === id);
        if (item) {
            dispatch(updateItemQuantity(id, item.quantity + 1));
        }
    };

    const decrementCount = (id: string) => {
        const item = cartList.find(item => item._id === id);
        if (item && item.quantity > 1) {
            dispatch(updateItemQuantity(id, item.quantity - 1));
        }
    };

    const renderWishlistItem = ({ item }) => {
        return (
            <View style={{
                // height: 300,
                // width: 120,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                backgroundColor: Colors.WHITE,
                flexDirection: 'row'
            }}>
                <Image source={{ uri: item.product.image.src }} resizeMode='cover' style={styles.imageContainer} />
                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', padding: 5, flexWrap: 'wrap' }}>{item.product.title} ({`x${item.quantity}`})</Text>
                    <Text style={{ flex: 1, padding: 5, flexWrap: 'wrap' }}>Price: ({`$${item.quantity * item.selectedVariantIdPrice}`})</Text>

                </View>
            </View>
        );
    };

    const selectedItemsCount = cartList.reduce((total, item) => total + item.quantity, 0);

    const placeOrderBtn = () => {

        if (!firstName || !lastName || !address || !phone || !city || !province || !country || !zip) {
            dispatch(showSnackbar({ message: "Please fill in all fields.", type: "error" }));
            return;
        }

        let products: any = []
        cartList.map((item: any) => {
            products.push({
                variant_id: item.selectedVariantId,
                quantity: item.quantity
            })
        })


        let payload = {
            products: products,
            shippingAddress: {
                first_name: firstName,
                last_name: lastName,
                address1: address,
                phone: phone,
                city: city,
                province: province,
                country: country,
                zip: zip
            }
        }
        dispatch(requestCreateOrder({payload, profile}))


    }

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.headerText}>Cart</Text> */}
            {/* <View style={{ height: 310, }}> */}
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Checkout'} transparent={false} />

            <FlatList
                data={cartList}
                renderItem={renderWishlistItem}
                // horizontal
                scrollEnabled
                style={{ padding: 20, backgroundColor: Colors.GREY }} // Set the height as per your requirement
                contentContainerStyle={{ paddingBottom: 20 }}
                keyExtractor={(item) => item.selectedVariantId}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
            {/* </View> */}
            <Text style={[styles.title, { paddingHorizontal: 10 }]}>
                Enter Shipping Address
            </Text>
            <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10 }}>
                    <TextInput
                        label={'First name'}
                        mode='outlined'
                        value={firstName}
                        onChangeText={onChangeFirstName}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 200 }]}
                    />
                    <TextInput
                        label={'Last name'}
                        mode='outlined'
                        value={lastName}
                        onChangeText={onChangeLastName}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 180 }]}
                    />
                </View>
                <TextInput
                    label={'Address'}
                    mode='outlined'
                    value={address}
                    onChangeText={onChangeAddress}
                    selectionColor='black'
                    underlineColor='transparent'
                    activeUnderlineColor='black'
                    outlineColor={Colors.GREY}
                    activeOutlineColor='black'
                    autoCapitalize='none'
                    textColor='black'
                    theme={{ roundness: 10 }}
                    style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: '100%', marginTop: 10 }]}
                />
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10 }}>
                    <TextInput
                        label={'Phone'}
                        mode='outlined'
                        value={phone}
                        onChangeText={onChangePhone}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 200 }]}
                    />
                    <TextInput
                        label={'City'}
                        mode='outlined'
                        value={city}
                        onChangeText={onChangeCity}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 180 }]}
                    />
                </View>
                <TextInput
                    label={'Country'}
                    mode='outlined'
                    value={country}
                    onChangeText={onChangeCountry}
                    selectionColor='black'
                    underlineColor='transparent'
                    activeUnderlineColor='black'
                    outlineColor={Colors.GREY}
                    activeOutlineColor='black'
                    autoCapitalize='none'
                    textColor='black'
                    theme={{ roundness: 10 }}
                    style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: '100%', marginTop: 10 }]}
                />
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10 }}>
                    <TextInput
                        label={'Province'}
                        mode='outlined'
                        value={province}
                        onChangeText={onChangeProvince}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 200 }]}
                    />
                    <TextInput
                        label={'Postal Code'}
                        mode='outlined'
                        value={zip}
                        onChangeText={onChangeZip}
                        selectionColor='black'
                        underlineColor='transparent'
                        activeUnderlineColor='black'
                        outlineColor={Colors.GREY}
                        activeOutlineColor='black'
                        autoCapitalize='none'
                        textColor='black'
                        theme={{ roundness: 10 }}
                        style={[{ borderRadius: 10, backgroundColor: Colors.WHITE, width: 180 }]}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={placeOrderBtn} style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Place Order</Text>
                <Text style={styles.checkoutButtonText}>${totalPrice}</Text>
            </TouchableOpacity>
            {/* <View style={styles.footerContainer}>
                <View style={styles.row}>
                    <Text style={styles.selectedItemLabel}>{`Selected Items(${selectedItemsCount})`}</Text>
                    <Text style={styles.selectedItemLabel}>{`Total: $${totalPrice.toFixed(2)}`}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View> */}
        </ScrollView>
    )
};

export default CheckoutScreen;
