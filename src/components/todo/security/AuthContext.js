import { createContext, useState, useContext } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

//1: Create a Context
export const AuthContext = createContext();

//Create Hook
export const useAuth = () => useContext(AuthContext);

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    async function login(username, pswd) {

        try {
            // Call basicauth-api with token
            const response = await executeJwtAuthenticationService(username,pswd);

            if(response.status == 200){
                const jwtToken = 'Bearer ' + response.data.token;
                setAuthenticated(true);
                setUsername(username);
                setToken(jwtToken);
                apiClient.interceptors.request.use(
                    (config) => { 
                        console.log('intercepting and adding a token');
                        config.headers.Authorization=jwtToken;
                        return config;
                    }
                )
                return true;
            }else{
                logout();
                return false;
            }
        } catch(error) {
                logout();
                return false;
        }

    } 

/*
    async function login(username, pswd) {
        // Construct Token
        const baToken = 'Basic ' + window.btoa(username + ":" + pswd);

        try {
            // Call basicauth-api with token
            const response = await executeBasicAuthenticationService(baToken);

            if(response.status == 200){
                setAuthenticated(true);
                setUsername(username);
                setToken(baToken);
                apiClient.interceptors.request.use(
                    (config) => { 
                        console.log('intercepting and adding a token');
                        config.headers.Authorization=baToken;
                        return config;
                    }
                )
                return true;
            }else{
                logout();
                return false;
            }
        } catch(error) {
                logout();
                return false;
        }

    }  
*/
    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setToken(null);
    }
    

    return (
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout, username, setUsername, token} }>
            {children}
        </AuthContext.Provider>
    )
}

