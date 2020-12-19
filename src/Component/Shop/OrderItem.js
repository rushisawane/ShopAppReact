import React,{ useState } from 'react';
import { Button } from 'react-bootstrap';
import CartItem from '../shop/CartItem';

const OrderItem = props => {

    const [showDetails,setShowDetails] = useState(false);
    console.log(props.items);
    return (
        <div style={styles.summaryContainer}>
            <div style={ styles.summary }>
                <span style={ styles.total }>{props.total.toFixed(2)}</span>
                <span style={ styles.date } >{props.date}</span>
            </div>
            <div style={styles.buttonContainer}>
                <Button onClick={()=>{
                    setShowDetails(prevState => !prevState)
                }}>{showDetails?'Hide Details':'Show Details'}</Button>
                {showDetails && <div style={styles.detailItems}>
                    {props.items.map(cartItem=><CartItem key={cartItem.id} quantity={cartItem.quantity} title={cartItem.title} sum={cartItem.sum} showDeleteBtn={false} />)}</div>}
            </div>
        </div>
    )
}

const styles = {
    summaryContainer:{
        margin:15,
        borderRadius:10,
        backgroundColor:'white',
        elevation:5,
        padding:10,
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5
    },
    total:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    date:{
        fontFamily:'open-sans',
        fontSize:16,
        color:'#888'
    },
    buttonContainer:{
        alignItems:'center'
    },
    detailItems:{
        width:'100%'
    }
}

export default OrderItem;