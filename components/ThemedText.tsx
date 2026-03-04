import { Text, TextProps, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

interface Props extends TextProps {
    style?: Record<string, any>
}

const ThemedText = ({style, children, ...props} : Props) => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return <Text style={[{color: theme.text}, style]} {...props}>{children}</Text>
}

export default ThemedText