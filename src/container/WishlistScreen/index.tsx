import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import styles from './styles';
import { ProductListCard } from '../../components';
import Images from '../../theme/Images';
import WishlistItem from './interface';
import { NavigationService } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetWishlist, requestRemoveFromWishlist } from '../../ducks/products';
import { useFocusEffect } from '@react-navigation/native';


const WishlistScreen = () => {

    const dispatch = useDispatch()

    // const [wishlistData, setWishlistData] = useState<WishlistItem[]>(initialWishlistData);
    const [selectedItems, setSelectedItems] = useState<WishlistItem[]>([]);
    const [cart, setCart] = useState<WishlistItem[]>([]);
    const [longPressSelected, setLongPressSelected] = useState<boolean>(false); // State to track long press selection
    const [page, setPage] = useState(1);
    const [buttonOpacity] = useState(new Animated.Value(0)); // Initialize button opacity animation value
    const [buttonPosition] = useState(new Animated.Value(0)); // Initialize button position animation value
    const wishlistData = useSelector((state: any) => state.products.wishlistData)
    const wishList  = useSelector((state: any) => state.products.wishlist)
    const isAllDataLoaded  = useSelector((state: any) => state.products.isAllDataLoaded)

    useEffect(() => {
        // Animate button opacity when selectedItems change
        Animated.timing(buttonOpacity, {
            toValue: selectedItems.length > 0 ? 1 : 0,
            duration: 300, // Animation duration in milliseconds
            easing: Easing.inOut(Easing.ease), // Use ease-in-ease-out animation
            useNativeDriver: true
        }).start(); // Start the animation

        // Animate button position when selectedItems change
        Animated.timing(buttonPosition, {
            toValue: selectedItems.length > 0 ? 1 : 0,
            duration: 300, // Animation duration in milliseconds
            easing: Easing.inOut(Easing.ease), // Use ease-in-ease-out animation
            useNativeDriver: true
        }).start(); // Start the animation
    }, [selectedItems]);

    const fetchWishlist = useCallback((reset = false) => {
        if (!isAllDataLoaded || reset) {
            dispatch(requestGetWishlist({ page: reset ? 1 : page, limit: 5, reset }));
            if (reset) {
                setPage(1); // Reset page counter if data is reset
            }
        }
    }, [dispatch, page, isAllDataLoaded]);

    useFocusEffect(
        useCallback(() => {
            fetchWishlist(true); // Pass true to reset the wishlist
        }, [fetchWishlist])
    );

    const toggleItemSelection = (item: WishlistItem) => {
        const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem._id !== item._id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const onPressHandler = (item: WishlistItem) => {
        if (selectedItems.length === 0) {
            // Navigate to product page only if no items are selected
            // Replace this with your navigation logic
            // NavigationService.navigate("ProductDetail")
        } else if (longPressSelected) {
            // Toggle item selection if long press has occurred
            toggleItemSelection(item);
        }
    };
    const longPressHandler = (item: WishlistItem) => {
        toggleItemSelection(item);
        setLongPressSelected(true);
    };

    const handleDeleteItem = (itemId: string) => {
        dispatch(requestRemoveFromWishlist({ id: itemId }));
    };


    const addToCart = () => {
        setCart([...cart, ...selectedItems]);
        setSelectedItems([]);
    };

    const onEndReached = () => {
        if (!isAllDataLoaded) {
            setPage(prevPage => prevPage + 1);
        }
    };



    const renderWishlistItem = ({ item }: { item: WishlistItem }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressHandler(item)}
                onLongPress={() => longPressHandler(item)}
            >
                <ProductListCard onPressDelete={(id: string) => handleDeleteItem(id)} item={item} isSelected={selectedItems.some((selectedItem) => selectedItem._id === item._id)} />
            </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Wishlist</Text>
            <FlatList data={wishList}
                renderItem={renderWishlistItem}
                onEndReached={onEndReached}
                keyExtractor={(item) => item._id.toString()}
            />
            <Animated.View style={[{ opacity: buttonOpacity, transform: [{ translateY: buttonPosition.interpolate({ inputRange: [0, 1], outputRange: [0, -20] }) }] }]}>
                {selectedItems.length > 0 && (
                    <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
                        <Text style={styles.cartButtonText}>Add to Cart ({selectedItems.length})</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </View>
    )
};

export default WishlistScreen;


