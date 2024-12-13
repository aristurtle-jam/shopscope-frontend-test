
export const IS_STAGING = false;

export const STAGING_BASE_URL = 'http://192.168.1.8:3000';
export const PRODUCTION_BASE_URL = 'https://shopscope-backend-test.onrender.com';
export const X_API_TOKEN = 'token';

// REQUEST TYPES
export const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH',
};

export const LIMIT = 10;
export const API_TIMEOUT = 30000;
export const API = '/api/';
export const API_LOG = true;

export const BASE_URL = () => {
    return PRODUCTION_BASE_URL
};

// AUHT API ROUTES
export const API_SIGNUP = {
    route: `${API}customer/sign-up`,
    access_token_required: false,
    type: REQUEST_TYPE.POST,
};
export const API_LOGIN = {
    route: `${API}customer/log-in`,
    access_token_required: false,
    type: REQUEST_TYPE.POST,
};
export const API_LOGOUT = {
    route: `${API}customer/log-out`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}
export const API_FORGOT_PASSWORD = {
    route: `${API}customer/generate-otp`,
    access_token_required: false,
    type: REQUEST_TYPE.GET,
}
export const API_VERIFY_OTP = {
    route: `${API}customer/verify-otp`,
    access_token_required: false,
    type: REQUEST_TYPE.GET,
}
export const API_RESET_PASSWORD = {
    route: `${API}customer/forgot-password`,
    access_token_required: false,
    type: REQUEST_TYPE.POST,
}

//PRODUCT API ROUTES

export const API_GET_PRODUCTS = {
    route: `${API}product/paginated-products`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}
export const API_GET_PRODUCT_BY_ID = {
    route: `${API}product`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}
export const API_ADD_TO_WISHLIST = {
    route: `${API}wishlist/create`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}
export const API_GET_WISHLIST = {
    route: `${API}customer/my-wishlist`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}
export const API_REMOVE_FROM_WISHLIST = {
    route: `${API}wishlist/delete`,
    access_token_required: true,
    type: REQUEST_TYPE.DELETE,
}
export const API_UPDATE_VARIANT = {
    route: `${API}wishlist/update-variant`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}


// POST API ROUTES

export const API_CREATE_POST = {
    route: `${API}post/create`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_GET_MY_POST = {
    route: `${API}customer/my-posts`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_GET_OTHERS_POST = {
    route: `${API}customer/others-posts`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_GET_ALL_POST = {
    route: `${API}post/get`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_POST_LIKE = {
    route: `${API}post/like`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_POST_DISLIKE = {
    route: `${API}post/dislike`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_POST_DELETE = {
    route: `${API}post/delete`,
    access_token_required: true,
    type: REQUEST_TYPE.DELETE,
}

export const API_EDIT_POST = {
    route: `${API}post/update`,
    access_token_required: true,
    type: REQUEST_TYPE.PUT,
}


// PROFILE API ROUTES

export const API_GET_MY_PROFILE = {
    route: `${API}customer/my-profile`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_UPDATE_PROFILE = {
    route: `${API}customer/update-profile`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_UPDATE_PASSWORD = {
    route: `${API}customer/update-password`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_GET_OTHERS_PROFILE = {
    route: `${API}customer/others-profile`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_GET_NOTIFICATIONS = {
    route: `${API}customer/my-notifications`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

export const API_FOLLOW_USER = {
    route: `${API}customer/follow`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_UNFOLLOW_USER = {
    route: `${API}customer/un-follow`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

// ORDER API

export const API_CREATE_ORDER = {
    route: `${API}order/create-order`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_CREATE_ORDER_URL = {
    route: `${API}order/create-order-url`,
    access_token_required: true,
    type: REQUEST_TYPE.POST,
}

export const API_GET_ALL_ORDERS = {
    route: `${API}customer/orders/any`,
    access_token_required: true,
    type: REQUEST_TYPE.GET,
}

// USERS API ROUTES

export const API_GET_ALL_USERS = {
    route: `${API}customer/all-users`, 
    access_token_required: true,
    type: REQUEST_TYPE.GET,
  };

