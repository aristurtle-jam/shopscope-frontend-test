import { createReducer } from '@reduxjs/toolkit';
import { makeRequesActions, makeAction } from '../ActionTypes';
import { NavigationService } from '../../config';

export const [
    GET_PRODUCTS,
    requestProducts,
    successProducts,
    failureProducts,
] = makeRequesActions('GET_PRODUCTS');

export const [
    GET_PRODUCTS_BY_ID,
    requestProductsById,
    successProductById,
    failureProductById,
] = makeRequesActions('GET_PRODUCTS_BY_ID');

export const [
    ADD_TO_WISHLIST,
    requestAddToWishlist,
    successAddToWishlist,
    failureAddToWishlist,
] = makeRequesActions('ADD_TO_WISHLIST');

export const [
    GET_WISHLIST,
    requestGetWishlist,
    successGetWishlist,
    failureGetWishlist,
] = makeRequesActions('GET_WISHLIST');

export const [
    REMOVE_FROM_WISHLIST,
    requestRemoveFromWishlist,
    successRemoveFromWishlist,
    failureRemoveFromWishlist,
] = makeRequesActions('REMOVE_FROM_WISHLIST');

export const [
    UPDATE_VARIANT,
    requestUpdateVariant,
    successUpdateVariant,
    failureUpdateVariant,
] = makeRequesActions('UPDATE_VARIANT');

const initalState = {
    productList: {},
    isLoading: true,
    product: {},
    wishlistData: {},
    wishlist: [],
    isAllDataLoaded: false,
    totalItems: 0,
    totalPages: 0,
    productById: {}
};

// selectors

export const getUserToken = (store: any) => store.auth?.token ?? '';


// init reducer
export default createReducer(initalState, builder => {
    builder.addCase(GET_PRODUCTS.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_PRODUCTS.SUCCESS, (state, action) => {
        state.isLoading = false
        let fromProductListScreen = action.payload.fromProductListScreen
        if (fromProductListScreen) {
            state.productList = action.payload
        }
        else {
            state.productList = action.payload
        }
        state.isLoading = false
    });
    builder.addCase(GET_PRODUCTS.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_PRODUCTS_BY_ID.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_PRODUCTS_BY_ID.SUCCESS, (state, action) => {
        state.isLoading = false
        state.productById = action.payload
        NavigationService.navigate('ProductDetail', {product: action.payload.product})

    });
    builder.addCase(GET_PRODUCTS_BY_ID.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(GET_WISHLIST.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(GET_WISHLIST.SUCCESS, (state, action) => {
        if (action.payload.reset) {
            // Reset the wishlist if the reset flag is true
            state.wishlist = action.payload.wishlist.wishLists || [];
        } else if (Array.isArray(action.payload.wishlist.wishLists)) {
            // Append new data to existing list only if it's an array and reset flag is not true
            state.wishlist = [...state.wishlist, ...action.payload.wishlist.wishLists];
        }
        state.totalItems = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
        state.isAllDataLoaded = (state.wishlist.length >= state.totalItems);
        state.isLoading = false;
        state.wishlistData = action.payload.wishlist;
    });
    builder.addCase(GET_WISHLIST.FAILURE, (state, action) => {
        state.isLoading = false
    });
    builder.addCase(REMOVE_FROM_WISHLIST.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(REMOVE_FROM_WISHLIST.SUCCESS, (state, action) => {
        state.isLoading = false;
        const index = state.wishlist.findIndex((item: any) => item._id === action.payload.id);
        if (index !== -1) {
            state.wishlist.splice(index, 1);
        }
    });
    builder.addCase(REMOVE_FROM_WISHLIST.FAILURE, (state, action) => {
        state.isLoading = false
    });

    builder.addCase(UPDATE_VARIANT.REQUEST, (state, action) => {
        state.isLoading = true
    });
    builder.addCase(UPDATE_VARIANT.SUCCESS, (state, action) => {
        state.isLoading = false;
        state.wishlist = state.wishlist.map(item =>
            item.productId === action.payload.productId
              ? { ...item, selectedVariantId: action.payload.selectedVariantId }
              : item
          );
    });
    builder.addCase(UPDATE_VARIANT.FAILURE, (state, action) => {
        state.isLoading = false
    });
});
