import React,{useState,useEffect} from 'react';
import { ListGroup,Button,Spinner } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';

import Color from '../../Constant/Color';
import CartItem from '../../Component/Shop/CartItem';
import * as actions from '../../Store/Actions/index';
import Header from '../Header';


const CartScreen = props => {
    const [error,setError] = useState();
    const [showLoader,setShowLoader] = useState(false)
    const total = useSelector(state => state.cartReducer.totalAmount);
    const isAuthenticated = useSelector(state=>state.authReducer.token!==null);
    const cartItems = useSelector(state => {
        let arrayCartItems=[];
        for(const key in state.cartReducer.item) {
            arrayCartItems.push(
                {
                    id:key,
                    quantity:state.cartReducer.item[key].quantity,
                    title:state.cartReducer.item[key].prodtitle,
                    price:state.cartReducer.item[key].prodprice,
                    sum:state.cartReducer.item[key].sum,
                }
            )
        }
        return arrayCartItems.sort((a,b)=> a.id > b.id ? 1 :-1);
    });
    let err = null;
    const dispatch = useDispatch();
     useEffect(()=>{
         if(error) {
            err = '<span>Something went wrong</span>';
         }
     },[error]);

     if(showLoader) {
        return(
            <div style={styles.centered}><Spinner animation="border" variant="warning" /></div>
        )
     }

     

    return (
        <div>
            {err}
             {isAuthenticated?<Header/>:null}
            <div style={styles.summary}>
                <span style={styles.summaryText}>Total Amount:<span style={styles.amount}>${Math.round(total.toFixed(2) * 100 / 100)}</span></span>
                <Button style={{backgroundColor:Color.primary}} onClick={async()=>{
                    setShowLoader(true);
                    try {
                        await dispatch(actions.addOrder(cartItems,total));
                    } catch (error) {
                        setError(error.message);
                    }
                    setShowLoader(false);
                }} disabled={cartItems.length <1 }>Order Now</Button>
            </div>
            <ListGroup>
            {cartItems.map((item)=>
                <div style={styles.centered}>
                    <CartItem 
                        quantity={item.quantity} 
                        title={item.title} 
                        sum={item.sum} onRemove={()=>{ dispatch(actions.deleteFromCart(item.id));}} showDeleteBtn 
                    />
            </div>
            )}
            </ListGroup>
        </div>
    )
}

const styles = {
    summary:{
        display:'flex',
        margin:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:10,
        padding:20,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
    },
    summaryText:{
        fontFamily:'open-sans-bold',
        fontSize:18
    },
    amount:{
        fontFamily:'open-sans-bold',
        color:'#654568'
    },
    centered:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
};

export default CartScreen;