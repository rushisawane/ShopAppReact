import * as actionTypes from '../Actions/actionTypes';
import Order from '../../model/order';

const initialState = {
    orders:[]
}

const orderReducer = (state=initialState,action) => {

    switch(action.type) {
        case actionTypes.SELECT_ORDER:
            return {
                orders:action.orders
            }
        case actionTypes.ADD_ORDER:
            const itemtoadd = action.cartDetail.items;
            const total = action.cartDetail.total
            const addOrder = new Order(
                action.cartDetail.id,
                itemtoadd,
                total,
                action.cartDetail.date
            );
           return {...state,
                orders:state.orders.concat(addOrder)
        };
    }
    return state;
}


export default orderReducer;