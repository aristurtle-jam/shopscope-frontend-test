import _ from 'lodash';
import { take, put, fork, call, takeLatest } from 'redux-saga/effects';
import {
  API_FORGOT_PASSWORD,
  API_GET_PRODUCTS,
  API_LOGIN, API_LOGOUT, API_RESET_PASSWORD, API_SIGNUP, API_VERIFY_OTP, API_ADD_TO_WISHLIST, API_GET_WISHLIST, API_REMOVE_FROM_WISHLIST, API_GET_PRODUCT_BY_ID, API_UPDATE_VARIANT
} from '../../config/webService';
import { callRequest, callRequestFileUpload } from '../../utils/ApiSauce';
import { NavigationService } from '../../config';
import { showSnackbar } from '../snackbar';
import { GET_PRODUCTS, GET_PRODUCTS_BY_ID, failureProducts, failureProductById, successProductById, successProducts, ADD_TO_WISHLIST, successAddToWishlist, failureAddToWishlist, GET_WISHLIST, successGetWishlist, failureGetWishlist, REMOVE_FROM_WISHLIST, successRemoveFromWishlist, failureRemoveFromWishlist, UPDATE_VARIANT, successUpdateVariant } from '.';
import { tags } from 'react-native-svg/lib/typescript/xmlTags';



function* watchGetProducts(): any {
  while (true) {
    const { payload } = yield take(GET_PRODUCTS.REQUEST);
    console.log('PRODUCTS PAYLOAD: ', payload)
    try {
      let response = yield call(callRequest, API_GET_PRODUCTS, payload);
      // console.log('PRODUCTS RESPONSE: ', response)

      if (response) {
        yield put(successProducts({ productList: response, fromProductListScreen: payload.fromProductListScreen }));
      }
    } catch (error: any) {
      yield put(failureProducts({ errorMessage: error }));
      yield put(showSnackbar({message: error.message, type: 'error'}))
    }
  }
}

function* watchGetProductById(): any {
  while (true) {
    const { payload } = yield take(GET_PRODUCTS_BY_ID.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_PRODUCT_BY_ID, {}, {}, payload.id);
      if (response) {
        yield put(successProductById(response.data));
      }
    } catch (error: any) {
      yield put(failureProductById({ errorMessage: error }));
      yield put(showSnackbar({message: error.message, type: 'error'}))
    }
  }
}

function* watchAddToWishlist(): any {
  while (true) {
    const { payload } = yield take(ADD_TO_WISHLIST.REQUEST);
    try {
      let response = yield call(callRequest, API_ADD_TO_WISHLIST, {productId: payload.productId, variantId: payload.selectedVariantId, tags: payload.tags});
      if (response.data) {
        yield put(successAddToWishlist())
        yield put(showSnackbar({ message: "Added to your wishlist.", type: "success" }));
      }
    } catch (error: any) {
      yield put(failureAddToWishlist({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchGetWishlist(): any {
  while (true) {
    const { payload } = yield take(GET_WISHLIST.REQUEST);
    try {
      let response = yield call(callRequest, API_GET_WISHLIST, payload);
      if (response.data) {
        yield put(successGetWishlist({wishlist: response.data, reset: payload.reset}))
      }
    } catch (error: any) {
      yield put(failureGetWishlist({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchRemoveFromWishList(): any {
  while (true) {
    const { payload } = yield take(REMOVE_FROM_WISHLIST.REQUEST);
    try {
      let response = yield call(callRequest, API_REMOVE_FROM_WISHLIST, {}, {}, payload.id);
      if (response) {
        yield put(successRemoveFromWishlist({id: payload.id}))
        yield put(showSnackbar({ message: 'item removed from wishlist', type: 'success' }));
      }
    } catch (error: any) {
      yield put(failureRemoveFromWishlist({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}

function* watchUpdateWishlist(): any {
  while (true) {
    const { payload } = yield take(UPDATE_VARIANT.REQUEST);
    try {
      let response = yield call(callRequest, API_UPDATE_VARIANT, {productId: payload.productId, variantId: payload.selectedVariantId});
      if (response) {
        yield put(successUpdateVariant(payload))
        yield put(showSnackbar({ message: "Updated wishlist.", type: "success" }));
      }
    } catch (error: any) {
      yield put(failureAddToWishlist({ errorMessage: error }));
      yield put(showSnackbar({ message: error.message, type: 'error' }));
    }
  }
}




export default function* root() {
  yield fork(watchGetProducts);
  yield fork(watchAddToWishlist);
  yield fork(watchGetWishlist);
  yield fork(watchRemoveFromWishList);
  yield fork(watchGetProductById);
  yield fork(watchUpdateWishlist);
}
