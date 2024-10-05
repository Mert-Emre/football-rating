import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useError } from "../hooks/useError";
import axios from "axios";
import { setCredentials } from "../store";
import { FaSpinner } from "react-icons/fa";

import "../styles/loginPage.css";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://football-rating-server.onrender.com/api/signup", {
        username,
        password,
        email,
      });
      if (response.status === 200) {
        setLoading(false);
        dispatch(setCredentials({ user: response.data.username }));
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
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };
  return (
    <div className="container-outer">
      <div className="container-inner">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Mail adresi"
              className="input"
              onChange={handleChange}
            />
          </div>
          {useError(errors, "email")}
          <div className="input-container">
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              className="input"
              onChange={handleChange}
            />
          </div>
          {useError(errors, "username")}
          <div className="input-container">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Parola"
              onChange={handleChange}
            />
          </div>
          {useError(errors, "password")}
          <button type="submit" className="submit">
            {loading ? (
              <FaSpinner className="login-spinner active-login-spinner" />
            ) : (
              "Üye Ol"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
