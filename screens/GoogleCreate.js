import { View, Text, Image, TextInput, Pressable } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LogoIMG from '../assets/cyrano-logo.svg'
import { db } from '../config/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import Page from '../shared/Page'
import useAuth from '../hooks/useAuth'

const GoogleCreate = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { signInWithGoogle, user } = useAuth()
  const usersRef = collection(db, 'users')

  // Store user data
  useEffect(() => {
    if (user && user?.user?.img !== undefined) {
      addDoc(usersRef, {
        userId: user?.user?.id,
        name: name,
        lastName: lastName,
        email: user?.user?.email,
        phone: phone,
        profileImg: user?.user?.img,
        fullName: `${name} ${lastName}`,
      }).then(navigation.navigate('Relationships'))
    }
  }, [user])

  useEffect(() => {
    if (name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  }, [name, lastName, phone])

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
          <View>
            <Text style={styles.form__label}>Phone Number</Text>
            <TextInput
              style={styles.form__input}
              placeholder="(555) 123-4567"
              value={phone}
              onChangeText={(newPhone) => setPhone(newPhone)}
              placeholderTextColor="#c7cbd9"
            />
          </View>
          <View style={styles.page__lower}>
            <Pressable
              style={[styles.button, isDisabled ? styles.disabled : '']}
              onPress={signInWithGoogle}
              disabled={isDisabled}
            >
              <Text style={styles.button__text}>CREATE ACCOUNT</Text>
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
  )
}

export default GoogleCreate
