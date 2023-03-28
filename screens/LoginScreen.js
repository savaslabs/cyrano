import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import LogoIMG from '../assets/cyrano-logo.svg'
import Google from '../assets/google.png'
import { auth, provider } from '../config/firebase-config'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Page from '../shared/Page'

const LoginScreen = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { logInUser } = useContext(RelationshipContext)

  const handlePress = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (auth.currentUser.emailVerified) {
          logInUser(userCredential)
          setEmail('')
          setPassword('')
          navigation.navigate('Relationships')
        } else {
          alert('The email is not verified. Please check your inbox')
        }
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
    <Page>
      <View style={styles.page__logo}>
        <Image source={LogoIMG} style={styles.logo} />
      </View>
      <View style={styles.page__content}>
        <View style={styles.page__upper}>
          <Text style={styles.h1}>Welcome to Cyrano</Text>
          <Text style={styles.p}>Fill in your details below to log in.</Text>
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.form__label}>Email</Text>
            <TextInput
              style={styles.form__input}
              value={email}
              onChangeText={(newEmail) => setEmail(newEmail)}
              placeholder="Enter email address"
              placeholderTextColor="#c7cbd9"
            />
          </View>
          <View>
            <Text style={styles.form__label}>Password</Text>
            <TextInput
              style={styles.form__input}
              value={password}
              onChangeText={(newPassword) => setPassword(newPassword)}
              placeholder="Enter password"
              placeholderTextColor="#c7cbd9"
              secureTextEntry
            />
          </View>
          <View style={styles.page__lower}>
            <Pressable
              style={[styles.button, isDisabled ? styles.disabled : '']}
              onPress={handlePress}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.button__text,
                  isDisabled ? styles.disabled__text : '',
                ]}
              >
                LOGIN
              </Text>
            </Pressable>
            <Pressable
              onPress={signInWithGoogle}
              style={[styles.googleButton, styles.fixedWidth]}
            >
              <Image source={Google} style={styles.googleButton__logo} />
              <Text style={styles.googleButton__text}>Sign in with Google</Text>
            </Pressable>
            <Text style={styles.smallerText}>
              Don't have an account yet?{' '}
              <Pressable
                style={styles.underline}
                onPress={() => navigation.navigate('Create Account')}
              >
                <Text>Click Here</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </View>
    </Page>
  )
}

export default LoginScreen
