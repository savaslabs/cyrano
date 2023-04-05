import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import { useEffect, useState } from 'react'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { auth, db, resetPassword } from '../config/firebase-config'
import { updateDoc, doc } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'
import Toast from 'react-native-toast-message'
import Avatar from '../assets/avatar.png'

const UserPanelScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newProfileImage, setNewProfileImage] = useState('')
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
      if (saveId) {
        const usersRef = doc(db, 'users', saveId)
        await updateDoc(
          usersRef,
          {
            profileImg: newProfileImage,
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
          <Text>Settings</Text>
          <View>
            {profileImg ? (
              <Image
                source={profileImg}
                style={[
                  styles.profileImage,
                  newProfileImage ? { display: 'none' } : { display: 'block' },
                ]}
              />
            ) : (
              <Image
                source={Avatar}
                style={[
                  styles.profileImage,
                  newProfileImage ? { display: 'none' } : { display: 'block' },
                ]}
              />
            )}
            {newProfileImage && (
              <Image source={newProfileImage} style={styles.profileImage} />
            )}
          </View>

          <Pressable onPress={handleChangeImage}>
            <Text>Change photo</Text>
          </Pressable>

          <Text>Name: {fullName}</Text>
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Pressable onPress={handleResetPassword}>
            {auth.currentUser.providerData[0].providerId === 'password' ? (
              <Text>Change password</Text>
            ) : (
              ''
            )}
          </Pressable>
          <Pressable onPress={handleSave}>
            <Text>Save</Text>
          </Pressable>
        </Page>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  relationshipCard: {
    backgroundColor: '#F1F2F6',
    padding: 16,
    borderRadius: 4,
  },
  relationshipCard__top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  relationshipCard__profile: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  relationshipCard__img: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  relationshipCard__name: {
    fontSize: 17,
    fontWeight: 700,
  },
  relationshipCard__bottom: {
    paddingTop: 16,
  },
  relationshipCard__button: {
    padding: 16,
    border: '1px solid #A0A5BD',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderRadius: 60,
    fontSize: 15,
    fontFamily: 'sans-serif',
    color: '#33374B',
    flexGrow: 1,
  },
  relationshipCard__admin: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 16,
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: '50%',
  },
})

export default UserPanelScreen
