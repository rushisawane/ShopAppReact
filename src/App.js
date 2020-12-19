import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import * as actions from './Store/Actions/index';
import { useSelector} from 'react-redux';
import Navigator from './Router/Navigator';

const App = () => {
  const isAuthenticated = useSelector(state=>state.authReducer.token!==null);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(actions.authCheckState());
  })
  return (
    <div>
      <Navigator />
    </div>
  );
}

export default App;
