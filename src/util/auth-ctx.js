import { createContext } from "react";

export const AuthContext = createContext({
    loggedstate: {},
    login: () => {},
    logout: () => {},
    signup: () => {}
})