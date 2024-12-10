import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    Button,
    ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Colors from '../../theme/Colors';

const OrderDetailScreen = (props: any) => {
    const { orderDetail, shippingRates, webUrl } = props.route.params;
    const [modalVisible, setModalVisible] = useState(false);

    const renderOrderList = ({ item, index }) => {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: '600' }}>{index + 1}: {item.name}</Text>
            </View>
        );
    };

    const getTime = (dateString: string) => {
        const date = new Date(dateString);

        // Get date components
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
        const day = ('0' + date.getDate()).slice(-2);

        // Get time components
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);

        // Format date string
        const formattedDate = `${year}-${month}-${day}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        return `Date: ${formattedDate} Time:${formattedTime}`;
    };

    const handleApplePay = async () => {
        try {
            // Open the modal when Pay is pressed
            openWebViewModal();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const openWebViewModal = () => {
        setModalVisible(true);
    };

    const closeWebViewModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <AppHeader menu={false} back={true} rightComponent={false} share={false} setting={false} title={'Order Detail'} transparent={false} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Order number: {orderDetail.name}</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: orderDetail.financial_status === 'pending' ? 'red' : 'blue' }}>Status: {orderDetail.financial_status}</Text>
                    </View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'green', marginTop: 20 }}>CONFIRMATION NUMBER : {orderDetail.confirmation_number}</Text>

                    <FlatList
                        data={orderDetail.line_items}
                        renderItem={renderOrderList}
                        contentContainerStyle={{ padding: 20, borderWidth: 1, marginTop: 20, borderRadius: 10 }}
                    />
                    <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Created At: </Text>
                        <Text style={{ fontSize: 16 }}>{getTime(orderDetail.created_at)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Discount: </Text>
                        <Text style={{ fontSize: 16 }}>{orderDetail.current_total_discounts}</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Shipping Address: </Text>
                        <Text style={{ fontSize: 16 }}>Country: {orderDetail.billing_address.country}</Text>
                        <Text style={{ fontSize: 16 }}>Province: {orderDetail.billing_address.province}</Text>
                        <Text style={{ fontSize: 16 }}>Country Code: {orderDetail.billing_address.country_code}</Text>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>Shipping Rate: {shippingRates[0]?.amount}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleApplePay} style={{
                    width: '90%',
                    backgroundColor: Colors.EERIE_BLACK,
                    height: 50,
                    alignSelf: 'center',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={styles.checkoutButtonText}>Pay {parseInt(orderDetail.current_subtotal_price.replace(/\.0+$/, '')) + shippingRates[0]?.amount} {orderDetail.currency}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* WebView Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeWebViewModal}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <WebView
                        source={{ uri: webUrl }}
                        style={{ flex: 1 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        onError={() => Alert.alert('Error', 'Failed to load the page')}
                    />
                    <Button title="Close" onPress={closeWebViewModal} />
                </View>
            </Modal>
        </View>
    );
};

export default OrderDetailScreen;
