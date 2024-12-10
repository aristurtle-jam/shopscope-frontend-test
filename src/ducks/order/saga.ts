import _ from 'lodash';
import { take, put, fork, call } from 'redux-saga/effects';
import { API_CREATE_ORDER, API_CREATE_ORDER_URL, API_GET_ALL_ORDERS } from '../../config/webService';
import { callRequest } from '../../utils/ApiSauce';
import { NavigationService } from '../../config';
import { showSnackbar } from '../snackbar';
import { CREATE_ORDER, GET_ALL_ORDERS, failureCreateOrder, failureGetAllOrders, successCreateOrder, successGetAllOrders, successShippingRates } from '.';
import ApplePayModule from '../../utils/ApplePayModule';
import AsyncStorage from '@react-native-async-storage/async-storage';



function* watchCreateOrder(): any {
  while (true) {
    const { payload } = yield take(CREATE_ORDER.REQUEST);
    try {
      let response = yield call(callRequest, API_CREATE_ORDER, payload.payload);
      if (response) {
        let orderDetails = response.data.data.order
        const checkoutId = yield ApplePayModule.createCheckout(orderDetails)
        const shippingRates = yield ApplePayModule.fetchAvailableShippingRates(checkoutId)
        // yield put(successShippingRates({shippingRates: shippingRates}))
        yield AsyncStorage.setItem("@shippingRates", JSON.stringify(shippingRates) )
        const webUrl = yield ApplePayModule.updateCheckoutWithShippingRate(checkoutId,
          shippingRates[0]?.handle)
        if (webUrl) {
          const data = {
            orderId: orderDetails.id,
            url: webUrl,
            shippingRates: shippingRates
          }
          const responseCheckoutUrl = yield call(callRequest, API_CREATE_ORDER_URL, data);

          yield put(successCreateOrder({ orderDetails: orderDetails, webUrl: webUrl }));
          yield put(showSnackbar({ message: 'Order Generated', type: 'success' }))
          NavigationService.reset('OrderDetailScreen', { orderDetail: response.data.data.order, shippingRates: shippingRates, webUrl: webUrl })
        }
      }
    } catch (error: any) {
      yield put(failureCreateOrder({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }))
    }
  }
}


function* watchGetAllOrders(): any {
  while (true) {
    const { payload } = yield take(GET_ALL_ORDERS.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_ALL_ORDERS, payload);
      if (response.data) {
        yield put(successGetAllOrders({ orders: response.data, reset: payload.reset }))
      }
    } catch (error: any) {
      yield put(failureGetAllOrders({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}


export default function* root() {
  yield fork(watchCreateOrder);
  yield fork(watchGetAllOrders);
}
