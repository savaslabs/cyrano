import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.svg'
import Google from '../assets/google.png'
import { auth, provider, db } from '../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'

const GoogleCreate = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [userData, setUserData] = useState('')
  const navigation = useNavigation()
  const { logInUser } = useContext(RelationshipContext)
  const usersRef = collection(db, 'users')

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUserData(result)
      navigation.navigate('Relationships')
    })
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
    if (name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  }, [name, lastName, phone])

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
        <Pressable
          style={[styles.button, isDisabled ? styles.disabled : '']}
          onPress={signInWithGoogle}
          disabled={isDisabled}
        >
          <Image source={Google} style={styles.imgSize} />
          <Text style={styles.text}>Create Account With Google</Text>
        </Pressable>
        <Text style={styles.h2}>
          Already have an account?{' '}
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.underline}>Click Here</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  )
}

export default GoogleCreate
