import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, changePath } from "../store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import "../styles/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          "https://football-rating-server.onrender.com/api/current_user",
          {
            withCredentials: true,
          }
        );
        dispatch(setCredentials({ user: response.data }));
      } catch (err) {
        dispatch(setCredentials({ user: null }));
      }
    };
    fetchCurrentUser();
  }, [dispatch]);
  const handleLogout = async () => {
    try {
      const response = await axios.get("https://football-rating-server.onrender.com/api/logout", {
        withCredentials: true,
      });
      dispatch(setCredentials({ user: null }));
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = () => {
    dispatch(changePath(pathname));
  };

  let content;
  if (user) {
    content = (
      <Link to="/" onClick={handleLogout} className={"header-button"}>
        Çıkış Yap
      </Link>
    );
  } else {
    content = (
      <>
        <Link to="/login" onClick={handleLogin} className={"header-button"}>
          Giriş Yap
        </Link>
        <Link to="/signup" onClick={handleLogin} className={"header-button"}>
          Üye Ol
        </Link>
      </>
    );
  }
  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/">
          <AiFillHome className="home-page-icon"></AiFillHome>
        </Link>
        <div className="header-button-container">{content}</div>
      </div>
    </header>
  );
};

export default Header;
