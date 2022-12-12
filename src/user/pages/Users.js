import React, { useContext, useEffect, useState } from "react";
import UserList from "../components/UserList";
import Modal from "../../shared/Modal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../util/auth-ctx";

const Users = () => {
  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setAllUsers(() => {
      console.log("users component: ");
      console.log([authCtx.loggedstate]);
      console.log("----------\n final logged state");
      console.log([authCtx.loggedstate.user]);
      return [authCtx.loggedstate.user];
    });
  }, [authCtx.loggedstate]);

  const userModal = (
    <React.Fragment>
      <img src={"http://localhost:5000/" + user.url} />

      <div className="info">
        <label>
          <strong>Name: </strong>
          {user.userName}
        </label>
      </div>

      <Link to={"/" + user._id + "/places"}>{user.name}'s places</Link>
    </React.Fragment>
  );

  const showFunc = (user) => {
    setDisplay(true);
    setUser(user);
  };

  const closeFunc = () => {
    setDisplay(false);
  };
  return (
    <div>
      {display ? (
        <Modal closeFunc={closeFunc} className="box">
          {userModal}
        </Modal>
      ) : null}
      <UserList showFunc={showFunc} users={allUsers} />
    </div>
  );
};

export default Users;
