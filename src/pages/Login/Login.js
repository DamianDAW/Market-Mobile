import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [password, setPassWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, email: event.target.value });
  };
  const handlePassword = (event) => {
    setPassWord(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/mobiles");
    }, 2000);
    setUserInfo({ ...userInfo, isLogged: true });
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <div>Iniciando Sesion...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={userInfo.email ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};
