import * as actionTypes from './actionTypes';

export const addToCart = product => {
    return {
        type:actionTypes.ADD_TO_CART,
        product:product
    };
};

export const deleteFromCart = productId => {
    return {
        type:actionTypes.DELETE_FROM_CART,
        pid:productId
    };
};