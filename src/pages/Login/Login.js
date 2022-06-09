import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AppContext);
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInputVisited, setIsEmailInputVisited] = useState(false);
  const [isPasswordInputVisited, setIsPasswordInputVisited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPassWordMessage, setErrorPasswordMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  useEffect(() => {
    validateInput(password, "password");
    validateInput(email, "email");
  }, []);

  const handleChangeEmail = (event) => {
    validateInput(event.target.value, "email");
    setEmail(event.target.value);
    setUserInfo({ ...userInfo, email: event.target.value });
  };
  const handlePassword = (event) => {
    validateInput(event.target.value, "password");
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

  const validateInput = (inputValue, inputType) => {
    if (inputType === "password") {
      if (inputValue === "") {
        setErrorPasswordMessage("Debes indicar un passowrd");
      } else {
        const isOnlyNumbers = /^[0-9]+$/;

        setErrorPasswordMessage(
          isOnlyNumbers.test(inputValue) ? "" : "Formato Password incorrecto"
        );
      }
    }
    if (inputType === "email") {
      if (inputValue === "") {
        setErrorEmailMessage("Debes indicar un email");
      } else {
        const isValidEmail =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setErrorEmailMessage(
          isValidEmail.test(inputValue) ? "" : "No es un email valido"
        );
      }
    }
    return;
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <div>Iniciando Sesion...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleChangeEmail}
                onBlur={() => setIsEmailInputVisited(true)}
              />
              {errorEmailMessage && isEmailInputVisited && (
                <div className="error-message">{errorEmailMessage}</div>
              )}
            </div>
          </div>

          <div className="form-item">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                name="password"
                id="password"
                value={password}
                onChange={handlePassword}
                onBlur={() => setIsPasswordInputVisited(true)}
              />
              {errorPassWordMessage && isPasswordInputVisited && (
                <div className="error-message">{errorPassWordMessage}</div>
              )}
            </div>
          </div>

          <input
            type="submit"
            value="Submit"
            disabled={errorEmailMessage || errorPassWordMessage}
          />
        </form>
      )}
    </div>
  );
};
