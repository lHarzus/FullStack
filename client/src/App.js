import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login  from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms.js/CreateProfile';
import EditProfile from './components/profile-forms.js/EditProfile';
import AddExperience from './components/profile-forms.js/AddExperience';
import AddEducation from './components/profile-forms.js/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=> {
    store.dispatch(loadUser());
  }, []); //empty array to make it only run once
  
  return(
    <Provider store={store}>
      <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Landing/>}/>
          </Routes>
            <section className="container"> 
              <Alert/>
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profiles" element={<Profiles/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/create-profile" element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                } />
                <Route path="/edit-profile" element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                } />
                <Route path="/add-experience" element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                } />
                <Route path="/add-education" element={
                  <PrivateRoute>
                    <AddEducation/>
                  </PrivateRoute>
                } />
                <Route path="/posts" element={
                  <PrivateRoute>
                    <Posts/>
                  </PrivateRoute>
                } />
                <Route path="/posts/:id" element={
                  <PrivateRoute>
                    <Post/>
                  </PrivateRoute>
                } />
              </Routes>
            </section>
      </Router>
    </Provider>
)};

export default App;
