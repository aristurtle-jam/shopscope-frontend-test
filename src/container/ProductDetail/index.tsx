import React, { useState, useRef, useMemo } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Images from '../../theme/Images';
import HeartButton from '../../assets/icons/heart-button.svg';
import { formatDescription } from '../../utils/Util';
import RenderHtml from 'react-native-render-html';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch } from 'react-redux';
import { requestAddToWishlist } from '../../ducks/products';
import { requestAddToCart, successAddToCart } from '../../ducks/cart';
import { showSnackbar } from '../../ducks/snackbar';



const ProductDetail = (props: any) => {

    const dispatch = useDispatch()
    const product = props.route.params.product


    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '50%', '100%'], []);
    const [selectedSize, setSelectedSize] = useState<any>(product.variants[0].title);
    const [selectedVariant, setSelectedVariant] = useState<any>(product.variants[0])
    const [selectedProductId, setSelectedProductId] = useState<any>(product.variants[0].product_id)
    const sale = true
    const sizes = product.variants ? product.variants : [];
    const productDetails = [
        { id: '1', leftText: 'Color', rightText: 'Black & Camel' },
        { id: '2', leftText: 'Length', rightText: 'Maxi/Full Length' },
        { id: '3', leftText: 'Type', rightText: 'Maxi' },
        { id: '4', leftText: 'Sleeve Length', rightText: 'Sleeveless' },
        { id: '5', leftText: 'Sleeve', rightText: 'Sleeveless' },
    ];

    const handleSizePress = (item: any) => {
        setSelectedSize(item.title);
        setSelectedVariant(item)
        setSelectedProductId(item.product_id)
    };

    const renderSeparator = () => <View style={styles.separator} />;
    const renderProductDetails = ({ item }: { item: any }) => (
        <View style={styles.productDetailsView}>
            <Text style={styles.productDetailsLeftText}>{item.leftText}</Text>
            <Text style={styles.productDetailsRightText}>{item.rightText}</Text>
        </View>
    );

    const addToWish = () => {
        let payload = {
            productId: selectedProductId.toString(),
            selectedVariantId: selectedVariant.id.toString(),
        }
        dispatch(requestAddToWishlist(payload))
    }

    const addToCart = () => {
        let payload = {
            createdAt: product.created_at,
            image: product.image.src,
            price: selectedVariant.price,
            productId: selectedVariant?.product_id?.toString(),
            productTitle: product.title,
            quantity: 1,
            updatedAt: selectedVariant.updated_at,
            selectedVariantId: selectedVariant?.id?.toString()
        }
        
        dispatch(successAddToCart({product: payload}))
        dispatch(showSnackbar({ message: "Added to cart", type: 'info' }));

    }
    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={true} setting={false} title={''} />
            <TouchableOpacity style={styles.heartButton}>
                <HeartButton />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: product.image.src }} resizeMode='cover' />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0} // This corresponds to '50%' if it's the second item in your snapPoints array
                snapPoints={snapPoints}
            >
                <View style={styles.detailView}>
                    <View style={styles.profileView}>
                        <Image source={Images.profileImage} style={styles.profileImage} resizeMode='cover' />
                        <Text style={styles.profileName}>{product.vendor}</Text>
                    </View>
                    <Text style={styles.productName}>{product.title}</Text>
                    <View style={styles.priceView}>
                        <Text style={styles.price}>${`${'120'}`}</Text>
                        {sale && <Text style={styles.priceCut}>${`${'350'}`}</Text>}
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity onPress={addToWish} style={styles.wishButton}>
                            <Text style={styles.wishButtonText}>Add To Wish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addToCart} style={styles.storeButton}>
                            <Text style={styles.storeButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <ScrollView>
                        <Text style={styles.label}>Size</Text>
                        <View style={styles.flatListContainer}>
                            {sizes.length <= 0 ? <Text>No sizes available</Text> :
                                <FlatList style={{ alignSelf: 'center' }}
                                    ItemSeparatorComponent={renderSeparator}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal data={sizes}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity style={[
                                                styles.sizeButton,
                                                selectedSize === item.title && styles.selectedSizeButton,
                                            ]}
                                                onPress={() => handleSizePress(item)}>
                                                <Text style={[styles.sizeText, selectedSize === item.title && styles.selectedSizeText]}>
                                                    {item.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    }} />
                            }
                        </View>
                        {/* <Text style={styles.label}>Product Details</Text>
                        <FlatList keyExtractor={(item: any) => item.id} data={productDetails} renderItem={renderProductDetails} />
                        <Text style={styles.label}>Description</Text> */}
                        <RenderHtml
                            contentWidth={useWindowDimensions().width}
                            source={{ html: product.body_html }}
                        />
                    </ScrollView>
                    {/* <Text style={styles.productDetailsLeftText}>{formatDescription(product.body_html)}</Text> */}
                </View>
            </BottomSheet>


        </View>
    );
};

export default ProductDetail;
