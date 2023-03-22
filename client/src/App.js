import './App.css';
import React, {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigator} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/auth/Register';
import Login  from './components/layout/auth/Login';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';


const App = () => (
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
              </Routes>
            </section>
      </Router>
    </Provider>
);

export default App;
