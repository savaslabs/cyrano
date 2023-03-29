import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoIMG from '../assets/cyrano-logo.svg'
import Google from '../assets/google.png'
import { db } from '../config/firebase-config'
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore'
import Page from '../shared/Page'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [pageCounter, setPageCounter] = useState(1)
  const navigation = useNavigation()
  const { createUserWithEmail, userCred } = useAuth()
  const usersRef = collection(db, 'users')

  const handleNext = () => {
    if (password !== repeatPassword) {
      Alert.alert("Password don't match")
      alert("Password don't match")
    } else {
      setPageCounter((count) => count + 1)
    }
  }

  const handleBack = () => {
    setPageCounter((count) => count - 1)
  }

  const handlePress = async () => {
    createUserWithEmail(email, password)

    navigation.navigate('Login')
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
    if (email && password && repeatPassword && name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password, repeatPassword, name, lastName, phone])

  const deleteDocu = async () => {
    await deleteDoc(doc(usersRef, 'VKjarsL0dvLKWgP4l2sf')).then(
      alert('Documento borrado')
    )
  }

  return (
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
                <Text style={styles.form__label}>Email</Text>
                <TextInput
                  style={styles.form__input}
                  value={email}
                  onChangeText={(newEmail) => setEmail(newEmail)}
                  keyboardType="email-address"
                  placeholder="Your email address"
                  placeholderTextColor="#c7cbd9"
                />
              </View>
              <View style={styles.form__twoCol}>
                <View style={styles.form__col}>
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
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Verify Password</Text>
                  <TextInput
                    style={styles.form__input}
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
              <Text style={styles.form__label}>Phone Number</Text>
              <TextInput
                style={styles.form__input}
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
                style={[styles.button, styles.fixedWidth]}
              >
                <Text style={styles.button__text}>CREATE ACCOUNT</Text>
              </Pressable>
            )}
            {pageCounter === 2 && (
              <View style={styles.paginationBtns}>
                <Pressable
                  onPress={handleBack}
                  style={[styles.button, styles.buttonBack]}
                >
                  <Text style={[styles.button__text, styles.buttonBack__text]}>
                    BACK
                  </Text>
                </Pressable>
                <Pressable
                  // style={isDisabled ? styles.disabled : ''}
                  style={[styles.button, styles.buttonNext]}
                  onPress={handlePress}
                  disabled={isDisabled}
                >
                  <Text style={styles.button__text}>CONTINUE</Text>
                </Pressable>
              </View>
            )}
            <Pressable
              onPress={() => navigation.navigate('Google')}
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
          <Pressable onPress={deleteDocu}>DELETE</Pressable>
        </View>
      </View>
    </Page>
  )
}

export default HomeScreen
