import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/loginPage.css";
import { setCredentials } from "../store";
import { useNavigate } from "react-router-dom";
import { useError } from "../hooks/useError";
import { FaSpinner } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = useSelector((state) => state.path);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://football-rating-server.onrender.com/api/login",
        {
          username,
          password,
          path,
        },
        { withCredentials: true }
      );
      if (response.data.redirectUrl && response.data.username) {
        setLoading(false);
        dispatch(setCredentials({ user: username }));
        navigate(response.data.redirectUrl);
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.status === 400) {
        setErrors(err.response.data.error);
      }
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  return (
    <div className="container-outer">
      <div className="container-inner">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              className="input"
              onChange={handleChange}
              value={username}
            />
            {useError(errors, "username")}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Parola"
              onChange={handleChange}
              value={password}
            />
            {useError(errors, "password")}
          </div>

          <button type="submit" className="submit" disabled={loading}>
            {loading ? (
              <FaSpinner className="login-spinner active-login-spinner" />
            ) : (
              "Giriş Yap"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
