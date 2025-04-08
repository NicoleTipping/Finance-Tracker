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

export const transactionAddReducer = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TRANSACTION_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };
        case TRANSACTION_CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const transactionEditReducer = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_EDIT_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            };
        case TRANSACTION_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                successUpdate: true,
                transaction: action.payload
            };
        case TRANSACTION_EDIT_FAILURE:
            return {
                ...state,
                loading: false,
                success: null,
                errorUpdate: action.payload
            };
        default:
            return state;
    }
};

export const transactionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                success: null,
                error: null
            };
        case TRANSACTION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
                error: null
            };
        case TRANSACTION_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                success: null,
                error: action.payload
            };
        default:
            return state;
    }
};

export const transactionDetailsFetchReducer = (state = {}, action) => {
    switch (action.type) {
        case TRANSACTION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case TRANSACTION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                transaction: action.payload
            };
        case TRANSACTION_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};