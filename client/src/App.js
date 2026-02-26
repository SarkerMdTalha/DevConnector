//import logo from './logo.svg';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux 
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (

    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          {/* landing page sits outside the main container */}
          <Routes>
            <Route exact path='/' element={<Landing />} />
          </Routes>

          <section className='container'>
            <Alert />
            <Routes>
              {/* other routes are wrapped in the section container */}
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
            </Routes>
          </section>

        </Fragment>

      </Router>
    </Provider>

  )
};

export default App;
