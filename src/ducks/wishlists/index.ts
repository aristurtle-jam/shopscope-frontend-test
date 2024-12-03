import { createReducer } from "@reduxjs/toolkit";
import { makeRequesActions } from "../ActionTypes";
import { initial } from "lodash";

export const [
    GET_MY_WISHLIST,
    requestMyWishlist,
    successMyWishlist,
    failureMyWishlist,
] = makeRequesActions('GET_MY_WISHLIST');

const initialState = {
    myWishlist: [],
    isLoading: false,
    error: null,
};

export default createReducer(initialState, (builder) => {
    builder.addCase(GET_MY_WISHLIST.REQUEST, (state) => {
        state.isLoading = true;
    });
    builder.addCase(GET_MY_WISHLIST.SUCCESS, (state, action) => {
        state.isLoading = false;
        state.myWishlist = action.payload;  // Update the state with the fetched users
    });
    builder.addCase(GET_MY_WISHLIST.FAILURE, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.errorMessage; 
    });
});

export const selectMyWishlist = (state: any) => state.wishlists.myWishlist || [];
export const selectIsLoading = (state: any) => state.wishlists.isLoading;
export const selectError = (state: any) => state.wishlists.error;