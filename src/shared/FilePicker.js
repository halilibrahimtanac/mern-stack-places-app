import React, { useEffect, useState } from "react";
import { validation } from "../util/validator";

const FilePicker = (props) => {
  const [file, setFile] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    if (!file) return;

    const freader = new FileReader();
    freader.onload = () => {
      setUrl(freader.result);
    };
    freader.readAsDataURL(file);
  }, [file]);

  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    props.onEnter(
      props.inputName,
      e.target.files[0],
      validation(props.validators, e.target.files[0].name)
    );
  };

  return (
    <div style={{ width: "50%", height: "auto", position: "relative" }}>
      {url ? (
        <img
          style={{ width: "32%", height: "auto", position: "relative" }}
          src={url}
        />
      ) : (
        <label>haven't chosen yet....</label>
      )}
      <input
        type="file"
        name={props.inputName}
        accept=".jpg,.png,.jpeg"
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

export default FilePicker;
