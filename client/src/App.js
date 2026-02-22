//import logo from './logo.svg';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (

  <Router>
    <Fragment>
      <Navbar />

      {/* landing page sits outside the main container */}
      <Routes>
        <Route exact path='/' element={<Landing />} />
      </Routes>

      <section className='container'>
        <Routes>
          {/* other routes are wrapped in the section container */}
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </section>

    </Fragment>

  </Router>

)

export default App;
