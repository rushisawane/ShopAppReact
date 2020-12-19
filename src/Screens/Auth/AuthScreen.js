import * as actions from '../../Store/Actions/index';
import React,{ useState,useReducer,useEffect,useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Form,Button,Alert,Spinner } from 'react-bootstrap';
import Color from '../../Constant/Color';
import { Redirect } from 'react-router-dom';


const FORM_INPUT_CHANGE = 'FORM_INPUT_CHANGE';

const formReducer = (state,action) => {

    if(action.type===FORM_INPUT_CHANGE) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]:action.value
            
        }
        const updatedInputValidities = {
            ...state.inputValidities,
            [action.input]:action.isValid
            
        }
        
        const updatedTouchedInput = {
            ...state.touchedInput,
            [action.input]:action.touched
        } 
       
        let updatedFormIsValid = true;
        for(const key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
        }

        return {
            inputValues:updatedInputValues,
            inputValidities:updatedInputValidities,
            touchedInput:updatedTouchedInput,
            formIsValid:updatedFormIsValid
        }
    }

    return state;
}

const AuthScreen = props => {

    const [isSignUp,setIsSignUp] = useState(false)
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state=>state.authReducer.token!==null);
    const err = useSelector(state=>state.authReducer.error);
    const [error,setError] = useState();

    const [formState,formDispatch] = useReducer(formReducer,{
        inputValues:{
            email:'',
            password:''
        },
        inputValidities:{
            email:false,
            password:false
        },
        touchedInput:{
            email:false,
            password:false
        },
        formIsValid:false
    })

    let authRedirect = null;
    if(isAuthenticated) {
        authRedirect = <Redirect to="/home"/>
    } 

    let errorMessage = null;
    useEffect(()=>{
        if(err) {
            setIsLoading(false);
        }
    },[err])

    const authHandler = useCallback(async (event) => {
         event.preventDefault();
        if(!formState.formIsValid) {
            //Alert.alert('Invalid input','Please check the form error',[{text:'Okay'}]);
            if(!formState.inputValidities.email){formDispatch({type:FORM_INPUT_CHANGE, touched:true,input:'email'})} else { return null }
            if(!formState.inputValidities.password){formDispatch({type:FORM_INPUT_CHANGE, touched:true,input:'password'})} else { return null }
            return
        }
        setError(null);
        setIsLoading(true);
        try {
             await dispatch(actions.auth(formState.inputValues.email,formState.inputValues.password,isSignUp));
        } catch (e) {
            setError(e);
            setIsLoading(false);
        }
    },[dispatch,formState]);


    const inputHandler = (identifier,text) => {
        console.log(text.target.value);
        if(text.target.value.trim().length===0) {
            formDispatch({
                type:FORM_INPUT_CHANGE,
                input:identifier,
                value:text.target.value,
                isValid:false,
                touched:true
            })
        } else {
            formDispatch({
                type:FORM_INPUT_CHANGE,
                input:identifier,
                value:text.target.value,
                isValid:true,
                touched:false            
            })
        }
    }
    return(
            <div style={styles.screen,styles.centered}>
               <div style={styles.gradient}>
                <div style={{...styles.Card,height:err||!formState.formIsValid?'44%':'38%',width:'40%'}}>
                {authRedirect}
                    <Form onSubmit={authHandler } noValidate>
                        <Form.Group controlId="formBasicEmail">
                        <div style={{color:'red'}}>{err}</div>
                            <Form.Label style={styles.inputLabel}>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                style={styles.inputFields}
                                value={formState.inputValues.email}
                                //onFocus = { ()=>formDispatch({type:FORM_INPUT_CHANGE, touched:true,input:'email'}) }
                                onChange={inputHandler.bind(this,'email') }
                                />   
                            {!formState.inputValues.email && formState.touchedInput.email ? <span>Please enter valid email</span>:null}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={styles.inputLabel}>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                style={styles.inputFields}
                                value={formState.inputValues.password}
                                onChange={inputHandler.bind(this,'password')}
                                //onFocus = {()=> formDispatch({type:FORM_INPUT_CHANGE,touched:true,input:'password'}) }
                            />
                            {!formState.inputValues.password && formState.touchedInput.password ? <span>Please enter valid password</span>:null}
                        </Form.Group>
                        <div style={styles.btnContainer}>
                        {isLoading ? <Spinner animation="border" variant="primary"/>:
                            (<Button type="submit" style={{color:Color.secondary,backgroundColor:Color.primary,marginRight:'1%'}}>{isSignUp?'Sign Up':'Login'}</Button>)}
                            <Button onClick={ ()=>{setIsSignUp(prevState=>!prevState);}}>{`Switch to ${isSignUp?'Login':'Sign UP'}`}</Button>
                        </div>          
                </Form>                                     
                </div>
                </div>
            </div>
        )
}


const styles = {
    screen:{
        display:'flex',
        width:'100%',
        height:'100%'
    },
    gradient:{
        display:'flex',
        height:'630Px',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        background:'linear-gradient(#ffffff,#ffe3ff)'
    },
    Card:{
        diaplay:'flex',
        width:'30%',
        height:'38%',
        maxHeight:500,
        backgroundColor:'white',
        elevation:5,
        borderRadius:10,
        padding:'1%',
        boxShadow: '3px 3px 1px 1px #888888',
    },
    inputFields:{
        borderBottomWidth:1,
        borderBottomColor:'#888',
        marginVertical:'1%'
    },
    inputLabel:{
        //marginVertical:'1%',
        paddingHorizontal:'1%',
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    btnContainer:{
        display:'flex',
        marginVertical:'4%',
        justifyContent:'space-between'
    },
    centered:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}

export default AuthScreen;