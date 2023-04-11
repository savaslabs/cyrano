import { View, Text, Pressable, Image, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../config/firebase-config'
import { updateDoc, doc } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import Avatar from '../assets/avatar.png'
import { styles } from '../styles'

const UserPanelScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newProfileImage, setNewProfileImage] = useState('')
  const [editFullName, setEditFullName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const { userData, getUser, saveId } = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (userData) {
      setIsLoading(false)
    }
  }, [userData])

  const { email, phone, fullName, profileImg } = userData

  useEffect(() => {
    setEditFullName(fullName)
    setEditEmail(email)
    setEditPhone(phone)
  }, [fullName, email, phone])

  const handleChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri)
    }
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      if (saveId) {
        const usersRef = doc(db, 'users', saveId)
        await updateDoc(
          usersRef,
          {
            profileImg: newProfileImage ? newProfileImage : profileImg,
            fullName: editFullName ? editFullName : fullName,
            email: editEmail ? editEmail : email,
            phone: editPhone ? editPhone : phone,
          },
          {
            merge: true,
          }
        )
          .then(() =>
            Toast.show({
              type: 'success',
              text1: 'Profile updated! 🤝',
              visibilityTime: 2000,
            })
          )
          .then(navigation.navigate('Relationships'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetPassword = () => {
    try {
      sendPasswordResetEmail(auth, email).then(() => {
        Toast.show({
          type: 'success',
          text1: 'Email sent! 🚀',
          visibilityTime: 2000,
        })
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        visibilityTime: 2000,
      })
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={styles.page__upper}>
              <Text style={styles.h1}>Edit Your Profile</Text>
            </View>
            <View style={styles.vertCenter}>
              {profileImg ? (
                <Image
                  source={profileImg}
                  style={[
                    styles.profileImage,
                    newProfileImage
                      ? { display: 'none' }
                      : { display: 'block' },
                  ]}
                />
              ) : (
                <Image
                  source={Avatar}
                  style={[
                    styles.profileImage,
                    newProfileImage
                      ? { display: 'none' }
                      : { display: 'block' },
                  ]}
                />
              )}
              {newProfileImage && (
                <Image source={newProfileImage} style={styles.profileImage} />
              )}
            </View>

            <Pressable onPress={handleChangeImage}>
              <Text style={[styles.textLink, styles.mb16]}>Change photo</Text>
            </Pressable>

            <View style={styles.form}>
              <Text style={styles.form__label}>Name</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editFullName}
                onChangeText={(newEditName) => setEditFullName(newEditName)}
              />
              <Text style={styles.form__label}>Email</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editEmail}
                onChangeText={(newEditEmail) => setEditEmail(newEditEmail)}
              />
              <Text style={styles.form__label}>Phone</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editPhone}
                onChangeText={(newEditPhone) => setEditPhone(newEditPhone)}
              />
              <Pressable onPress={handleResetPassword}>
                {auth.currentUser.providerData[0].providerId === 'password' ? (
                  <Text style={[styles.textLink, styles.mb16]}>
                    Change password
                  </Text>
                ) : (
                  ''
                )}
              </Pressable>
              <View style={styles.page__lower}>
                <View style={styles.paginationBtns}>
                  <Pressable style={[styles.button, styles.buttonGrey]} onPress={() => navigation.navigate('Relationships')}>
                    <Text style={[styles.button__text, styles.buttonGrey__text]}>CANCEL</Text>
                  </Pressable>
                  <Pressable onPress={handleSave} style={[styles.button, styles.buttonNext]}>
                    <Text style={styles.button__text}>SAVE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default UserPanelScreen
