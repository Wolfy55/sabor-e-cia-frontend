import { createContext, useContext, useEffect, useState } from "react"
import { userService } from "../services/userService"
import { readPersistedUserId, persistUserId } from "./AuthStorage"

const AuthContext = createContext(null)
function AuthProvider({children}){
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(() => {
let cancel = false
async function toHydrate(){
const persistedUserId = readPersistedUserId()

        if(!persistedUserId){
            return
        }

        const finded = await userService.lookById(persistedUserId)

        if(cancel){
            return
        }
        if(finded){
            setUser(finded)
        }
        else{
            persistUserId(null)
        }
    }
    toHydrate().finally(() => !cancel && setLoading(false))
    return() => {
        cancel = true
    }
    }, [])
    async function login(email, password){
        const finded = await userService.verifyCredentials(email, password)

        if(!finded){
            return null
        }
        setUser(finded)
        persistUserId(finded.id)
        return finded
    }

    function logout(){
        setUser(null)
        persistUserId(null)
    }
    async function register(datas){
        const newUser = await userService.create(datas)
        setUser(newUser)
        persistUserId(newUser.id)
        return newUser
    }
    const value = {
        user,
        authenticated: !!user,
        loading,
        login,
        logout,
        register
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

    }
    function useAuth(){
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider.")
    }
    return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth }