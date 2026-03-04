import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedTitle from '../../components/ThemedTitle'
import Spacer from '../../components/Spacer'
import ThemedLink from '../../components/ThemedLink'
import ThemedText from '../../components/ThemedText'
import { Colors } from '../../constants/Colors'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import useUser from '../../hooks/useUser'
import { useRouter } from 'expo-router'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const {register} = useUser()
  const router = useRouter()

  const handleSubmit = async () => {
    setError(null)

    const response = await register(email, password)

    if(!response.success) {
      setError(response.message)
    } else {
      router.replace('/profile')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe style={styles.container}>
        <ThemedTitle>Register</ThemedTitle>
        <Spacer height={20}/>
        <ThemedText>Register for New Account</ThemedText>
        <Spacer height={15}/>
        <ThemedView style={{width: '80%'}}>
          <ThemedTextInput 
            placeholder='Email' 
            keyboardType='email-address'
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
          <ThemedTextInput 
            placeholder='Password' 
            style={{marginVertical: 15}}
            secureTextEntry
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <ThemedButton
            onPress={handleSubmit}
          >
            <Text style={styles.btnLabel}>Register</Text>
          </ThemedButton>
          <Spacer height={6}/>
          {
            error && <Text style={styles.errorMsg}>{error}</Text>
          }
        </ThemedView>
        <Spacer height={100} />
        <ThemedLink style={styles.link} href="/login">Login</ThemedLink>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        borderBottomWidth: 1
    },
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
    errorMsg: {
      color: Colors.warning,
      backgroundColor: '#f5c1c8',
      padding: 10,
      borderRadius: 6,
      marginVertical: 10
    }
})