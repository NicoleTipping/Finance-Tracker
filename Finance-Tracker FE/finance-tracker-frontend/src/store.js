import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import {
    userLoginReducer,
    userLogoutReducer,
    userRegisterReducer
} from './reducers/userReducers';
import{
    transactionAddReducer,
    transactionEditReducer,
    transactionDeleteReducer,
    transactionDetailsFetchReducer
} from './reducers/transactionReducer';
import {
    fetchTransactionReducer
} from './reducers/homeReducers';

const reducers = combineReducers({
    login: userLoginReducer,
    logout: userLogoutReducer,
    userRegister: userRegisterReducer,
    transactionCreation: transactionAddReducer,
    transactionEdit: transactionEditReducer,
    transactionDelete: transactionDeleteReducer,
    fetchTransaction: fetchTransactionReducer,
    transactionDetails: transactionDetailsFetchReducer 

});

const userInfoFromSessionStorage = sessionStorage.getItem("userInfo")
    ? JSON.parse(sessionStorage.getItem("userInfo"))
    : null;

const initialState = {
    login: { userInfo: userInfoFromSessionStorage }
};

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;