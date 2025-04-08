import {
    HOME_TRAN_FETCH_SUCCESS,
    HOME_TRAN_FETCH_FAILURE,
    HOME_TRAN_FETCH_REQUEST
} from '../constants/homeActionConstants';

const initialState = {
    transactions: [],
    loading:false,
    error: null
};

export const fetchTransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_TRAN_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case HOME_TRAN_FETCH_SUCCESS:
            return {
                loading: false,
                transactions: action.payload
            };
        case HOME_TRAN_FETCH_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};