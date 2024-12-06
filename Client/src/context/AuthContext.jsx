import { createContext, useEffect, useState, } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();



// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState([])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userChat")))

    }, [])
    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}

        </AuthContext.Provider>
    )
}

export default AuthContextProvider
