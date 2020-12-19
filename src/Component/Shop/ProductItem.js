import React from 'react';
import { Image } from 'react-bootstrap';
import Color from '../../Constant/Color';

const ProductItem = props => {
    
    return (
        <div style={styles.product}>
            <div style={ styles.ToucableCmp }>
            <div onClick={props.onSelectProduct}>
            <div>
            <div style={ styles.imageContainer }>
                <Image style={ styles.image } src={props.imageurl} rounded/>
            </div>
            <div style={ styles.detail }>
                <div style={ styles.title }>{props.title}:</div>
                <div style={ styles.price }>${props.price}</div>
            </div>
            <div style={ styles.btnContainer }>
                {props.children}
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

let styles = {
    product:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        elevation:5,
        borderRadius:10,
        margin:20,
        backgroundColor:'#ffffff',  
        width:'50%',
        height:'38%',
        maxHeight:500,
        boxShadow: '3px 3px 3px 3px #888888',
      
    },
    TouchableCmp:{
        borderRadius:10,
        overflow:'hidden'
    },
    imageContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden',
        marginTop:'2%'
    },
    image:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'50%',
        width:'50%'
    },
    detail:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'15%',
        padding:10
    },
    title:{
        fontSize:18,
        marginVertical:4,
        fontFamily:'open-sans-bold'
    },
    price:{
        fontFamily:'open-sans',
        fontSize:14,
        color:'#888'
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'4%',
        height:'25%',
        margin:'2%'
    }
}

export default ProductItem;