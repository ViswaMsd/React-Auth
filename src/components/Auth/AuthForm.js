import { useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  // const isLogin = useSelector((state) => state.auth.isLogined);
  // const dispatch = useDispatch();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  let url;

  const switchAuthModeHandler = () => {
    setIsSignedUp((prevState) => !prevState);
    console.log("isSignedUp:", isSignedUp);
  };
  const signupLoginHandler = (e) => {
    e.preventDefault();
    const enteredemail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (!isSignedUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3rI5PTb2nvTDTgVcuSijpQemWiQvLqAs";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3rI5PTb2nvTDTgVcuSijpQemWiQvLqAs";
    }
    fetch(url, {
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
        if (!res.ok) throw new Error("Authentication Failed");
        console.log("response:", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{!isSignedUp ? "Login" : "Sign Up"}</h1>
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
          <button onSubmit={signupLoginHandler}>
            {!isSignedUp ? "Login" : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {!isSignedUp ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
