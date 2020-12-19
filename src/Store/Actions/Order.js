import * as actionTypes from './actionTypes';
import Order from "../../model/order";

export const selectOrder = () => {
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://shopapp-43c5a.firebaseio.com/orders/${userId}.json`);
        if(!response.ok) {
            throw new Error('Something went wrong');
        }
        const resData = await response.json();
        const loadedOrders = [];

        for(const key in resData) {
            loadedOrders.push(new Order(
                key,
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date(resData[key].date)
            ))
        }

        dispatch({
            type:actionTypes.SELECT_ORDER,
            orders:loadedOrders
        })
            
        } catch (error) {
            throw(error);
        }
        
    }

}
export const addOrder = (cartItems,totalAmount) => {
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date().toISOString();
        const response = await fetch(`https://shopapp-43c5a.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                date
            })
        })

        if(!response.ok) {
            throw new Error('Something went wrong.')
        }
        const result = await response.json();

        dispatch ({
            type:actionTypes.ADD_ORDER,
            cartDetail:{ id:result.name,items:cartItems,total:totalAmount,date:date }
        });
    }
}

