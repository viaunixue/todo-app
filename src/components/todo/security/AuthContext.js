import { createContext, useContext, useState } from "react";
import { executeJwtAuthenticationService } from "../api/AuthenticateApiService";
import { apiClient } from "../api/ApiClient";

//1: Create a Context
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //Put some state in the context
    // const [number, setNumber] = useState(10)

    const [isAuthenticated, setAuthenticated] = useState(false)

    // eslint-disable-next-line
    const [username, setUsername] = useState(null)

    // eslint-disable-next-line
    const [token, setToken] = useState(null)


    //setInterval( () => setNumber(number+1), 10000)
    //const valueToBeShared = {number, isAuthenticated, setAuthenticated}

    async function login(username, password) {

        try {
            const response = await executeJwtAuthenticationService(username, password)

            if(response.status === 200){
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true            
            } else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }       
    }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )

    //     try {
    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status === 200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true            
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch (error) {
    //         logout()
    //         return false
    //     }       
    // }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )

    //     const response = await executeBasicAuthenticationService(baToken)
    //     .then (response => console.log('2: ' + response))
    //     .catch (error => console.log(error))

    //     console.log('1:  + test')

    //     setAuthenticated(false)     
    // }

    function logout() {
        setAuthenticated(false)
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token}  }>
            {children}
        </AuthContext.Provider>
    )
} 
