import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../shared/Modal";
import "./flex.css";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  const [display, setDisplay] = useState(false);

  const closeFunc = () => {
    setDisplay(!display);
  };
  return (
    <div className="place-box flex column a-center between relative">
      {display && (
        <Modal className="modal-box" closeFunc={closeFunc}>
          <h1>Are you sure delete this place?</h1>

          <div className="modal-box-btn">
            <button>Yes</button>
            <button onClick={closeFunc}>No</button>
          </div>
        </Modal>
      )}

      <img src={"http://localhost:5000/" + props.place.placePic} />

      <div className="place-info grid relative">
        <h4>PlaceName:</h4>
        <label>
          {typeof props.place.placeName === "object"
            ? props.place.placeName.value
            : props.place.placeName}
        </label>
        <h4>Creator Name:</h4>
        <label>
          {typeof props.place.creatorName === "object"
            ? props.place.creatorName.value
            : props.place.creatorName}
        </label>

        <label
          onClick={() => {
            props.setPlace(props.place);
            props.showHide();
          }}
        >
          show modal
        </label>
        <Link to={"/edit/" + props.place._id}>Edit place</Link>
      </div>
    </div>
  );
};

export default PlaceItem;
