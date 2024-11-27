import React, { useState, useRef, useMemo } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Images from '../../theme/Images';
import HeartButton from '../../assets/icons/heart-button.svg';
import { formatDescription } from '../../utils/Util';
import RenderHtml from 'react-native-render-html';
import BottomSheet from '@gorhom/bottom-sheet';



const ProductDetail = (props: any) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '50%', '100%'], []);

    const product = props.route.params.product
    const sale = true
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const productDetails = [
        { id: '1', leftText: 'Color', rightText: 'Black & Camel' },
        { id: '2', leftText: 'Length', rightText: 'Maxi/Full Length' },
        { id: '3', leftText: 'Type', rightText: 'Maxi' },
        { id: '4', leftText: 'Sleeve Length', rightText: 'Sleeveless' },
        { id: '5', leftText: 'Sleeve', rightText: 'Sleeveless' },
    ];
    const [selectedSize, setSelectedSize] = useState('S');

    const handleSizePress = (size: string) => {
        setSelectedSize(size);
    };

    const renderSeparator = () => <View style={styles.separator} />;
    const renderProductDetails = ({ item }: { item: any }) => (
        <View style={styles.productDetailsView}>
            <Text style={styles.productDetailsLeftText}>{item.leftText}</Text>
            <Text style={styles.productDetailsRightText}>{item.rightText}</Text>
        </View>
    );

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
                        <TouchableOpacity style={styles.wishButton}>
                            <Text style={styles.wishButtonText}>Add To Wish</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.storeButton}>
                            <Text style={styles.storeButtonText}>Visit Store</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <ScrollView>
                        <Text style={styles.label}>Size</Text>
                        <View style={styles.flatListContainer}>
                            <FlatList style={{ alignSelf: 'center' }} ItemSeparatorComponent={renderSeparator} keyExtractor={(item, index) => index.toString()} horizontal data={sizes} renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={[
                                        styles.sizeButton,
                                        selectedSize === item && styles.selectedSizeButton,
                                    ]}
                                        onPress={() => handleSizePress(item)}>
                                        <Text style={[styles.sizeText, selectedSize === item && styles.selectedSizeText]}>
                                            {item}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
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
