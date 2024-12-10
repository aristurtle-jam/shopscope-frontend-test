import React, { useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationService } from '../../config';
import AppHeader from '../../components/AppHeader';
import { requestGetAllOrders } from '../../ducks/order';
import { ScrollView } from 'react-native-gesture-handler';

const OrdersScreen = () => {
    const dispatch = useDispatch();
    const ordersList = useSelector((state) => state.order.ordersList);

    useEffect(() => {
        const payload = {
            page: 1,
            limit: 5
        }
        dispatch(requestGetAllOrders(payload));
    }, [dispatch]);

    const renderOrderItems = ({ item, index }) => {
        return <Text>{index + 1}: {item.name}</Text>
    }

    const renderWishlistItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate('OrderDetailScreen', {orderDetail: item, shippingRates: item.customShippingRates, webUrl: item.orderUrl })} style={{ borderWidth: 1, padding: 20, borderRadius: 20, width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Order Number: {item.name}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'red' }}>{item.financial_status.toUpperCase()}</Text>
                </View>
                <FlatList
                    style={{ paddingVertical: 20 }}
                    data={item.line_items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrderItems}
                />
                <Text style={{ fontWeight: 'bold' }}>Total Price: {item.subtotal_price + ' ' + item.currency}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Orders'} transparent={false} />
            <ScrollView style={{flex: 1, width: '100%'}}>
                <FlatList
                    data={ordersList}
                    renderItem={renderWishlistItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ width: '100%', marginTop: 20, paddingHorizontal: 20 }}
                    style={{ width: '100%' }}
                    ItemSeparatorComponent={() => <View style={{height: 20}}/>}
                />
            </ScrollView>
        </View>
    );
};

export default OrdersScreen;
