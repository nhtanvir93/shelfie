import { useColorScheme, View, ViewProps } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends ViewProps {
    safe?: boolean
}

const ThemedView = ({safe = false, style, children, ...props} : Props) => {
    const colorScheme = useColorScheme()
    const theme = colorScheme ? Colors[colorScheme] : Colors.light

    if(!safe) {
        return (
            <View style={[{backgroundColor: theme.background}, style]} {...props}>
                {children}
            </View>
        )
    }

    const insets = useSafeAreaInsets();

    return (
        <View 
            style={
                [
                    {
                        backgroundColor: theme.background,
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom
                    }, 
                    style
                ]
            } 
            {...props}
        >
            {children}
        </View>
    )
}

export default ThemedView