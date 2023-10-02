import React from "react";
import "./App.css";
import { useState } from "react";

import Home from "./Components/Home";
import Office from "./Components/Office";
import Other from "./Components/Other";
import Heading from "./Components/Heading";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isPass, setIsPass] = useState("");
  const [isUser, setIsUser] = useState("");

  const onLoginHandler = () => {
    if (isPass === "" && isUser === "") {
      alert("PLEASE ENTER THE CREDENTIALS");
      return;
    }
    const pass = "123456";
    const user = "yogesh";
    if (isPass !== pass || isUser !== user) {
      alert("WRONG USERNAME AND PASSWORD");
      setIsPass("");
      setIsUser("");
      return;
    }
    setIsLogin((val) => {
      return !val;
    });
  };
  const onLogoutHandler = () => {
    setIsPass("");
    setIsUser("");
    setIsLogin((val) => {
      return !val;
    });
  };

  return (
    <>
      {isLogin && (
        <div>
          <div>
            <Heading />
          </div>
          <div>
            <Home />
          </div>
          <div>
            <Office />
          </div>
          <div>
            <Other />
          </div>
        </div>
      )}
      {!isLogin && (
        <div className="login">
          <div className="user">
            <label>Username : </label>
            <input
              onChange={(e) => setIsUser(e.target.value)}
              value={isUser}
            ></input>
          </div>
          <div className="pass">
            <label>PassWord : </label>
            <input
              onChange={(e) => setIsPass(e.target.value)}
              value={isPass}
              type={"password"}
            ></input>
          </div>
          <div className="button">
            <button
              onClick={onLoginHandler}
              style={{
                marginTop: "0.5cm",
              }}
            >
              LOGIN
            </button>
          </div>
        </div>
      )}
      <div className="button2">
        {isLogin && (
          <div>
            <button
              onClick={onLogoutHandler}
              style={{
                height: "1cm",
              }}
            >
              LOG OUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
