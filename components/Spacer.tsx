import { DimensionValue, View } from 'react-native'
import React from 'react'

interface Props {
    width?: DimensionValue
    height?: DimensionValue
}

const Spacer = ({width = '100%', height = 40} : Props) => {
    return <View style={{width, height}} />
}

export default Spacer