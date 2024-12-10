// ApplePayModule.js
import { NativeModules } from 'react-native';
import { useDispatch } from 'react-redux';
const { ApplePayModule } = NativeModules;

const initialize = (apiKey: string, domain: string) => {
  return new Promise((resolve, reject) => {
    ApplePayModule.initialize(apiKey, domain)
      .then(resolve)
      .catch(reject);
  });
};

const formatOrderDetails = (order: any) => {
  const items = order.line_items.map((item: any) => ({
      label: item.name,
      amount: item.price,
      quantity: item.quantity, // Include quantity if needed
  }));

  const totalAmount = order.current_total_price;

  return {
      items,
      totalAmount,
      currencyCode: order.currency,
      countryCode: order.billing_address.country_code,
      email: "hunainhumail786@gmail.com", // Include email
      shippingAddress: {
          address1: "test address",
          city: "Karachi",
          country: order.shipping_address.country,
          firstName: "Hunain",
          lastName: "Humail",
          province: order.shipping_address.province,
          zip: "75300",
      },
      shippingRate: {
        handle: "standard_shipping", // Placeholder for shipping rate handle
        price: "5.00", // Hardcoded shipping rate cost
    },
    shippingLine: "Standard Shipping" 
  };
};

  
  const startApplePayCheckout = (orderDetails, checkoutId, shippingRates) => {
    const formattedOrderDetails = formatOrderDetails(orderDetails);
    return new Promise((resolve, reject) => {
      ApplePayModule.startApplePayCheckout(formattedOrderDetails, checkoutId, shippingRates)
        .then(resolve)
        .catch(reject);
    });
  };

  const createCheckout = async (orderDetails: any): Promise<string> => {
    try {
      const checkoutId = await ApplePayModule.createCheckout(orderDetails);
      return checkoutId;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };

  const fetchAvailableShippingRates = async (checkoutId: any): Promise<string> => {
    try {
      const shippingRates = await ApplePayModule.fetchAvailableShippingRates(checkoutId);
      return shippingRates;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };

  const updateCheckoutWithShippingRate = async (checkoutId: any, shippingRateHandle: any): Promise<string> => {
    try {
      const webUrl = await ApplePayModule.updateCheckoutWithShippingRate(checkoutId, shippingRateHandle);
      return webUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  };
  

export default {
  initialize,
  startApplePayCheckout,
  createCheckout,
  fetchAvailableShippingRates,
  updateCheckoutWithShippingRate
};
