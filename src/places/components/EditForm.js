import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";
import { useForm } from "../../hooks/use-form";
import FilePicker from "../../shared/FilePicker";
import Input from "../../shared/Input";
import { AuthContext } from "../../util/auth-ctx";
import {
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRE,
} from "../../util/validator";
import "./EditForm.css";

const EditForm = (props) => {
  const { token } = useContext(AuthContext).loggedstate.user;
  const [place, changeHandler] = useForm(
    ["placeName", "placePic"],
    {
      placeName: [VALIDATION_REQUIRE, VALIDATION_MIN_LENGTH],
      placePic: [VALIDATION_REQUIRE],
    },
    props.place
  );
  const navigate = useNavigate();
  const { requestHandler, isLoading } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    let formIsValid = true;
    for (let key in place) {
      if (typeof place[key] === "object") {
        formIsValid = formIsValid && place[key].isValid;
      }
    }
    if (formIsValid) {
      const formData = new FormData();
      formData.append("placeName", place.placeName.value);
      formData.append("image", place.placePic.value);
      requestHandler(
        "http://localhost:5000/place/" + place._id,
        "PATCH",
        formData,
        { Authorization: "Berear " + token }
      )
        .then((r) => {
          navigate("/" + place.creatorUserId + "/places");
        })
        .catch((err) => {
          console.log(err.message + "\n" + token);
          alert(err.message);
        });
    } else alert("form is invalid not submitted");
  };

  return (
    <div className="edit-place-div">
      {isLoading ? (
        <img
          style={{ position: "absolute", zIndex: 10 }}
          src={require("../../shared/spinner.gif")}
        />
      ) : null}
      {place && (
        <React.Fragment>
          <img
            className="place-img"
            src={"http://localhost:5000/" + place.placePic?.value}
          />

          <form onSubmit={submitHandler} className="form">
            <div className="form-element">
              <Input
                inputTitle="Place Name"
                inputType="text"
                value={place.placeName?.value}
                inputName="placeName"
                onEnter={changeHandler}
                validators={[VALIDATION_REQUIRE, VALIDATION_MIN_LENGTH]}
              />
            </div>

            <div className="form-element">
              <h4>Place Picture Url</h4>
              {/* <Input
                inputType="text"
                value={place.placePic?.value}
                inputName="placePic"
                onEnter={changeHandler}
                validators={[VALIDATION_REQUIRE]}
              /> */}
              <FilePicker
                inputName="placePic"
                onEnter={changeHandler}
                validators={[VALIDATION_REQUIRE]}
              />
            </div>

            <Input inputType="submit" value="Update" />
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default EditForm;
