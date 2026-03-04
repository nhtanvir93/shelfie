import { StyleSheet, Text } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import useUser from '../../hooks/useUser'
import ThemedButton from '../../components/ThemedButton'
import { useRouter } from 'expo-router'

const Profile = () => {
  const {user, logout} = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.replace('/')
  }

  return (
    <ThemedView safe style={styles.container}>
      <ThemedTitle>{user?.email}</ThemedTitle>
      <Spacer height={20}/>
      <ThemedText>Time to start reading some books</ThemedText>
      <ThemedButton onPress={handleLogout} style={{width: 'auto', marginVertical: 10}}>
        <Text style={styles.btnLabel}>Logout</Text>
      </ThemedButton>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLabel: {
      color: '#f2f2f2', 
      textAlign: 'center'
    }
})