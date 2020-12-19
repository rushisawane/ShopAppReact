import React from 'react';
import { Image,Button } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import Header from '../Header';
//import { HeaderButtons,Item } from 'react-navigation-header-buttons'

import Color from '../../Constant/Color';
import * as actions from '../../Store/Actions/index';
//import CustomHeaderButton from '../../components/UI/HeaderButton';

const ProductDetailScreen = props => {
    const productid = props.match.params.prodid;
    const selectedProduct = useSelector(state => state.productReducer.availableProducts.find(prod => prod.id === productid))
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state=>state.authReducer.token!==null);

    return (
        <div style={styles.screen}>
             {isAuthenticated?<Header/>:null}
            <Image style={ styles.image } src={selectedProduct.imageUrl }/>
            <div style={styles.actions}>
                <Button style={{color:Color.secondary}} onClick={()=>{
                    dispatch(actions.addToCart(selectedProduct));
                }}>Add to Cart</Button>
            </div>
            <div style={ styles.price }>${selectedProduct.price.toFixed(2)}</div>
            <div style={ styles.desc } >{selectedProduct.description}</div>
        </div>
    )
}

const styles = {
    screen:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    image:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'40%',
        height:300,
        marginTop:'4%'
    },
    actions:{
        display:'flex',
        marginVertical:10,
        alignItems:'center',
        marginTop:'1%'
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold'
    },
    desc:{
        fontSize:14,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily:'open-sans'
    }
}

export default ProductDetailScreen;