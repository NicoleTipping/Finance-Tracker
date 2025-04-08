import axios from "axios";
import { LOGIN_API, BACKEND_URL_ENDPOINT } from '../constants/backend';
import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    // USER_DETAILS_REQUEST,
    // USER_DETAILS_SUCCESS,
    // USER_DETAILS_FAILURE,
    // USER_DETAILS_UPDATE_REQUEST,
    // USER_DETAILS_UPDATE_SUCCESS,
    // USER_DETAILS_UPDATE_FAILURE,
    // USER_LIST_SUCCESS,
    // USER_LIST_FAILURE,
    // USER_LIST_REQUEST,
    // USER_DELETE_REQUEST,
    // USER_DELETE_SUCCESS,
    // USER_DELETE_FAILURE,
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
} from '../constants/userActionConstants';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await axios.post(LOGIN_API, { username, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data,
            success: "Login successful"
        });

        sessionStorage.setItem("userInfo", JSON.stringify(response.data.data));

    } catch (err) {
        console.error("Login error:", err.response?.data || err.message);

        dispatch({
            type: LOGIN_FAILURE,
            payload: err.response?.data?.error || "Unable to login"
        });
    }
};

export const registerUser = (firstname, lastname, email, username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        await axios
            .post(
                BACKEND_URL_ENDPOINT + "users/signup", { firstname, lastname, email, username, password }, config
            )
            .then((res) => {
                if (res.status === 201) {
                    dispatch({
                        type: USER_REGISTER_SUCCESS,
                        payload: res.data.message
                    });
                } else {
                    dispatch({
                        type: USER_REGISTER_FAILURE,
                        payload: res.data.message
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: USER_REGISTER_FAILURE,
                    payload: err.response.data.error
                })
            })
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: err.message
        });
    }
}

export const logOut = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: 'Successfully logged out'
        });

        sessionStorage.removeItem("userInfo");
        window.location.replace('/');

    } catch (err) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: err.message
        });
    }
}