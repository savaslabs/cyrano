import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.png'
import Google from '../assets/google.png'
import { auth, db } from '../config/firebase-config'
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [userData, setUserData] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [pageCounter, setPageCounter] = useState(1)
  const navigation = useNavigation()
  const { logInUser } = useContext(RelationshipContext)
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserData(userCredential)
        setEmail('')
        setPassword('')
        setRepeatPassword('')
        setName('')
        setLastName('')
        setPhone('')
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode)
      })
    // if (name && lastName && phone) {
    //   const newUser = {
    //     name,
    //     lastName,
    //     phone,
    //   }

    //   await logInUser(newUser)
    // }

    // setName('')
    // setLastName('')
    // setPhone('')

    // navigation.navigate('Relationships')
  }

  // Store user data
  useEffect(() => {
    if (userData) {
      addDoc(usersRef, {
        userId: userData?.user?.uid,
        name: name,
        lastName: lastName,
        email: userData?.user?.email,
        phone: phone,
      })

      logInUser(userData)
    }
  }, [userData])

  useEffect(() => {
    if (email && password && repeatPassword && name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [email, password, repeatPassword, name, lastName, phone])

  // const deleteDocu = async () => {
  //   await deleteDoc(doc(usersRef, 'xXQlTIeikwXss9X3thZJ')).then(
  //     alert('Documento borrado')
  //   )
  // }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={LogoIMG} style={styles.logo} />
        {/* <Logo /> */}
      </View>
      <Text style={styles.h1}>Welcome to Cyrano</Text>
      <Text style={styles.h2}>
        Fill in your details below to create your account.
      </Text>
      <View style={styles.form}>
        {pageCounter === 1 && (
          <>
            <View>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(newEmail) => setEmail(newEmail)}
                keyboardType="email-address"
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                secureTextEntry
              />
            </View>
            <View>
              <Text style={styles.label}>Repeat Password</Text>
              <TextInput
                style={styles.input}
                value={repeatPassword}
                onChangeText={(newRepeatPassword) =>
                  setRepeatPassword(newRepeatPassword)
                }
                secureTextEntry
              />
            </View>
          </>
        )}
        {pageCounter === 2 && (
          <>
            <View>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(newName) => setName(newName)}
              />
            </View>
            <View>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(newLastName) => setLastName(newLastName)}
              />
            </View>
            <View>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="(555) 123-4567"
                value={phone}
                onChangeText={(newPhone) => setPhone(newPhone)}
                placeholderTextColor="rgba(255,255,255, 0.5)"
              />
            </View>
          </>
        )}

        {pageCounter === 1 && (
          <Pressable onPress={handleNext}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        )}
        {pageCounter === 2 && (
          <View>
            <Pressable onPress={handleBack}>
              <Text style={styles.text}>Back</Text>
            </Pressable>
            <Pressable
              style={isDisabled ? styles.disabled : ''}
              onPress={handlePress}
              disabled={isDisabled}
            >
              <Text style={styles.text}>CREATE ACCOUNT</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.h2}>
          Already have an account?{' '}
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text>Click Here</Text>
          </Pressable>
        </Text>
        <View style={styles.flex}>
          <Text style={styles.h2}>Or: </Text>
          <View style={styles.row}>
            <Pressable onPress={() => navigation.navigate('Google')}>
              <View style={styles.loginContainer}>
                <Image source={Google} style={styles.loginImg} />
                <Text style={styles.h2}>Create your account with Google</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      {/* <Pressable onPress={deleteDocu}>DELETE</Pressable> */}
    </View>
  )
}

export default HomeScreen
