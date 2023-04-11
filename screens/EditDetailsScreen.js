import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { styles } from '../styles'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useNavigation } from '@react-navigation/native'
import { db, auth } from '../config/firebase-config'
import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import TrashIcon from '../assets/trash-white.svg'

const EditDetailsScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [editHeading, setEditHeading] = useState('')
  const [editText, setEditText] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { item } = route.params

  const { id, detailHeading, detailText, relID } = item

  useEffect(() => {
    if (item) {
      setIsLoading(false)
    }
  }, [item])

  useEffect(() => {
    setEditHeading(detailHeading)
    setEditText(detailText)
  }, [detailHeading, detailText])

  const detailsRef = doc(db, 'otherDetails', id)
  const handleSave = async () => {
    await updateDoc(detailsRef, {
      detailHeading: editHeading ? editHeading : detailHeading,
      detailText: editText ? editText : detailText,
    })
      .then(() =>
        Toast.show({
          type: 'success',
          text1: 'Details updated!',
          visibilityTime: 2000,
        })
      )
      .then(() =>
        auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
        auth.currentUser.uid !== 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
          ? navigation.navigate('Relationships')
          : navigation.navigate('Admin')
      )
  }

  const handleCancel = () => {
    navigation.navigate('Relationships')
  }

  const handleDeleteDoc = async () => {
    try {
      await deleteDoc(doc(collection(db, 'otherDetails'), id))
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Details deleted!',
            visibilityTime: 2000,
          })
        )
        .then(() => navigation.navigate('Relationships'))
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.code,
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
              <Text style={styles.h1}>Edit Details</Text>
            </View>
            <Text style={styles.form__label}>Detail Heading</Text>
            <TextInput
              style={styles.form__input}
              placeholderTextColor="#c7cbd9"
              value={editHeading}
              onChangeText={(newHeading) => setEditHeading(newHeading)}
            />
            <Text style={styles.form__label}>Detail Text</Text>
            <TextInput
              placeholderTextColor="#c7cbd9"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={[styles.form__textArea, { height: 250 }]}
              value={editText}
              onChangeText={(newText) => setEditText(newText)}
            />
            <Pressable
              // style={[styles.button, isDisabled ? styles.disabled : '']}
              style={styles.delete}
              onPress={handleDeleteDoc}
              // disabled={isDisabled}
            >
              <Text style={styles.delete__text}>Delete</Text>
            </Pressable>
            <View style={styles.page__lower}>
              <View style={styles.paginationBtns}>
                <Pressable
                  style={[styles.button, styles.buttonGrey]}
                  onPress={handleCancel}
                >
                  <Text style={[styles.button__text, styles.buttonGrey__text]}>
                    CANCEL
                  </Text>
                </Pressable>
                <Pressable
                  // style={[styles.button, isDisabled ? styles.disabled : '']}
                  style={[styles.button, styles.buttonNext]}
                  onPress={handleSave}
                  // disabled={isDisabled}
                >
                  <Text style={styles.button__text}>SAVE</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default EditDetailsScreen
