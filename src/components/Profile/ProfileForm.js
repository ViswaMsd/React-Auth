import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import { authActions } from "../../store/store.js";

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const idToken = useSelector((state) => state.token);
  const newPasswordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const changePasswordHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredPassword = newPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3rI5PTb2nvTDTgVcuSijpQemWiQvLqAs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (!res.ok) throw new Error("Something Went Wrong..!");
        setIsSuccess(true);
        dispatch(authActions.logoutHandler());
        history.replace("./auth");
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };
  return (
    <>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.action}>
          <button onClick={changePasswordHandler}>Change Password</button>
        </div>
      </form>
      <p className="status">
        {isLoading && "Sending Request"}
        {!isLoading && error}
        {!isLoading && isSuccess && "Password Changed Successfully..."}
      </p>
    </>
  );
};

export default ProfileForm;
