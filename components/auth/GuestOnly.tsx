import React, { ReactNode, useEffect } from 'react'
import useUser from '../../hooks/useUser'
import { useRouter } from 'expo-router'
import ThemedLoader from '../ThemedLoader'

const GuestOnly = ({children}: {children: ReactNode}) => {
    const {user} = useUser()
    const router = useRouter()

    useEffect(() => {
        if(user === undefined) {
            return
        }

        if(user) {
            router.replace('/profile')
        }
    }, [user])

    if(user) {
        return <ThemedLoader />
    }

    return children
}

export default GuestOnly