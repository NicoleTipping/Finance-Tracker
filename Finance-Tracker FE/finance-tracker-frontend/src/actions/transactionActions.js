import axios from 'axios';
import { BACKEND_URL_ENDPOINT } from '../constants/backend';
import {
    TRANSACTION_CREATE_REQUEST,
    TRANSACTION_CREATE_SUCCESS,
    TRANSACTION_CREATE_FAILURE,
    TRANSACTION_EDIT_REQUEST,
    TRANSACTION_EDIT_SUCCESS,
    TRANSACTION_EDIT_FAILURE,
    TRANSACTION_DELETE_REQUEST,
    TRANSACTION_DELETE_SUCCESS,
    TRANSACTION_DELETE_FAILURE,
    TRANSACTION_DETAILS_REQUEST,
    TRANSACTION_DETAILS_SUCCESS,
    TRANSACTION_DETAILS_FAILURE
} from '../constants/transactionActionConstants';

export const addTransaction = (transactionName, transactionAmount, isExpense, transactionDate, categoryId) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_CREATE_REQUEST
        });

        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.sessionToken}`
            }
        };

        await axios
            .post(
                BACKEND_URL_ENDPOINT + "transaction/",
                { transactionName, transactionAmount, isExpense, transactionDate, categoryId },
                config
            )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res);
                    dispatch({
                        type: TRANSACTION_CREATE_SUCCESS,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: TRANSACTION_CREATE_FAILURE,
                        payload: res.data.message
                    });
                }
            });
    } catch (err) {
        dispatch({
            type: TRANSACTION_CREATE_FAILURE,
            payload: err.response.data.message
        });
    }
};

export const editTransaction = (transactionName, transactionAmount, isExpense, transactionDate, categoryId, transactionId) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_EDIT_REQUEST
        });

        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.sessionToken}`
            }
        };

        await axios
            .put(
                BACKEND_URL_ENDPOINT + "transaction/" + transactionId,
                { transactionName: transactionName, transactionAmount: transactionAmount, isExpense: isExpense, transactionDate: transactionDate, categoryId: categoryId },
                config
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log(res);
                    dispatch({
                        type: TRANSACTION_EDIT_SUCCESS,
                        payload: res.data.transaction
                    });
                } else {
                    dispatch({
                        type: TRANSACTION_EDIT_FAILURE,
                        payload: res.data.message
                    });
                }
            });
    } catch (err) {
        dispatch({
            type: TRANSACTION_EDIT_FAILURE,
            payload: err.response.data.message
        });
    }
};

export const deleteTransaction = (transactionId) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_DELETE_REQUEST
        });

        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.sessionToken}`
            }
        };
        console.log("Transaction Id", transactionId);

        const res = await axios.delete(BACKEND_URL_ENDPOINT + `transaction/${transactionId}`, config);


        if (res.status === 200) {
            console.log(res);
            dispatch({
                type: TRANSACTION_DELETE_SUCCESS,
                payload: res.data.message
            });
        } else {
            dispatch({
                type: TRANSACTION_DELETE_FAILURE,
                payload: res.data.message || 'Failed to delete transaction'
            });
        }
    } catch (err) {
        dispatch({
            type: TRANSACTION_DELETE_FAILURE,
            payload: err.response ? err.response.data.message : err.message || 'An error occurred'
        });
    }
};

export const fetchTransactionDetails = (transactionId) => async (dispatch) => {
    try {
        dispatch({
            type: TRANSACTION_DETAILS_REQUEST
        });

        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.sessionToken}`
            }
        };

        const res = await axios
            .get(
                BACKEND_URL_ENDPOINT + "transaction/" + transactionId,
                config
            );

        if (res.status === 200) {
            console.log(res);
            dispatch({
                type: TRANSACTION_DETAILS_SUCCESS,
                payload: res.data.transaction
            });
        } else {
            dispatch({
                type: TRANSACTION_DETAILS_FAILURE,
                payload: res.data.message
            });
        }
    } catch (err) {
        dispatch({
            type: TRANSACTION_DETAILS_FAILURE,
            payload: err.response.data.message
        });
    }
};