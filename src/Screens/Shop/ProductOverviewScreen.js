import React,{ useEffect, useState, useCallback } from 'react';
import { Button,Spinner,ListGroup } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ProductItem from '../../Component/Shop/ProductItem';
import Header from '../Header';

import * as actions from '../../Store/Actions/index';
import Color from '../../Constant/Color';

const ProductOverviewScreen = props => {
    const isAuthenticated = useSelector(state=>state.authReducer.token!==null);

    const [showLoader,setShowLoader] = useState(true);
    const [error, setError] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const Product = useSelector(state => state.productReducer.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setShowLoader(true);
        setIsRefreshing(true);
        try {
            await dispatch(actions.selectProduct());
        } catch (error) {
            console.log(error);
            setError(error);
        }
        setShowLoader(false);
        setIsRefreshing(false);
     },[dispatch,setShowLoader,setError]) 

    useEffect(()=>{
        loadProducts();
    },[])

    useEffect(()=>{
         loadProducts();
    },[dispatch,loadProducts,setShowLoader]);

    if(error) {
        return (
            <div style={styles.centered}>
                <span style={styles.errtext}>Something went wrong</span>
                <Button style={{color:Color.primary}} onClick={loadProducts}>Try Again</Button>
            </div>
        )
    }

    if(showLoader) {
        return <div style={styles.centered}>
                      <Spinner animation="border" variant="warning" />
               </div>
    }

    if(!showLoader && Product.length === 0) {
        return (
        <div style={styles.centered}>
            <span style={styles.errtext}>No item's found! May be start adding some</span>
        </div>)
    }

    const onSelectProductHandler = (id) => {
        props.history.push(id?`/productdetail/${id}`:`/home`)
    }

    return(
        <div>
         {isAuthenticated?<Header/>:null}
    <ListGroup>
        {Product.map((item)=> 
        <div keyExtractor={item=>item.id} style={styles.centered}><ProductItem 
            imageurl={ item.imageUrl } 
            title={item.title} 
            price={ item.price.toFixed(2) } 
            onSelectProduct={()=>{ props.history.push(`/productdetail/${item.id}`) }}>
            <div style={styles.btnstyle}>
            {/* <Link to={item.id?`/productdetail/${item.id}`:`/home`}> */}
                <Button style={{backgroundColor:Color.primary}} onClick={()=>{ onSelectProductHandler(item.id)}}>Show Details</Button>
                <Button style={{ backgroundColor:Color.primary }} onClick={ (e)=>{ e.stopPropagation();dispatch(actions.addToCart(item)) } }>Add To Cart</Button>  
            </div>
        </ProductItem></div>)}
    </ListGroup> 
    </div>
    )
}


const styles = {
    centered:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column'
    },
    errtext:{
        fontFamily:'open-sans',
        fontSize:13,
        marginBottom:'2%'
    },
    btnstyle:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    }
}

export default ProductOverviewScreen;
