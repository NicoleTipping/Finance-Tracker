import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";
import {
    HOME_TRAN_FETCH_SUCCESS,
    HOME_TRAN_FETCH_FAILURE,
    HOME_TRAN_FETCH_REQUEST
} from '../constants/homeActionConstants';

export const fetchTransactionForHome = () => async (dispatch) => {
    try {
        dispatch({ type: HOME_TRAN_FETCH_REQUEST });

        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.sessionToken}`
            }
        };

        const response = await axios.get(
            BACKEND_URL_ENDPOINT + 'transaction/',
            config
        );

        dispatch({
            type: HOME_TRAN_FETCH_SUCCESS,
            payload: response.data
        });

    }
    catch (err) {
        dispatch({
            type: HOME_TRAN_FETCH_FAILURE,
            payload: err.response.data.message
        });
    }
};