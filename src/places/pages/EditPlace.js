import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../util/auth-ctx";
import EditForm from "../components/EditForm";

const EditPlace = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [plc, setPlc] = useState(null);
  const placeId = params.placeID;
  const { token, _id } = useContext(AuthContext).loggedstate.user;

  useEffect(() => {
    fetch("http://localhost:5000/place/edit/" + placeId, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((rj) => {
        console.log("edit: ", rj);
        if (rj.isError) {
          navigate("/" + _id + "/places");
          return;
        }
        setPlc(rj);
      });
  }, []);

  return (
    <div>
      {plc ? <EditForm place={plc} /> : <div>there is no such place</div>}
    </div>
  );
};

export default EditPlace;
