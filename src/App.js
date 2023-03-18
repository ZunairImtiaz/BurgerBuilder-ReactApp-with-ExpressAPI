import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { authCheckState } from './store/actions/authActions';

function App(props) {
  const effectRan = useRef(true);

  useEffect(() => {
    if (effectRan.current) {
      props.onAutoLogin();
      return () => {
        effectRan.current = false;
      };
    };
  },[props]);

  let routes = (
    <Routes>
      <Route path='/' element={<BurgerBuilder/>} />
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
  if (props.isAuth) {
    routes = (
      <Routes>
        <Route path='/' element={<BurgerBuilder/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        { routes }
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onAutoLogin: () => dispatch(authCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);