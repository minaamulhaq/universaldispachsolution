import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [Token, setToken] = useState(localStorage.getItem("token"));
    const [UserData, setUserData] = useState({});
    const [Services, setServices] = useState([]);
    const API = import.meta.env.VITE_APP_URL_API;

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${Token}` }
            });
            if (response.ok) {
                const Data = await response.json();
                setUserData(Data.userData);

            }
        } catch (error) {
            console.log(error);
        }
    }

    const ServicesData = async () => {
        try {
            const response = await fetch(`${API}/api/auth/services`, {
                method: "GET",
                headers: {
                    contentType: "application/json",
                }

            });
            if (response.ok) {
                const Service = await response.json();
                setServices(Service);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (Token) {
            userAuthentication();
            ServicesData();
        }
    }, [Token]);


    const storeTokeninLS = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    const isLoggedIn = !!Token;



    return (
        <AuthContext.Provider value={{
            storeTokeninLS,
            LogoutUser,
            Token,
            isLoggedIn,
            UserData,
            API,
            Services
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};