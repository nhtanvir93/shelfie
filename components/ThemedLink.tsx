import { useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { Link, LinkProps } from 'expo-router'

interface Props extends LinkProps {
    style?: Record<string, any>
}

const ThemedLink = ({style, children, ...props} : Props) => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return <Link style={[{color: theme.iconColor, borderColor: theme.iconColor}, style]} {...props}>{children}</Link>
}

export default ThemedLink