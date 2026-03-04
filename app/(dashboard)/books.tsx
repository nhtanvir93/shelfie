import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'

const Books = () => {
  return (
    <ThemedView safe style={styles.container}>
      <ThemedTitle>Your Reading List</ThemedTitle>
      <Spacer height={20}/>
    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})