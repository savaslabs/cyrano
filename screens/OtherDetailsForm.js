import { View, Text, TextInput, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles'
import Page from '../shared/Page'
import Toast from 'react-native-toast-message'
import uuid from 'react-native-uuid'

const OtherDetails = () => {
  const [detailHeading, setDetailHeading] = useState('')
  const [detailText, setDetailText] = useState('')
  const [detailsID, setDetailsID] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const route = useRoute()
  const { itemId, imgDisplay, fullNameDisplay } = route.params
  const relRef = doc(db, 'relationships', itemId)
  const navigation = useNavigation('')

  useEffect(() => {
    setDetailsID(uuid.v4())
  }, [])

  const handleSave = async () => {
    try {
      if ((detailHeading, detailText)) {
        await setDoc(doc(db, 'otherDetails', detailsID), {
          id: detailsID,
          detailHeading,
          detailText,
          relID: itemId,
        })
          .then(navigation.navigate('Relationships'))
          .then(() =>
            Toast.show({
              type: 'success',
              text1: 'Details added ✅',
              visibilityTime: 2000,
            })
          )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    navigation.navigate('Relationship', itemId, imgDisplay, fullNameDisplay)
  }

  useEffect(() => {
    if (detailHeading && detailText) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [detailHeading, detailText])

  return (
    <Page>
      <View style={[styles.page__content, styles.pageTopPadding]}>
        <View style={styles.page__upper}>
          <Text style={styles.h2}>Add New Relationship Detail</Text>
        </View>
        <Text style={styles.form__label}>Detail Heading</Text>
        <TextInput
          placeholder="ie. Favorite Restaurants"
          placeholderTextColor="#c7cbd9"
          value={detailHeading}
          onChangeText={(newHeading) => setDetailHeading(newHeading)}
          style={styles.form__input}
        />
        <Text style={styles.form__label}>Detail Text</Text>
        <TextInput
          value={detailText}
          onChangeText={(newText) => setDetailText(newText)}
          placeholder="ie. Roy's Grille, Nobu, etc."
          placeholderTextColor="#c7cbd9"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          style={[styles.form__textArea, { height: 250 }]}
        />
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
              style={[styles.button, isDisabled ? styles.disabled : '']}
              onPress={handleSave}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.button__text,
                  isDisabled ? styles.disabled__text : '',
                ]}
              >
                SAVE
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Page>
  )
}

export default OtherDetails
