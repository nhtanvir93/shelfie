import { StyleSheet } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'

const Create = () => {
  return (
    <ThemedView safe style={styles.container}>
      <ThemedTitle>Add a New Book</ThemedTitle>
      <Spacer height={20}/>
    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})