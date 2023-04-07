import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { styles } from '../styles'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useNavigation } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import {
  doc,
  deleteDoc,
  collection,
  updateDoc,
} from 'firebase/firestore'
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
      .then(() => navigation.navigate('Relationships'))
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
            <View style={[styles.page__lower, styles.form__twoCol]}>
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={styles.button}
                onPress={handleSave}
                // disabled={isDisabled}
              >
                <Text style={styles.button__text}>SAVE</Text>
              </Pressable>
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={styles.button}
                onPress={handleDeleteDoc}
                // disabled={isDisabled}
              >
                <Text style={styles.button__text}>
                  <Image source={TrashIcon} style={{ width: 24, height: 24 }} />
                </Text>
              </Pressable>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default EditDetailsScreen
