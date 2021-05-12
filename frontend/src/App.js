import TodoPage from './pages/TodoPage'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import PrivateRoute from './components/PrivateRoute';
import { checkAuthenticatedAction } from './redux/UserDuck';
import AuthRoute from './components/AuthRoute';
import UrlNotFound from './components/UrlNotFound';
import Normalize from 'react-normalize';

function App() {

  const dispatch = useDispatch();
  const userLoading = useSelector(store => store.user.loading);

  useEffect(() => {

    dispatch(checkAuthenticatedAction())

  },[dispatch])

  if(userLoading){
    return(
      <>
      <Normalize/>
      <div style={{height:'100vh',width:'100vw',backgroundColor:'rgb(201, 201, 201)'}}></div>
      </>
    )
  }
  else{
    return (
      <>
      <Normalize/>
      <BrowserRouter>
        <Switch> 
          <AuthRoute exact path='/login' component={LoginPage}/>
          <AuthRoute exact path='/register' component={RegisterPage}/>
          <PrivateRoute exact path='/' component={TodoPage}/>
          <Route path='*' component={UrlNotFound}/>
        </Switch> 
      </BrowserRouter>
      </>
    );
  }

}

export default App;
