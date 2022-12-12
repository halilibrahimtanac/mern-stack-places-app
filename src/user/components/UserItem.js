import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../shared/Card";
import "./UserItem.css";

const UserItem = (props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <img
        className="user-item-img"
        onClick={() => props.showFunc(props.user)}
        alt="profile"
        src={"http://localhost:5000/" + props.user.url}
      />

      <div className="person">
        <div className="user-info">
          <h3>
            {typeof props.user.name === "object"
              ? props.user.name.value
              : props.user.userName}
          </h3>
        </div>

        <div
          className="user-place"
          onClick={() => navigate(`/${props.user.id}/places`)}
        >
          <label>{props.user.places ? "Places" : "Place"}</label>
        </div>
      </div>
    </Card>
  );
};

export default UserItem;
