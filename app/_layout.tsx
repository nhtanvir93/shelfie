import { useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '../constants/Colors'
import { UserProvider } from '../contexts/UserContext'
import { BookProvider } from '../contexts/BookContext'

const RootLayout = () => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return (
        <UserProvider>
            <BookProvider>
                <Stack screenOptions={{
                    headerStyle: {backgroundColor: theme.navBackground},
                    headerTintColor: theme.title
                }}>
                    <Stack.Screen name='index' options={{title: 'Home'}} />
                    <Stack.Screen name='(auth)' options={{headerShown: false}} />
                    <Stack.Screen name='(dashboard)' options={{headerShown: false}} />
                </Stack>
            </BookProvider>
        </UserProvider>
    )
}

export default RootLayout