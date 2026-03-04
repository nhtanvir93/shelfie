import { useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'
import { UserProvider } from '../contexts/UserContext'
import GuestOnly from '../components/auth/GuestOnly'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return (
        <UserProvider>
            <Stack screenOptions={{
                headerStyle: {backgroundColor: theme.navBackground},
                headerTintColor: theme.title
            }}>
                <Stack.Screen name='index' options={{title: 'Home'}} />
                <Stack.Screen name='(auth)' options={{headerShown: false}} />
                <Stack.Screen name='(dashboard)' options={{headerShown: false}} />
            </Stack>
        </UserProvider>
    )
}

export default RootLayout