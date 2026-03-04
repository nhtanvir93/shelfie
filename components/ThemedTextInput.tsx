import { TextInput, TextInputProps, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

const ThemedTextInput = ({style, ...props}: TextInputProps) => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    return (
        <TextInput 
            style={[
                {
                    backgroundColor: theme.uiBackground,
                    color: theme.text,
                    padding: 10,
                    borderRadius: 6
                },
                style
            ]}
            placeholderTextColor={theme.text}
            {...props}
        />
    )
}

export default ThemedTextInput