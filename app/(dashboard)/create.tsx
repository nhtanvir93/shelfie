import { Keyboard, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedButton from '../../components/ThemedButton'
import { Colors } from '../../constants/Colors'
import { useBook } from '../../hooks/useBook'
import { useRouter } from 'expo-router'

const Create = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const {createBook} = useBook()
  const router = useRouter()

  const handleSubmit = async () => {
    if(!title.trim() || !author.trim() || !description.trim()) {
      return setError(`You must provide title, author and description to create a new book`)
    }

    setLoading(true)
    setError('')

    const result = await createBook({
      title, author, description
    })

    if(result.success) {
      router.replace('/books')
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe style={styles.container}>
        <ThemedTitle>Add a New Book</ThemedTitle>
        <Spacer height={15}/>
        <ThemedView style={{width: '80%'}}>
          <ThemedTextInput
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.nativeEvent.text)}
          />
          <Spacer height={15} />
          <ThemedTextInput
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.nativeEvent.text)}
          />
          <Spacer height={15} />
          <ThemedTextInput
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.nativeEvent.text)}
            style={{height: 100}}
          />
          <Spacer height={15} />
          <ThemedButton
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.btnLabel}>{loading ? 'Saving...' : 'Create Book'}</Text>
          </ThemedButton>
          <Spacer height={6}/>
          {
            error && <Text style={styles.errorMsg}>{error}</Text>
          }
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Create

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLabel: {
      color: '#f2f2f2', 
      textAlign: 'center'
    },
    errorMsg: {
      color: Colors.warning,
      backgroundColor: '#f5c1c8',
      padding: 10,
      borderRadius: 6,
      marginVertical: 10
    }
})