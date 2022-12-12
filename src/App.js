import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import Places from "./places/pages/Places";
import Navbar from "./shared/Navbar";
import EditPlace from "./places/pages/EditPlace";
import AddPlace from "./places/pages/AddPlace";
import LogIn from "./user/pages/LogIn";
import { AuthContext } from "./util/auth-ctx";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/auth-hook";

const App = () => {
  const { isLogged, authHandler, setLogged } = useAuth();
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    if (!isLogged.isLogged) {
      setRoutes(
        <Routes>
          <Route path="/auth" element={<LogIn setLogged={setLogged} />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      );
    } else {
      setRoutes(
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userID/places" element={<Places />} />
          <Route path="/edit/:placeID" element={<EditPlace />} />
          <Route path="/add-place" element={<AddPlace />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
  }, [isLogged.isLogged]);

  return (
    <AuthContext.Provider
      value={{
        loggedstate: isLogged,
        login: authHandler,
        signup: authHandler,
        logout: authHandler,
      }}
    >
      <BrowserRouter>
        <Navbar />
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
