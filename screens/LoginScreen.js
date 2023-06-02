import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoIMG from '../assets/cyrano-logo.svg'
import Google from '../assets/google.png'
import Page from '../shared/Page'
import useAuth from '../hooks/useAuth'
import Toast from 'react-native-toast-message'

const LoginScreen = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { signInWithGoogle, signInWithEmail, user } = useAuth()

  useEffect(() => {
    const validateEmail = () => {
      const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      setCheckEmail(re.test(email))
    }

    validateEmail()
  }, [email])

  useEffect(() => {
    if (email && password) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password])

  useEffect(() => {
    if (user) {
      navigation.navigate('Relationships')
      setEmail('')
      setPassword('')
    }
  }, [user])

  const handlePress = () => {
    if (!checkEmail) {
      setEmailError(true)
      Toast.show({
        type: 'error',
        text1: 'Email is not valid',
        visibilityTime: 3000,
      })

      setTimeout(() => {
        setEmailError(false)
      }, 2500)
    } else {
      signInWithEmail(email, password)
    }
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
            <Text
              style={[
                styles.form__label,
                emailError ? styles.form__label__error : '',
              ]}
            >
              Email
            </Text>
            <TextInput
              style={[styles.form__input, emailError ? styles.form__error : '']}
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
