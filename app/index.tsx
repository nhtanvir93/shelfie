import { StyleSheet, Image } from "react-native"
import Logo from "../assets/images/react-native-logo.png"
import ThemedView from "../components/ThemedView"
import ThemedTitle from "../components/ThemedTitle"
import ThemedLink from "../components/ThemedLink"
import Spacer from "../components/Spacer"

const Home = function() {
  return (
    <ThemedView safe style={styles.container}>
      <Image style={styles.image} source={Logo} />
      <Spacer height={20} />
      <ThemedTitle>Hello World</ThemedTitle>
      <Spacer height={10} />
      <ThemedLink style={styles.link} href="/login">Login</ThemedLink>
      <Spacer height={5} />
      <ThemedLink style={styles.link} href="/register">Register</ThemedLink>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  link: {
    borderBottomWidth: 1
  }
})