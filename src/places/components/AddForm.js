import React, { useContext } from "react";
import "./AddForm.css";
import Input from "../../shared/Input";
import {
  validation,
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRE,
} from "../../util/validator";
import { ErrorContext } from "../../util/error-ctx";
import { useForm } from "../../hooks/use-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../util/auth-ctx";
import { useHttp } from "../../hooks/http-hook";
import FilePicker from "../../shared/FilePicker";

const AddForm = () => {
  const [place, changeHandler] = useForm(["placeName", "placePic"], {
    placeName: [VALIDATION_REQUIRE, VALIDATION_MIN_LENGTH],
    placePic: [VALIDATION_REQUIRE],
  });

  const errCtx = useContext(ErrorContext);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { requestHandler } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();
    let formValid = true;
    for (let key in place) {
      if (typeof place[key] === "object") {
        formValid = formValid && place[key].isValid;
      }
    }
    if (formValid) {
      console.log(place);

      const frmData = new FormData();
      frmData.append("placeName", place.placeName.value);
      frmData.append("image", place.placePic.value);
      frmData.append("creatorUserId", authCtx.loggedstate.user?._id);

      requestHandler(
        "http://localhost:5000/place/create-place",
        "POST",
        frmData,
        { Authorization: "Bearer  " + authCtx.loggedstate.user.token }
      )
        .then((r) => {
          console.log("response json: ", r);
          navigate("/");
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      alert("invalid");
    }
  };

  const notFoundImg = () => {
    errCtx.setErrorHandler(true);
  };

  return (
    <form onSubmit={submitHandler} className="add-form">
      <img
        id="img"
        onLoad={() => errCtx.setErrorHandler(false)}
        onError={notFoundImg}
        style={{ display: errCtx.isError ? "none" : "block" }}
        className="add-form-img"
        alt="added-url"
        src={place.placePic?.value}
      />
      <Input
        inputTitle="Place Name"
        inputType="text"
        inputName="placeName"
        onEnter={changeHandler}
        validators={[VALIDATION_REQUIRE, VALIDATION_MIN_LENGTH]}
      />
      {/* <Input
        inputTitle="Place Picture"
        inputType="text"
        inputName="placePic"
        onEnter={changeHandler}
        validators={[VALIDATION_REQUIRE]}
      /> */}
      <FilePicker
        inputName="placePic"
        onEnter={changeHandler}
        validators={[VALIDATION_REQUIRE]}
      />

      <label>User ID: {authCtx.loggedstate.user?._id}</label>
      {Object.keys(place)
        .map((k) => place[k].value)
        .includes("") ? (
        <label>Invalid entering...</label>
      ) : (
        <Input inputType="submit" inputName="submit" />
      )}
    </form>
  );
};

export default AddForm;
