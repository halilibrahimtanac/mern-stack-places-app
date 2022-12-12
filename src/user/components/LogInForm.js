import React, { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks/use-form";
import Input from "../../shared/Input";
import "./LogInForm.css";
import {
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRE,
} from "../../util/validator";
import { AuthContext } from "../../util/auth-ctx";
import { useNavigate } from "react-router-dom";
import FilePicker from "../../shared/FilePicker";

const LogInForm = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [logInform, changeHandler] = useForm(["username", "password"], {
    username: [VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE],
    password: [VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE],
  });
  const [formValid, setFormValid] = useState(false);
  const [signUpform, signUpchangeHandler] = useForm(
    ["name", "username", "password", "url"],
    {
      username: [VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE],
      password: [VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE],
      name: [VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE],
      url: [VALIDATION_REQUIRE],
    }
  );

  const [loading, setLoading] = useState(false);
  const [signUpFormValid, setSignupFormValid] = useState(false);
  const [switchable, setSwitchable] = useState(true);

  const switchFormHandler = () => {
    if (switchable) {
      setSwitchable(false);
      document.getElementById("form-container-id").style.transform =
        "rotateY(180deg)";
      document.getElementById("switch-btn-id").textContent = "Log In";
      return;
    }
    setSwitchable(true);
    document.getElementById("form-container-id").style.transform =
      "rotateY(0deg)";
    document.getElementById("switch-btn-id").textContent = "Sign Up";
  };

  const submitHandler = (e, type) => {
    e.preventDefault();
    setLoading(true);
    switch (type) {
      case "login":
        authCtx
          .login("login", logInform)
          .then((r) => {
            console.log("login promise: ", r);
            props.setLogged({ ...r, isLogged: true });
            localStorage.setItem(
              "userData",
              JSON.stringify({
                name: r.user.name,
                userName: r.user.userName,
                url: r.user.url,
                _id: r.user._id,
                token: r.user.token,
              })
            );
            let exDate = new Date(new Date().getTime() + 1000 * 60 * 60);
            localStorage.setItem(
              "expireDate",
              JSON.stringify(exDate.toISOString())
            );
            setTimeout(() => authCtx.logout("logout"), exDate);
            navigate("/");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            alert(err.message);
          });

        return;
      case "signup":
        authCtx.signup("signup", signUpform, setLoading);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    let valid = true;
    for (let i in logInform) {
      valid = valid && logInform[i].isValid;
    }
    setFormValid(valid);
  }, [logInform]);

  useEffect(() => {
    let valid = true;
    for (let i in signUpform) {
      valid = valid && signUpform[i].isValid;
    }
    setSignupFormValid(valid);
  }, [signUpform]);

  return (
    <React.Fragment>
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            position: "absolute",
            backgroundColor: "black",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "30%",
              height: "30vh",
              backgroundColor: "white",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: 40 }}>Loading</h1>
          </div>
        </div>
      ) : null}
      <div id="form-container-id" className="form-container">
        <form className="login-box" onSubmit={(e) => submitHandler(e, "login")}>
          <img className="login-img" src={require("./PlaceHolder-Logo.png")} />
          <Input
            inputType="text"
            inputName="username"
            inputTitle="Username"
            onEnter={changeHandler}
            validators={[VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE]}
          />
          <Input
            inputType="text"
            inputName="password"
            inputTitle="Password"
            onEnter={changeHandler}
            validators={[VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE]}
          />
          {formValid ? (
            <Input inputType="submit" value="Log In" />
          ) : (
            <input type="submit" disabled />
          )}
        </form>

        <form
          className="signup-box"
          onSubmit={(e) => submitHandler(e, "signup")}
        >
          <img className="login-img" src={require("./PlaceHolder-Logo.png")} />
          <Input
            inputType="text"
            inputName="name"
            inputTitle="Name"
            onEnter={signUpchangeHandler}
            validators={[VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE]}
          />
          <Input
            inputType="text"
            inputName="username"
            inputTitle="Username"
            onEnter={signUpchangeHandler}
            validators={[VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE]}
          />
          <Input
            inputType="text"
            inputName="password"
            inputTitle="Password"
            onEnter={signUpchangeHandler}
            validators={[VALIDATION_MIN_LENGTH, VALIDATION_REQUIRE]}
          />
          {/* <Input
            inputType="text"
            inputName="url"
            inputTitle="Photo URL"
            onEnter={signUpchangeHandler}
            validators={[VALIDATION_REQUIRE]}
          /> */}
          <FilePicker
            inputName="url"
            onEnter={signUpchangeHandler}
            validators={[VALIDATION_REQUIRE]}
          />
          {signUpFormValid ? (
            <Input inputType="submit" value="Sign Up" />
          ) : (
            <input type="submit" disabled />
          )}
        </form>
      </div>

      <button
        id="switch-btn-id"
        className="switch-btn"
        onClick={switchFormHandler}
      >
        Sign Up
      </button>
    </React.Fragment>
  );
};

export default LogInForm;
