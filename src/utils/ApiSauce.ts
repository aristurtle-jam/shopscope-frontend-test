import _ from 'lodash';
import { create } from 'apisauce';
import { eventChannel, END } from 'redux-saga';
import {
    API_LOG,
    BASE_URL,
    API_TIMEOUT,
    REQUEST_TYPE,
    X_API_TOKEN,
} from '../config/webService';
import { getUserToken, UserKicked } from '../ducks/auth';
import DataHandler from './DataHandler';
import { NavigationService } from '../config';



const api = create({
    baseURL: BASE_URL(),
    timeout: API_TIMEOUT,
});

function getHeaders() {
    const defaultHeader: any = {};

    // set X-API-TOKEN
    const token = DataHandler.getStore().getState().auth.token;
    defaultHeader.token = token;
    return defaultHeader;
}

function serialize(obj: any) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
    }
    return str.join('&');
}

export async function callRequestFileUpload(uri: any, payload: any, parameter?: any) {
    let formData: FormData;
    if (payload instanceof FormData) {
        formData = payload;
    }
    else {
        formData = new FormData();
        const photo = { uri, type: 'image/jpeg', name: 'image.jpg' };
        formData.append('file', photo);
        Object.keys(payload).forEach(key => {
            formData.append(key, payload[key]);
        });
    }

    // Append additional payload data
    

    const url = uri;
    const headers: any = {};

    let { route, access_token_required, type } = url;
    let method = 'POST'; // Default to POST

    if (type && type === REQUEST_TYPE.PUT) {
        method = 'PUT';
    }
    // Set Authorization header if access token is required
    route =  parameter && parameter !== '' ? url.route + '/' + parameter : route;
    if (access_token_required) {
        const token = DataHandler.getStore().getState().auth.token;
        headers.token = token;
    }
    headers['Content-Type'] = 'multipart/form-data';

    const headerObject = { headers };

    // Make the request with payload and headers
    let response;

    if (method === 'PUT') {
        response = await api.put(route, formData, headerObject);

    } else {
        response = await api.post(route, formData, headerObject);
    }

    // Optional: Log the response for debugging purposes
    if (__DEV__ && API_LOG) {
        console.log('URL:', url);
        console.log('Response:', response);
        console.log('Payload:', formData);
        console.log('Headers:', headers);
    }

    // Handle the response
    return handleResponse(response);
}

export async function callRequest(url: any, payload: any, headers: any = {}, parameter = '') {
    // get attributes from url

    const { type, access_token_required, includeInPath } = url;
    const isFileUpload = false;
    const route =
        parameter && parameter !== '' ? url.route + '/' + parameter : url.route;

    // set end point
    let endPoint = `${BASE_URL()}${route}`;

    // set X-API-TOKEN
    if (access_token_required) {
        // set headers
        headers = { ...getHeaders(), ...headers };
    }

    // set payload for get query string
    if (
        (type === REQUEST_TYPE.GET || type === REQUEST_TYPE.DELETE) &&
        !_.isEmpty(payload)
    ) {
        const queryParameters = serialize(payload);
        if (queryParameters) {
            endPoint = `${endPoint}?${queryParameters}`;
        }
    }

    // log web service response
    if (__DEV__ && API_LOG) {
        console.log('url', url);
        console.log('endPoint', endPoint);
        console.log('payload', payload);
        console.log('headers', headers);
        console.log('route', route);
    }

    // send request and resolve the promise
    return new Promise((resolve, reject) => {
        let customOptions = {};

        if (type !== REQUEST_TYPE.GET && isFileUpload) {
            customOptions = { body: { formData: payload } };
        } else if (type !== REQUEST_TYPE.GET) {
            customOptions = { body: JSON.stringify(payload) };
        }

        const customHeaders = isFileUpload
            ? { accept: 'application/json, text/plain, /' }
            : { Accept: 'application/json', 'Content-Type': 'application/json' };

        console.log('custom options', customOptions);
        console.log('customHeaders', customHeaders);

        fetch(endPoint, {
            method: type,
            // timeoutInterval: API_TIMEOUT, // milliseconds
            ...customOptions,
            headers: {
                ...customHeaders,
                ...headers,
            },
            // disableAllSecurity: true,
        })
            .then(responseApi => {
                console.log('IN RESOLVE ===========----------->', responseApi);
                handleResponseNew(responseApi, resolve, reject);
            })
            .catch(error => {
                console.log('IN REJECT ============----------->', error);

                handleResponseNew(error, resolve, reject);
            });
        //}
    });
}

export async function handleResponseNew(responseApi: any, resolve: any, reject: any) {
    let response: any = { status: responseApi.status };
    try {
        response.data = await responseApi.json();

        console.log('JSONED', response);

        const isClientError =
            response.problem === 'CLIENT_ERROR' ||
            response.status === 400 ||
            response.status === 401;
        // kick user from server
        const isKickUser =
            response.status === 400 ||
            (response.status === 401 && response?.data?.message === 'Unauthorized');

        const isResponseValid =
            response.data && (response.status === 200 || response.status === 201);
        if (isResponseValid) {
            resolve(response.data);
        } else if (isKickUser) {
            let msg =
                response?.data?.message === 'USER_SUSPEND'
                    ? 'User Suspended'
                    : response?.data?.message === 'ACCOUNT_DELETED'
                        ? 'User Accound deleted'
                        : 'Your session has been expired! Please Re-login';
            //
            reject({
                message: msg,
                statusCode: 403,
            });


            DataHandler.getStore().dispatch(UserKicked());
            console.log(msg) // ADD SNACKBAR/TOAST IN PLACE OF THIS
            NavigationService.reset('Login');
        } else if (isClientError) {
            
            reject(parseErrorResponse(response.data, response.status));
        } else {
            reject(parseErrorResponse(response.data, response.status));
        }
    } catch (error) {
        console.log('JSONED ERROR', response);
        if (!DataHandler.networkInfo()) {
            reject({
                message: 'Network not available',
                statusCode: response.status,
            });
        } else {
            reject(parseErrorResponse(response.data, response.status));
        }
    }
}


export function handleResponse(response: any) {
    return new Promise((resolve, reject) => {
        // network error  internet not working
        const isNetWorkError = response.problem === 'NETWORK_ERROR';
        // network error  internet not working
        const isClientError = response.problem === 'CLIENT_ERROR';
        // kick user from server
        const isKickUser = response.status === 403;
        // if response is valid
        const isResponseValid = (response.status === 200 || response.status === 201) && response.data;
        //  && response.data.message;
        // response status
        const status = response?.status ?? 500;

        if (isResponseValid) {
            resolve(response.data);
        } else if (isNetWorkError) {
            if (DataHandler.getIsInternetConnected()) {
                reject({
                    message: 'Something went wrong',
                    statusCode: status,
                });
            } else {
                reject({
                    message: 'Network not available',
                    statusCode: status,
                });
            }
        } else if (isKickUser) {
            reject({
                message: 'Your session has been expired! Please Re-login',
                statusCode: 403,
            });
            // DataHandler.getStore().dispatch(UserKicked());
            setTimeout(() => {
                console.log('Your session has been expired! Please Re-login') // ADD SNACKBAR/TOAST IN PLACE OF THIS
                NavigationService.reset('Login');
            }, 200);
        } else if (isClientError) {
            reject({
                message: response?.data?.message
                    ? response.data.message
                    : 'Something went wrong',
                statusCode: status,
            });
        } else {
            reject({
                message: 'Something went wrong',
                statusCode: status,
            });
        }
    });
}

function parseErrorResponse(data: any, status: any) {
    if (data.data && data.data.errors && typeof data.data.errors === 'object') {
        return {
            message: formatErrorMessage(data.data.errors),
            statusCode: status,
        };
    }
    if (data.msg && typeof data.msg === 'string') {
        return {
            message: data.msg,
            data: data.data,
            statusCode: data.status,
        };
    }
    return {
        message: 'Unexpected error occurred, please contact support.',
        statusCode: status,
    };
}

function formatErrorMessage(errors: any) {
    return Object.keys(errors).map(key => `${errors[key].join(", ")}`).join(", ");
}