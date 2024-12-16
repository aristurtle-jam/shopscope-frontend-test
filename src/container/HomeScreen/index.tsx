import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    ActivityIndicator,
} from 'react-native';
import styles from './styles';
import MenuIcon from '../../assets/icons/menu.svg';
import ShopscopeLogo from '../../assets/icons/header-logo.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import SwiperCancelIcon from '../../assets/icons/swiper-cancel.svg';
import SwiperWishlist from '../../assets/icons/swiper-wishlist.svg';
import SearchIcon from '../../assets/icons/search.svg';
import { NavigationService } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { requestAddToWishlist, requestProducts } from '../../ducks/products';
import { requestAddSwipedLeft } from '../../ducks/users';
import Colors from '../../theme/Colors';
import Swiper from 'react-native-deck-swiper';
import debounce from 'lodash.debounce';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state: any) => state.products.productList.productList);
    const isLoading = useSelector((state: any) => state.products.isLoading);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [swiperKey, setSwiperKey] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const swiperRef: any = useRef(null);

    const handleSwipeRight = (index: number) => {
        if (swiperRef.current && productList?.products?.length > 0) {
            let payload = {
                productId: productList.products[index].variants[0].product_id.toString(),
                selectedVariantId: productList.products[index].variants[0].id.toString(),
                tags: productList.products[index].tags,
            };
            dispatch(requestAddToWishlist(payload));
        }
    };

    const handleSwipeLeft = (index: number) => {
        if (swiperRef.current && productList?.products?.length > 0) {
            let payload = {
                productId: productList.products[index].variants[0].product_id.toString(),
            };
            dispatch(requestAddSwipedLeft(payload));
        }
    };

    const refreshProducts = () => {
        setPage(1);
        setSwiperKey(prevKey => prevKey + 1);
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
        fetchProducts();
    };

    const onSwipedAll = () => {
        setPage(page + 1);
    };

    const onTapCard = (cardIndex: number) => {
        const product = productList.products[cardIndex];
        NavigationService.navigate('ProductDetail', { product });
    };

    const fetchProducts = () => {
        const payload = {
            page: page,
            limit: 18,
            search: '',
        };
        if (searchQuery.trim() !== '') {
            payload.search = searchQuery;
        }
        dispatch(requestProducts(payload));
    };

    // Debounced version of fetchProducts
    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [searchQuery, page]);

    useEffect(() => {
        debouncedFetchProducts();
        // Cancel the debounce on component unmount
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [page, searchQuery]);

    useEffect(() => {
        if (productList && productList.products && productList.products.length > 0) {
            swiperRef.current.jumpToCardIndex(0);
            setSwiperKey(prevKey => prevKey + 1);
        }
    }, [productList]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => NavigationService.openDrawer()}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ShopscopeLogo />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => NavigationService.navigate('NotificationScreen')}>
                    <NotificationIcon />
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>
                Find the best clothes for you
            </Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.inputField}
                    placeholder='Search'
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={fetchProducts}>
                    <SearchIcon />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                {isLoading ? <ActivityIndicator size={'small'} color={Colors.TEXT_BLACK} /> :
                    productList?.products?.length ?
                        <>
                            <Swiper
                                verticalSwipe={false}
                                key={swiperKey}
                                ref={swiperRef}
                                cards={productList.products}
                                renderCard={(card: any) => (
                                    <View style={styles.card}>
                                        <Image style={styles.image} source={{ uri: card?.image?.src }} />
                                    </View>
                                )}
                                onTapCard={onTapCard}
                                onSwipedAll={onSwipedAll}
                                onSwipedRight={handleSwipeRight}
                                onSwipedLeft={handleSwipeLeft}
                                cardIndex={0}
                                backgroundColor="white"
                                stackSize={2}
                                cardVerticalMargin={0}
                                cardHorizontalMargin={0}
                                cardStyle={{ height: '100%', width: '100%' }}
                                containerStyle={{ marginTop: 10 }}
                            />

                            <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()} style={styles.swiperCancelStyle}>
                                <SwiperCancelIcon />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => swiperRef.current.swipeRight()} style={styles.swiperWishlistStyle}>
                                <SwiperWishlist />
                            </TouchableOpacity>
                        </>
                        : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No products available</Text>
                            <TouchableOpacity onPress={() => refreshProducts()}>
                                <Text style={{ fontWeight: '900' }}>Refresh</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </View>
    );
};

export default HomeScreen;
