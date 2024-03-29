import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoIMG from '../assets/cyrano-logo.svg'
import Google from '../assets/google.png'
import { db } from '../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import Page from '../shared/Page'
import useAuth from '../hooks/useAuth'
import Toast from 'react-native-toast-message'
import Spinner from '../shared/Spinner'

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabledFirst, setIsDisabledFirst] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [pageCounter, setPageCounter] = useState(1)
  const [passwordNotMatch, setPasswordNotMatch] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [checkPhone, setCheckPhone] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const navigation = useNavigation()
  const { createUserWithEmail, userCred, user, signInWithGoogle } =
    useAuth()
  const usersRef = collection(db, 'users')

  useEffect(() => {
    if (user?.isLoggedIn) {
      navigation.navigate('Relationships')
    } else {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    const validateEmail = () => {
      const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
      setCheckEmail(re.test(email))
    }

    const validatePhone = () => {
      const re = /^[0-9]{10,10}$/g
      setCheckPhone(re.test(phone))
    }

    validateEmail()
    validatePhone()
  }, [email, phone])

  const handleNext = () => {
    if (!checkEmail) {
      setEmailError(true)
      Toast.show({
        type: 'error',
        text1: 'The email is not valid',
        visibilityTime: 3000,
      })

      setTimeout(() => {
        setEmailError(false)
      }, 2500)
    } else {
      if (password !== repeatPassword) {
        Toast.show({
          type: 'error',
          text1: "Passwords don't match",
          visibilityTime: 3000,
        })

        setPasswordNotMatch(true)
        setPassword('')
        setRepeatPassword('')

        setTimeout(() => {
          setPasswordNotMatch(false)
        }, 2500)
      } else {
        setPageCounter((count) => count + 1)
      }
    }
  }

  const handleBack = () => {
    setPageCounter((count) => count - 1)
  }

  const handlePress = async () => {
    if (!checkPhone) {
      setPhoneError(true)
      Toast.show({
        type: 'error',
        text1: 'The phone is incorrect',
        visibilityTime: 3000,
      })
      setTimeout(() => {
        setPhoneError(false)
      }, 2500)
    } else {
      try {
        createUserWithEmail(email, password)
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: error,
          visibilityTime: 2000,
        })
      }

      navigation.navigate('Login')
    }
  }

  useEffect(() => {
    // Store user data
    if (userCred) {
      addDoc(usersRef, {
        userId: userCred?.user?.uid,
        name: name,
        lastName: lastName,
        email: userCred?.user?.email,
        phone: phone,
        profileImg: '',
        fullName: `${name} ${lastName}`,
      })
    }
    setEmail('')
    setPassword('')
    setRepeatPassword('')
    setName('')
    setLastName('')
    setPhone('')
  }, [userCred])

  useEffect(() => {
    if (email && password && repeatPassword) {
      setIsDisabledFirst(false)
    } else {
      setIsDisabledFirst(true)
    }
  }, [email, password, repeatPassword])

  useEffect(() => {
    if (name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password, repeatPassword, name, lastName, phone])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={styles.page__logo}>
            <Image source={LogoIMG} style={styles.logo} />
          </View>
          <View style={styles.page__content}>
            <View style={styles.page__upper}>
              <Text style={styles.h1}>Welcome to Cyrano</Text>
              <Text style={styles.p}>
                Fill in your details below to create your account.
              </Text>
            </View>
            <View style={styles.form}>
              {pageCounter === 1 && (
                <>
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
                      style={[
                        styles.form__input,
                        emailError ? styles.form__error : '',
                      ]}
                      value={email}
                      onChangeText={(newEmail) => setEmail(newEmail)}
                      keyboardType="email-address"
                      placeholder="Your email address"
                      placeholderTextColor="#c7cbd9"
                    />
                  </View>
                  <View style={styles.form__twoCol}>
                    <View style={styles.form__col}>
                      <Text
                        style={[
                          styles.form__label,
                          passwordNotMatch ? styles.form__label__error : '',
                        ]}
                      >
                        Password
                      </Text>
                      <TextInput
                        style={[
                          styles.form__input,
                          passwordNotMatch ? styles.form__error : '',
                        ]}
                        value={password}
                        onChangeText={(newPassword) => setPassword(newPassword)}
                        placeholder="Enter password"
                        placeholderTextColor="#c7cbd9"
                        secureTextEntry
                      />
                    </View>
                    <View style={styles.form__col}>
                      <Text
                        style={[
                          styles.form__label,
                          passwordNotMatch ? styles.form__label__error : '',
                        ]}
                      >
                        Verify Password
                      </Text>
                      <TextInput
                        style={[
                          styles.form__input,
                          passwordNotMatch ? styles.form__error : '',
                        ]}
                        value={repeatPassword}
                        onChangeText={(newRepeatPassword) =>
                          setRepeatPassword(newRepeatPassword)
                        }
                        placeholder="Re-enter password"
                        placeholderTextColor="#c7cbd9"
                        secureTextEntry
                      />
                    </View>
                  </View>
                </>
              )}
              {pageCounter === 2 && (
                <>
                  <View style={styles.form__twoCol}>
                    <View style={styles.form__col}>
                      <Text style={styles.form__label}>First Name</Text>
                      <TextInput
                        style={styles.form__input}
                        value={name}
                        onChangeText={(newName) => setName(newName)}
                        placeholder="Enter first name"
                        placeholderTextColor="#c7cbd9"
                      />
                    </View>
                    <View style={styles.form__col}>
                      <Text style={styles.form__label}>Last Name</Text>
                      <TextInput
                        style={styles.form__input}
                        value={lastName}
                        onChangeText={(newLastName) => setLastName(newLastName)}
                        placeholder="Enter last name"
                        placeholderTextColor="#c7cbd9"
                      />
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.form__label,
                      phoneError ? styles.form__label__error : '',
                    ]}
                  >
                    Phone Number
                  </Text>
                  <TextInput
                    style={[
                      styles.form__input,
                      phoneError ? styles.form__error : '',
                    ]}
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChangeText={(newPhone) => setPhone(newPhone)}
                    placeholderTextColor="#c7cbd9"
                  />
                </>
              )}

              <View style={styles.page__lower}>
                {pageCounter === 1 && (
                  <Pressable
                    onPress={handleNext}
                    style={[
                      styles.button,
                      styles.fixedWidth,
                      isDisabledFirst ? styles.disabled : '',
                      { paddingLeft: 16, paddingRight: 16 },
                    ]}
                    disabled={isDisabledFirst}
                  >
                    <Text
                      style={[
                        styles.button__text,
                        isDisabledFirst ? styles.disabled__text : '',
                      ]}
                    >
                      CREATE ACCOUNT
                    </Text>
                  </Pressable>
                )}
                {pageCounter === 2 && (
                  <View style={styles.paginationBtns}>
                    <Pressable
                      onPress={handleBack}
                      style={[styles.button, styles.buttonGrey]}
                    >
                      <Text
                        style={[styles.button__text, styles.buttonGrey__text]}
                      >
                        BACK
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.button,
                        styles.buttonNext,
                        isDisabled ? styles.disabled : '',
                      ]}
                      onPress={handlePress}
                      disabled={isDisabled}
                    >
                      <Text
                        style={[
                          styles.button__text,
                          isDisabled ? styles.disabled__text : '',
                        ]}
                      >
                        CONTINUE
                      </Text>
                    </Pressable>
                  </View>
                )}
                <Pressable
                  // onPress={() => navigation.navigate('Google')}
                  onPress={signInWithGoogle}
                  style={[styles.googleButton, styles.fixedWidth]}
                >
                  <Image source={Google} style={styles.googleButton__logo} />
                  <Text style={styles.googleButton__text}>
                    Create an account with Google
                  </Text>
                </Pressable>
                <Text style={styles.smallerText}>
                  Already have an account?{' '}
                  <Pressable
                    style={styles.underline}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text>Click Here</Text>
                  </Pressable>
                </Text>
              </View>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default HomeScreen
