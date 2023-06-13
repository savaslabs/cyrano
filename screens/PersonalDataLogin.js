import { View, Text, Pressable, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../config/firebase-config'
import { collection, addDoc } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import { styles } from '../styles'

const PersonalDataLogin = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const { user } = useAuth()
  const navigation = useNavigation()
  const usersRef = collection(db, 'users')

  useEffect(() => {
    setName(name)
    setLastName(lastName)
    setPhone(phone)
  }, [name, lastName, phone])

  const handleSave = async () => {
    try {
      if (user && user?.user?.img !== undefined) {
        addDoc(usersRef, {
          userId: user?.user?.id,
          name: name,
          lastName: lastName,
          email: user?.user?.email,
          phone: phone,
          profileImg: user?.user?.img,
          fullName: `${name} ${lastName}`,
        })
          .then(navigation.navigate('Relationships'))
          .then(
            Toast.show({
              type: 'success',
              text1: 'Profile updated! 🚀',
              visibilityTime: 2000,
            })
          )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page>
      <View style={[styles.page__content, styles.pageTopPadding]}>
        <View style={styles.page__upper}>
          <Text style={styles.h2}>We need some more information</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.form__label}>Name</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Your name"
            placeholderTextColor="#c7cbd9"
            value={name}
            onChangeText={(newEditName) => setName(newEditName)}
          />
          <Text style={styles.form__label}>Last Name</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Your last name"
            placeholderTextColor="#c7cbd9"
            value={lastName}
            onChangeText={(newLastName) => setLastName(newLastName)}
          />
          <Text style={styles.form__label}>Phone</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Your phone"
            placeholderTextColor="#c7cbd9"
            value={phone}
            onChangeText={(newEditPhone) => setPhone(newEditPhone)}
          />
          <View style={styles.page__lower}>
            <Pressable onPress={handleSave} style={styles.button}>
              <Text style={styles.button__text}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Page>
  )
}

export default PersonalDataLogin
