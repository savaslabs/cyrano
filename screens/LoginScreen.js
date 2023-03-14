import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.png'
import Google from '../assets/google.png'
import { auth, provider } from '../config/firebase-config'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

const LoginScreen = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { logInUser } = useContext(RelationshipContext)

  const handlePress = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        logInUser(userCredential)
        setEmail('')
        setPassword('')
        navigation.navigate('Relationships')
      })
      .catch((error) => {
        const errorCode = error.code
        alert(errorCode)
      })
  }

  useEffect(() => {
    if (email && password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password])

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      logInUser(result)
      navigation.navigate('Relationships')
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={LogoIMG} style={styles.logo} />
        {/* <Logo /> */}
      </View>
      <Text style={styles.h1}>Welcome to Cyrano</Text>
      <Text style={styles.h2}>Fill in your details below to Login</Text>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(newPassword) => setPassword(newPassword)}
            placeholderTextColor="rgba(255,255,255, 0.5)"
            secureTextEntry
          />
        </View>
        <Pressable
          style={[styles.button, isDisabled ? styles.disabled : '']}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <Text style={styles.text}>LOGIN</Text>
        </Pressable>
        <Text style={styles.h2}>
          Don't have an account yet?{' '}
          <Pressable onPress={() => navigation.navigate('Create Account')}>
            <Text style={styles.underline}>Click Here</Text>
          </Pressable>
        </Text>
        <View style={styles.flex}>
          <View style={styles.row}>
            <Pressable onPress={signInWithGoogle}>
              <View style={styles.loginContainer}>
                <Image source={Google} style={styles.loginImg} />
                <Text style={styles.h2}>Sign in with Google: </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen
