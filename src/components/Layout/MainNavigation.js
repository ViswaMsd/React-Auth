import { Link, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { authActions } from "../../store/store.js";
import { useDispatch, useSelector } from "react-redux";

const MainNavigation = () => {
  const isLogin = useSelector((state) => state.isLogined);
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    history.replace("./");
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLogin && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
