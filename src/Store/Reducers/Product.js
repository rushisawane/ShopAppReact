import * as actionTypes from '../Actions/actionTypes';

let initialState = {
    availableProducts:[],
    userProducts:[]
}

const productReducer = (state=initialState,actions) => {
    switch(actions.type) {
        case actionTypes.SELECT_PRODUCT:
            return {
                availableProducts:actions.products,
                userProducts:actions.userProducts
            }
        }
    return state;
}

export default productReducer;