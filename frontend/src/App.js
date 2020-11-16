import React, { Fragment, useEffect } from 'react';
import './css/main.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer';

import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Cart from './components/pages/Cart';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import User from './components/dashboards/User/User';
import Admin from './components/dashboards/Admin/Admin';
import Add from './components/pages/Add';
import Edit from './components/pages/Edit';
import Buy from './components/pages/Buy';
import Search from './components/pages/Search';


// Redux setup
import { Provider } from 'react-redux';
import store from './store';

// Auth load user
import { loadUser } from './actions/authActions';
import Cookies from 'js-cookie';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  useEffect(() => {
    if (Cookies.get('token')) {
      store.dispatch(loadUser())
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Fragment>
            <Route path='/' component={Header} />
            <Route exact path='/' component={Home} />
            <Route exact path='/products/:name/:id' component={Product} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/search/:query' component={Search} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/user' component={User} />
            <PrivateRoute exact path='/admin' component={Admin} />
            <PrivateRoute exact path='/admin/add' component={Add} />
            <PrivateRoute exact path='/admin/edit/:id' component={Edit} />
            <PrivateRoute exact path='/buy/:name/:size/:quantity/:id' component={Buy} />
            {/* <Route exact path='/' component={Footer} /> */}
          </Fragment>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
