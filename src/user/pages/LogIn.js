import React from "react";
import LogInForm from "../components/LogInForm";

const LogIn = (props) => {
  return <LogInForm setLogged={props.setLogged} />;
};

export default LogIn;
