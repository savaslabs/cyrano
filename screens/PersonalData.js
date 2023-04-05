import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoIMG from '../assets/logo.png'
import { auth, db } from '../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'

const PersonalData = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const usersRef = collection(db, 'users')

  const createUserData = () => {
    addDoc(usersRef, {
      userId: auth.currentUser.uid,
      name: name,
      lastName: lastName,
      email: auth.currentUser.email,
      phone: phone,
      profileImg: '',
      fullName: `${name} ${lastName}`,
    })

    navigation.navigate('Relationships')
  }

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
        We need some more details to create your account.
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
          onPress={createUserData}
          disabled={isDisabled}
        >
          <Text style={styles.text}>CREATE ACCOUNT</Text>
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

export default PersonalData
