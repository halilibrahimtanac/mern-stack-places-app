import { createContext, useState } from "react";


export const ErrorContext = createContext({
    isError: true,
    setErrorHandler: () => {}
})

export const ErrorContextProvider = (props) => {
    const [err, setErr] = useState(true)

    const setErrorHandler = (value) => {
        setErr(value)
    }

    return <ErrorContext.Provider value={{
        isError: err,
        setErrorHandler: setErrorHandler
    }}>
        {props.children}
    </ErrorContext.Provider>
}