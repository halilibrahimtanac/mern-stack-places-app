import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import { useHttp } from "../../hooks/http-hook";

const Places = () => {
  const [place, setPlace] = useState({});
  const [display, setDisplay] = useState(false);
  const userID = useParams().userID;

  const [userPlaces, setUserPlaces] = useState(null);
  const [err, setErr] = useState({ isError: false, message: "" });
  const { requestHandler, isLoading } = useHttp();

  const showHide = () => {
    setDisplay(!display);
  };

  const fetchPlaces = () => {
    requestHandler("http://localhost:5000/place/" + userID)
      .then((res) => {
        setUserPlaces(res.places);
      })
      .catch((err) => {
        setErr({ isError: true, message: err.message });
      });
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const placeModal = (
    <React.Fragment>
      <img src={place.placePic} />

      <div className="place-modal-info">
        <label>
          <strong>Place name: </strong>
          {place.placeName}
        </label>
        <label>
          <strong>Creator name: </strong>
          {place.creatorName}
        </label>
      </div>
    </React.Fragment>
  );
  return (
    <div>
      {display ? (
        <Modal closeFunc={showHide} className="place-modal-box">
          {placeModal}
        </Modal>
      ) : null}
      {!isLoading ? (
        err.isError ? (
          <h1>There is no place ({err.message})</h1>
        ) : (
          <PlaceList
            setPlace={setPlace}
            showHide={showHide}
            userPlacesInfo={userPlaces ? userPlaces : []}
          />
        )
      ) : (
        <img
          style={{
            position: "absolute",
            zIndex: 10,
            width: "50%",
            height: "auto",
            left: "25%",
          }}
          src={require("../../shared/spinner.gif")}
        />
      )}
    </div>
  );
};

export default Places;
