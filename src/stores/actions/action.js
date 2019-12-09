import axios from "axios";
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_DETAILS,
    FETCH_PRODUCTS_DETAILS_SUCCESS,
    FETCH_PRODUCTS_DETAILS_ERROR,
    FETCH_PRODUCTS_REVIEWS,
    FETCH_PRODUCTS_REVIEWS_SUCCESS,
    FETCH_PRODUCTS_REVIEWS_ERROR,
    REGISTRATION,
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    AUTHORISATION,
    AUTHORISATION_SUCCESS,
    AUTHORISATION_ERROR,
    SEND_COMMENT,
    SEND_COMMENT_SUCCESS,
    SEND_COMMENT_ERROR,
    LOGOUT
} from "../constants/ActionTypes";

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    return {
        type: LOGOUT,
        payload: {
            buttonName: "Log in",
            isLoginAuth: false,
            isRegistration: false,
            buttonHide: true,
            userName: ""
        }
    };
};

export const authorizationUser = ({ username, password }) => async dispatch => {
    dispatch({
        type: AUTHORISATION
    });
    try {
        const { data } = await axios.post("/login/", {
            username,
            password
        });
        if (data.success) {
            dispatch({
                type: AUTHORISATION_SUCCESS,
                payload: {
                    isLoginAuth: true,
                    buttonName: "Log out",
                    buttonHide: false,
                    userName: username
                }
            });
            alert(`Hello ${username}, you are success authorization`);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", username);
            return;
        }
        alert(data.message);
    } catch (e) {
        dispatch({
            type: AUTHORISATION_ERROR,
            payload: {
                error: e
            }
        });
        console.log(e, "Error");
    }
};

export const registrUser = ({ username, password }) => async dispatch => {
    dispatch({
        type: REGISTRATION
    });
    try {
        const { data } = await axios.post("/register/", {
            username,
            password
        });
        if (data.success) {
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: {
                    isRegistration: true,
                    isLoginAuth: true,
                    buttonName: "Log out",
                    buttonHide: false,
                    userName: username
                }
            });
            alert(`Hello ${username}, you are success registration.`);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userName", username);
            return;
        }
        alert(data.message);
    } catch (e) {
        dispatch({
            type: REGISTRATION_ERROR,
            payload: {
                error: e
            }
        });
        console.log(e, "Error");
    }
};

export const fetchProducts = () => async dispatch => {
    dispatch({
        type: FETCH_PRODUCTS
    });
    try {
        const { data } = await axios.get("/products/");

        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: {
                data
            }
        });
    } catch (e) {
        dispatch({
            type: FETCH_PRODUCTS_ERROR,
            payload: {
                error: e
            }
        });
        console.log(e, "Error");
    }
};

export const fetchProductsDetails = id => async dispatch => {
    dispatch({
        type: FETCH_PRODUCTS_DETAILS
    });
    try {
        const { data } = await axios.get("/products/");
        dispatch({
            type: FETCH_PRODUCTS_DETAILS_SUCCESS,
            payload: {
                currentProduct: data.find(
                    currentProduct => currentProduct.id === +id
                )
            }
        });
    } catch (e) {
        dispatch({
            type: FETCH_PRODUCTS_DETAILS_ERROR,
            payload: {
                error: e
            }
        });
        console.log(e, "Error");
    }
};

export const fetchProductReviews = id => async dispatch => {
    dispatch({
        type: FETCH_PRODUCTS_REVIEWS
    });
    try {
        const { data } = await axios.get(`/reviews/${id}`);
        dispatch({
            type: FETCH_PRODUCTS_REVIEWS_SUCCESS,
            payload: {
                currentProductReviews: data,
                isLoadingRew: true,
                isComment: false
            }
        });
    } catch (e) {
        dispatch({
            type: FETCH_PRODUCTS_REVIEWS_ERROR,
            payload: {
                error: e
            }
        });
    }
};

export const sendComment = (id, rate, text) => async dispatch => {
    dispatch({
        type: SEND_COMMENT
    });
    try {
        const { data } = await axios(`/reviews/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                rate: rate,
                text: text
            })
        });
        dispatch({
            type: SEND_COMMENT_SUCCESS,
            payload: {
                data: data,
                isComment: true
            }
        });
    } catch (e) {
        dispatch({
            type: SEND_COMMENT_ERROR,
            payload: {
                error: e
            }
        });
        console.log(e, "Error");
    }
};
