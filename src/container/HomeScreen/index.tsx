import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import styles from './styles';
import MenuIcon from '../../assets/icons/menu.svg'
import ShopscopeLogo from '../../assets/icons/header-logo.svg'
import NotificationIcon from '../../assets/icons/notification.svg'
import SwiperCancelIcon from '../../assets/icons/swiper-cancel.svg'
import SwiperWishlist from '../../assets/icons/swiper-wishlist.svg'
import SearchIcon from '../../assets/icons/search.svg'
import { NavigationService } from '../../config';
import Images from '../../theme/Images';
import Swiper from 'react-native-deck-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { requestAddToWishlist, requestProducts } from '../../ducks/products';
import Colors from '../../theme/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import { showSnackbar } from '../../ducks/snackbar';
import { useFocusEffect } from '@react-navigation/native';
import { requestGetNotifications } from '../../ducks/profile';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const productList = useSelector((state: any) => state.products.productList.productList)
    const isLoading = useSelector((state: any) => state.products.isLoading)
    const [page, setPage] = useState(1)
    const [swiperKey, setSwiperKey] = useState(0); // Added key to reset Swiper
    const [refreshing, setRefreshing] = useState(false)


    const swiperRef: any = useRef(null);

    const handleSwipeRight = (index: number) => {
        if (swiperRef.current && productList?.products?.length > 0) {
            // swiperRef.current.swipeRight();
            let payload = {
                productId: productList.products[index].variants[0].product_id.toString(),
                variantId: productList.products[index].variants[0].id.toString(),
            }
            dispatch(requestAddToWishlist(payload))
        }
    };

    const refreshProducts = () => {
        setPage(1); // Reset the page number
        setSwiperKey(prevKey => prevKey + 1); // Reset the Swiper key to force re-render
        setRefreshing(true)
        setTimeout(() => setRefreshing(false), 1000)
    };

    const onSwipedAll = () => {
        setPage(page + 1)
    }

    const onTapCard = (cardIndex: number) => {
        const product = productList.products[cardIndex];
        NavigationService.navigate('ProductDetail', { product });
    };


    useFocusEffect(
        React.useCallback(() => {
            const payload = {
                page: 1,
                limi: 5,
            }
            dispatch(requestGetNotifications(payload));
        }, [])
    )

    useEffect(() => {
        // Dispatch the action to load products when the component mounts
        dispatch(requestProducts({
            page: page,
            limit: 2
        }));
    }, [page]);

    useEffect(() => {
        // Reset swiper when new products are loaded
        if (productList && productList.products && productList.products.length > 0) {
            swiperRef.current.jumpToCardIndex(0); // Reset card index
            setSwiperKey(prevKey => prevKey + 1); // Change key to force re-render
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
                <TextInput style={styles.inputField} placeholder='Search' />
                <TouchableOpacity style={styles.searchButton}>
                    <SearchIcon />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                {isLoading ? <ActivityIndicator size={'small'} color={Colors.TEXT_BLACK} /> :
                    productList?.products?.length ?
                        <>
                            <Swiper
                                key={swiperKey}
                                ref={swiperRef}
                                cards={productList.products}
                                renderCard={(card: any) => (
                                    <View style={styles.card}>
                                        <Image style={styles.image} source={{ uri: card?.image?.src }} />
                                    </View>
                                )}
                                onTapCard={onTapCard}
                                onSwiped={(cardIndex) => console.log('Card swiped:', cardIndex)}
                                onSwipedAll={onSwipedAll}
                                onSwipedRight={handleSwipeRight}
                                cardIndex={0}
                                backgroundColor="white"
                                stackSize={2}
                                cardVerticalMargin={0}
                                cardHorizontalMargin={0}
                                cardStyle={{ height: '100%', width: '100%' }}
                                containerStyle={{ marginTop: 10 }}
                                verticalSwipe={false}
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
    )
};

export default HomeScreen;
