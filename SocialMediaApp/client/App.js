import './App.css';
import {BrowserRouter as Router, Route, BrowserRouter, Routes} from "react-router-dom" 

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Upload from './components/Upload';
import { useEffect, useState } from 'react';

function App() {

  const [loginStatus, UpdateLoginStatus] = useState(localStorage.getItem("loginStatus"),);
  useEffect(() => {
    UpdateLoginStatus(localStorage.getItem("loginStatus"))
  }, [localStorage.getItem("loginStatus")]);


  return (
    <>
        <Navbar />
        
        <Router>
          <Routes>
            <Route path='/' element= <Home /> ></Route>
            <Route path='/login' element= <Login /> ></Route>
            <Route path='/register' element= <Register /> ></Route>

            {loginStatus ? (
              <>
                <Route path='/profile' element= <Profile /> ></Route>
                <Route path='/upload' element=<Upload /> ></Route>
              </>
            ) : (
              <>
                <Route path='/profile' element= <Login /> ></Route>
                <Route path='/upload' element= <Login /> ></Route>
              </>
            )}
            

          </Routes>
          
        </Router>

    </>
  );
}

export default App;
