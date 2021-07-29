import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store.js";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const isLogin = useSelector((state) => state.auth.isLogined);
  const dispatch = useDispatch();
  const [isSignedUp, setIsSignedUp] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  let url;
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsSignedUp((prevState) => !prevState);
    console.log("isSignedUp:", isSignedUp);
  };
  const signupLoginHandler = (event) => {
    event.preventDefault();
    const enteredemail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    if (!isSignedUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3rI5PTb2nvTDTgVcuSijpQemWiQvLqAs";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3rI5PTb2nvTDTgVcuSijpQemWiQvLqAs";
    }
    fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log("response:", res);
        if (!res.ok) {
          throw new Error("Authentication Failed");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (!isSignedUp) return;
        dispatch(authActions.setToken(data.idToken));
        dispatch(authActions.loginHandler());
        localStorage.setItem("token", data.idToken);
        history.replace("./profile");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isSignedUp ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button onClick={signupLoginHandler}>
            {isSignedUp ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isSignedUp ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      <h3 className="status">
        {isLoading && "Sending Request..."}
        {!isLoading && error}
      </h3>
    </section>
  );
};

export default AuthForm;
