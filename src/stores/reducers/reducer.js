import {
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_DETAILS_SUCCESS,
    FETCH_PRODUCTS_REVIEWS_SUCCESS,
    AUTHORISATION_SUCCESS,
    REGISTRATION_SUCCESS,
    LOGOUT,
    SEND_COMMENT_SUCCESS
} from "../constants/ActionTypes";

const initialState = {
    allProducts: [],
    currentProduct: [],
    currentProductReviews: [],
    buttonName: localStorage.getItem("token") ? "Log out" : "Log in",
    isLoadingRew: false,
    isLoginAuth: localStorage.getItem("token") ? true : false,
    isRegistration: localStorage.getItem("token") ? true : false,
    isComment: false,
    userName: localStorage.getItem("userName")
        ? localStorage.getItem("userName")
        : "",
    buttonHide: !localStorage.getItem("token") ? true : false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_COMMENT_SUCCESS:
            return {
                ...state,
                isComment: action.payload.isComment
            };
        case AUTHORISATION_SUCCESS:
            return {
                ...state,
                isLoginAuth: action.payload.isLoginAuth,
                buttonName: action.payload.buttonName,
                userName: action.payload.userName,
                buttonHide: action.payload.buttonHide
            };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isRegistration: action.payload.isRegistration,
                isLoginAuth: action.payload.isLoginAuth,
                buttonName: action.payload.buttonName,
                userName: action.payload.userName,
                buttonHide: action.payload.buttonHide
            };
        case LOGOUT:
            return {
                ...state,
                isLoginAuth: action.payload.isLoginAuth,
                isRegistration: action.payload.isRegistration,
                buttonName: action.payload.buttonName,
                userName: action.payload.userName,
                buttonHide: action.payload.buttonHide
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                allProducts: action.payload.data
            };
        case FETCH_PRODUCTS_DETAILS_SUCCESS:
            return {
                ...state,
                currentProduct: action.payload.currentProduct
            };
        case FETCH_PRODUCTS_REVIEWS_SUCCESS:
            return {
                ...state,
                currentProductReviews: action.payload.currentProductReviews,
                isLoadingRew: action.payload.isLoadingRew,
                isComment: action.payload.isComment
            };
        default:
            return state;
    }
};

export default reducer;
