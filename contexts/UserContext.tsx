import { createContext, ReactNode, useEffect, useState } from "react"
import { account } from "../lib/appwrite"
import { AppwriteException, ID, Models } from "react-native-appwrite"
import { router } from "expo-router"

type Result = {
    success: true
} | {
    success: false,
    message: string
}

type UserContextType = {
  user: Models.User | null | undefined;
  register: (email: string, password: string) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null | undefined>(undefined)

export function UserProvider({children} : {children: ReactNode}) {
    const [user, setUser] = useState<Models.User | null | undefined>(null)

    const register = async (email: string, password: string): Promise<Result> => {
        try {
            await account.create({
                userId: ID.unique(),
                email,
                password
            })

            login(email, password)

            return {success: true}
        } catch(e) {
            if(e instanceof AppwriteException) {
                if(e.code === 409) {
                    return {success: false, message: 'User already exists'}
                }

                return { success: false, message: e.message }
            }

            return { success: false, message: 'Something went wrong' }
        }
    }

    const login = async (email: string, password: string): Promise<Result> => {
        try {
            setUser(undefined)

            await account.createEmailPasswordSession({
                email,
                password
            })

            const user = await account.get()
            setUser(user)

            return {success: true}
        } catch(e) {
            setUser(null)

            if(e instanceof AppwriteException) {
                return { success: false, message: e.message }
            }

            return {success: false, message: 'Something went wrong'}
        }
    }

    const logout = async () => {
        await account.deleteSession({
            sessionId: 'current'
        })

        setUser(undefined)
    }

    const setInitialUserInfo = async () => {
        try {
            const user = await account.get()
            setUser(user)
        } catch(e) {
            console.log((e as Error).message)
        }
    }

    useEffect(() => {
        setInitialUserInfo()
    }, []) 

    return (
        <UserContext.Provider value={{user, register, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}