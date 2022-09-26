import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, resetErrors } from "../features/authSlice";
import { clearAll } from "../features/dataSlice";
import Login from "./Login";
import Signup from "./Signup";

export default function Landing() {
  const [isSignup, setIsSignup] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const dispatch = useDispatch();

  const handleIsSignup = () => {
    isSignup ? setIsSignup(false) : setIsSignup(true);
  };

  const handleIsDoctor = (event) => {
    isDoctor ? setIsDoctor(false) : setIsDoctor(true);
  };

  const handleCloseError = (event, reason) => {
    setTimeout(() => {
      dispatch(resetErrors());
    }, 100);
  };

  useEffect(() => {
    dispatch(clearAll());
    dispatch(logout());
    // eslint-disable-next-line
  }, []);

  return (
    <div id="landingContainer">
      <>
        {!isSignup ? (
          <Login isDoctor={isDoctor} handleIsDoctor={handleIsDoctor} handleIsSignup={handleIsSignup} handleCloseError={handleCloseError} />
        ) : (
          <Signup isDoctor={isDoctor} handleIsDoctor={handleIsDoctor} handleIsSignup={handleIsSignup} handleCloseError={handleCloseError} />
        )}
      </>
    </div>
  );
}
