let store: any;
let isLogin: boolean = false;
let isInternetConnected: boolean = true;

export default {
    setStore(value: any) {
        store = value
    },
    getStore() {
        return store;
    },

    setUserLogin(is_login: boolean) {
        isLogin = is_login;
    },
    isUserLogin() {
        return isLogin;
    },
    setInternetConnected(connected: boolean) {
        isInternetConnected = connected;
    },
    getIsInternetConnected() {
        return isInternetConnected;
    },
    networkInfo() {
        const { network } = store.getState();
        return network.isNetworkConnected;
    },
}