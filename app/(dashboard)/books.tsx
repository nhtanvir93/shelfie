import { FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'
import { useBook } from '../../hooks/useBook'
import ThemedCard from '../../components/ThemedCard'
import ThemedText from '../../components/ThemedText'
import { Colors } from '../../constants/Colors'

const Books = () => {
  const {books} = useBook()

  return (
    <ThemedView safe style={styles.container}>
      <Spacer height={20}/>
      <ThemedTitle style={styles.heading}>Your Reading List</ThemedTitle>
      <Spacer height={20}/>
      <FlatList 
        data={books}
        keyExtractor={(book) => book.$id}
        renderItem={({item: book}) => (
          <Pressable>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{book.title}</ThemedText>
              <ThemedText>Written by {book.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10
    },
    heading: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 900
    },
    card: {
      marginVertical: 10,
      width: '90%',
      marginHorizontal: '5%',
      padding: 10,
      paddingLeft: 14,
      borderLeftColor: Colors.primary,
      borderLeftWidth: 4
    },
    title: {
      fontWeight: 900,
      fontSize: 16,
      marginBottom: 10
    }
})