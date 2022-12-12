import React from "react";
import "./flex.css";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = (props) => {
  return (
    <div className="places flex column a-center">
      <ul>
        {props.userPlacesInfo.map((p) => (
          <PlaceItem
            showHide={props.showHide}
            setPlace={props.setPlace}
            place={{ ...p, creatorName: "props.userPlacesInfo.name" }}
          />
        ))}
      </ul>
    </div>
  );
};

export default PlaceList;
