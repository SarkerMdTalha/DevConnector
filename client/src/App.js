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
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfiles';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
              <Route path='/create-profile' element={<PrivateRoute element={<CreateProfile />} />} />
              <Route path='/edit-profile' element={<PrivateRoute element={<EditProfile />} />} />
              <Route path='/add-experience' element={<PrivateRoute element={<AddExperience />} />} />
              <Route path='/add-education' element={<PrivateRoute element={<AddEducation />} />} />
              <Route path='/posts' element={<PrivateRoute element={<Posts />} />} />
              <Route path='/posts/:id' element={<PrivateRoute element={<Post />} />} />


            </Routes>
          </section>

        </Fragment>

      </Router>
    </Provider>

  )
};

export default App;
