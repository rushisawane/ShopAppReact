import React from 'react';

import { MdDelete } from "react-icons/md";
import Color from '../../Constant/Color';

const CartItem = props => {

    return (
        <div style={styles.cartItem}>
            <span style={styles.cartDesc}>
                <span style={styles.qty}>{props.quantity}</span>
                <span style={styles.mainText}>{props.title}</span>
            </span>
            <span style={styles.cartDesc}>
                <span style={styles.mainText}>${props.sum}</span>
                {props.showDeleteBtn && <span onClick={ props.onRemove } style={styles.deleteButton}>
                    <MdDelete size={23} color={Color.primary}/>
                </span>}
            </span>
        </div>
    )
}

const styles = {
    cartItem:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        margin:20,
        paddingHorizontal:10
    },
    cartDesc:{
        flexDirection:'row',
        
    },
    qty:{
        fontFamily:'open-sans-bold',
        color:'#888',
        fontSize:16,
        paddingRight:5
    },
    mainText:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    deleteButton:{
        marginLeft:10
    }
}

export default CartItem;