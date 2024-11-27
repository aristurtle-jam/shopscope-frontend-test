import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { requestProducts } from '../../ducks/products';
import { NavigationService } from '../../config';


const ProductListScreen = (props: any) => {

    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const productList = useSelector((state: any) => state.products.productList.productList)
    const { onSelectProduct } = props.route.params;

    useEffect(() => {
        // Dispatch the action to load products when the component mounts
        dispatch(requestProducts({
            page: page,
            limit: 4,
            fromProductListScreen: true
        }));
    }, [page]);

    const onEndReached = () => {
        setPage(page + 1)
    }
    const onPressHandler = (item: any) => {
        const payload = {
            productId: item.id,
            productImage: item.image.src,
            productVariantId: item.variants[0].id,
            productImageId: item.image.id
        }
        onSelectProduct(payload);
        // Optionally navigate back
        NavigationService.goBack();
    }

    const renderItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressHandler(item)}
            >
                <View style={styles.cardContainer}>
                    <Image source={{ uri: item.image.src }} resizeMode='cover' style={styles.imageContainer} />
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={true} setting={false} title={'Products List'} />
            <FlatList
                data={productList.products}
                renderItem={renderItem}
            />


        </View>
    );
};

export default ProductListScreen;
