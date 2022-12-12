import { useState, useEffect } from "react";
import { useHttp } from "./http-hook";

let leftTime;

export const useAuth = () => {
  const [isLogged, setLogged] = useState({ isLogged: false });
  const { requestHandler } = useHttp();

  const signup = (form, callback) => {
    console.log(form);
    const frmData = new FormData();
    frmData.append("name", form.name.value);
    frmData.append("username", form.username.value);
    frmData.append("password", form.password.value);
    frmData.append("image", form.url.value);

    requestHandler("http://localhost:5000/user/sign-up", "POST", frmData)
      .then((r) => {
        console.log("signed up: ", r);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: r.name,
            userName: r.userName,
            url: r.url,
            _id: r._id,
            token: r.token,
          })
        );
        localStorage.setItem(
          "expireDate",
          JSON.stringify(
            new Date(new Date().getTime + 1000 * 60 * 60).toISOString
          )
        );
        leftTime = setTimeout(
          () => authHandler("logout"),
          new Date(new Date().getTime + 1000 * 60 * 60).getTime()
        );
        setLogged({
          user: {
            name: r.name,
            userName: r.userName,
            url: r.url,
            _id: r._id,
            token: r.token,
          },
          isLogged: true,
        });
        alert("success");
        callback(false);
      })
      .catch((e) => {
        console.log(e);
        callback(false);
        alert(e.message);
      });
  };

  const authHandler = (authType, form, callback = () => {}) => {
    switch (authType) {
      case "login":
        return requestHandler(
          "http://localhost:5000/user",
          "POST",
          JSON.stringify({
            username: form.username.value,
            password: form.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      case "signup":
        signup(form, callback);
        return true;
      case "logout":
        localStorage.removeItem("userData");
        localStorage.removeItem("expireDate");
        clearTimeout(leftTime);
        setLogged({ isLogged: false });
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userData");
    const expireDate = localStorage.getItem("expireDate");
    if (user !== undefined && expireDate !== undefined) {
      let remainingTime = new Date(JSON.parse(expireDate)) - new Date();
      if (remainingTime > 0) {
        leftTime = setTimeout(() => authHandler("logout"), remainingTime);
        return setLogged({ user: JSON.parse(user), isLogged: true });
      }
      authHandler("logout");
    }
  }, []);

  return { isLogged, authHandler, setLogged };
};
