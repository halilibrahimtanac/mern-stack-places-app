import { useEffect, useState } from "react";
import { validation } from "../util/validator";

export const useForm = (inputs, validators = {}, place = {}) => {
  const [placeState, setPlace] = useState({});

  useEffect(() => {
    let placeObj = { ...place };
    for (let key in inputs) {
      if (typeof place[inputs[key]] === "object")
        placeObj[inputs[key]] = {
          value: place[inputs[key]].value || "",
          isValid: validation(
            validators[inputs[key]],
            place[inputs[key]]?.value || ""
          ),
        };
      else
        placeObj[inputs[key]] = {
          value: place[inputs[key]] || "",
          isValid: validation(
            validators[inputs[key]],
            place[inputs[key]] ? place[inputs[key]] : ""
          ),
        };
    }
    setPlace(placeObj);
  }, []);

  const changeHandler = (name, value, valid) => {
    setPlace({
      ...placeState,
      [name]: {
        value: value,
        isValid: valid,
      },
    });
  };

  return [placeState, changeHandler];
};
