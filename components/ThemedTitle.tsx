import { StyleSheet, Text, TextProps, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedTitle = ({style, children, ...props} : TextProps) => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return <Text style={[{color: theme.title}, styles.title, style]} {...props}>{children}</Text>
}

export default ThemedTitle

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 900
    }
})