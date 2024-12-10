import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions } from '../ActionTypes';

export const [
    ADD_TO_CART,
    requestAddToCart,
    successAddToCart,
    failureAddToCart,
] = makeRequesActions('ADD_TO_CART');

export const [
    UPDATE_ITEM_QUANTITY,
    requestUpdateItemQuantity,
    successUpdateItemQuantity,
    failureUpdateItemQuantity,
] = makeRequesActions('UPDATE_ITEM_QUANTITY');

export const updateItemQuantity = (productId: any, quantity: any) => ({
    type: UPDATE_ITEM_QUANTITY.SUCCESS,
    payload: { productId, quantity }
});

const initialState: any = {
    cartList: [],
    totalPrice: 0,
};

// Helper function to calculate total price
const calculateTotalPrice = (cartList: any) => {
    return cartList.reduce((total: any, item: any) => total + (parseInt(item.selectedVariantIdPrice) * item.quantity), 0);
};

// init reducer
export default createReducer(initialState, builder => {
    builder.addCase(ADD_TO_CART.SUCCESS, (state, action) => {
        const product = action.payload.product;
        const removeFromCart = action.payload.removeFromCart;

        if (removeFromCart) {
            state.cartList = state.cartList.filter((item: any) => item._id !== product._id);
        } else {
            const existingItem: any = state.cartList.find((item: any) => item._id === product._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartList.push({ ...product, quantity: 1 });
            }
        }

        state.totalPrice = calculateTotalPrice(state.cartList);
    });

    builder.addCase(UPDATE_ITEM_QUANTITY.SUCCESS, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.cartList.find((item: any) => item._id === productId);
        if (item) {
            item.quantity = quantity;
        }
        state.totalPrice = calculateTotalPrice(state.cartList);
    });

    builder.addCase(ADD_TO_CART.FAILURE, (state, action) => {});
});
