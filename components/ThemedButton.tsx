import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

interface Props extends PressableProps {
    style?: StyleProp<ViewStyle>
}

const ThemedButton = ({onPress, disabled, style: customStyle, children, ...props}: Props) => {
  return (
    <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed, customStyle]}
        {...props}
    >
        {children}
    </Pressable>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        width: '100%'
    },
    pressed: {
        opacity: 0.8
    },
    btnLabel: {
        color: '#f2f2f2', 
        textAlign: 'center'
    },
    disabledButton: {
        backgroundColor: '#d3d3d3',
        opacity: 0.8
    }
})