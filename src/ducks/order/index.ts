import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions, makeAction } from '../ActionTypes';

export const [
    CREATE_ORDER,
    requestCreateOrder,
    successCreateOrder,
    failureCreateOrder,
] = makeRequesActions('CREATE_ORDER');

export const [
    GET_ALL_ORDERS,
    requestGetAllOrders,
    successGetAllOrders,
    failureGetAllOrders,
] = makeRequesActions('GET_ALL_ORDERS');

export const [
    GET_SHIPPING_RATES,
    requestShippingRates,
    successShippingRates,
    failureShippingRates,
] = makeRequesActions('GET_SHIPPING_RATES');

const initalState: any = {
    orderDetails: {},
    isLoading: false,
    ordersList: {},
    webUrl: null,
    shippingRates: {}
};

// selectors

export const getUserToken = (store: any) => store.auth?.token ?? '';


// init reducer
export default createReducer(initalState, builder => {
    builder.addCase(CREATE_ORDER.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(CREATE_ORDER.SUCCESS, (state, action) => {
        state.isLoading = false
        state.orderDetails = action.payload.orderDetails
        state.webUrl = action.payload.webUrl
    });
    builder.addCase(CREATE_ORDER.FAILURE, (state, action) => {
        state.isLoading = false
    });

    builder.addCase(GET_ALL_ORDERS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_ALL_ORDERS.SUCCESS, (state, action) => {
        if (action.payload.reset) {
            // Reset the wishlist if the reset flag is true
            state.ordersList = action.payload.orders.orders || [];
        } else if (Array.isArray(action.payload.orders.orders)) {
            // Append new data to existing list only if it's an array and reset flag is not true
            state.ordersList =  action.payload.orders.orders
        }

        // state.isLoading = false;
        // state.ordersList = action.payload.orders.orders;
    });
    builder.addCase(GET_ALL_ORDERS.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_SHIPPING_RATES.SUCCESS, (state, action) => {
        state.shippingRates = action.payload.shippingRates
    });

});
