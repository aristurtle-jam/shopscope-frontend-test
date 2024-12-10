// CartScreen.js

import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import ProductListCard from '../../components/ProductListCard';
import { useDispatch, useSelector } from 'react-redux';
import { successAddToCart, updateItemQuantity } from '../../ducks/cart';
import { NavigationService } from '../../config';
import AppHeader from '../../components/AppHeader';

const CartScreen = () => {
    const dispatch = useDispatch();
    const cartList = useSelector((state: any) => state.cart.cartList);
    const totalPrice = useSelector((state: any) => state.cart.totalPrice);
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
            <TouchableOpacity disabled>
                <ProductListCard
                    cart={true}
                    item={item}
                    count={item.quantity}
                    isSelected={false}
                    onPressDelete={(item: string) => dispatch(successAddToCart({ product: item, removeFromCart: true }))}
                    onIncrement={() => incrementCount(item._id)}
                    onDecrement={() => decrementCount(item._id)}
                />
            </TouchableOpacity>
        );
    };

    const selectedItemsCount = cartList.reduce((total, item) => total + item.quantity, 0);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerText}>Cart</Text> */}
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Cart'} transparent={false} />

            <FlatList
                data={cartList}
                renderItem={renderWishlistItem}
                keyExtractor={(item) => item.selectedVariantId}
            />
            <View style={styles.footerContainer}>
                <View style={styles.row}>
                    <Text style={styles.selectedItemLabel}>{`Selected Items(${selectedItemsCount})`}</Text>
                    <Text style={styles.selectedItemLabel}>{`Total: $${totalPrice.toFixed(2)}`}</Text>
                </View>
                <TouchableOpacity onPress={() => NavigationService.navigate('CheckoutScreen')} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default CartScreen;
