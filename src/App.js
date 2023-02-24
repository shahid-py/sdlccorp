
import React, { useEffect } from "react";
import { Routes, Route } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Navbar } from "./components";
import Home from "./components/Home"
import PrivateRoute from "./components/PrivateRoute";
import {
  
  Login,
  Signup,
 
} from "./features/index";
import {
  selectToken,
 
} from "./features/index";
import {
  setUpAuthHeaderForServiceCalls,
  setUpAuthExceptionHandler,
} from "./utils/index";

function App() {
  const token = useSelector(selectToken);


  token && setUpAuthHeaderForServiceCalls(token)

  console.log({ token })

  const dispatch = useDispatch();
  

  useEffect(() => {
    setUpAuthExceptionHandler(dispatch);
  }, [dispatch, token]);

  // useEffect(() => {
  //   if (token) {
  //     setUpAuthHeaderForServiceCalls(token);
  //   } else {
  //     navigate("/login", { replace: true });
  //   }
  // }, [token, navigate]);

 

  return (
    <div className="bg-coolGray-200 min-h-screen">
      {token &&<></>}
      <Navbar/>
      <Routes>
        <Route path="/" element={<PrivateRoute />} >
        <Route path="/" element={<Home/>} />
        </Route>
     
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;