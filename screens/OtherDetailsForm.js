import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../styles'
import Page from '../shared/Page'

const OtherDetails = () => {
  const [detailHeading, setDetailHeading] = useState('')
  const [detailText, setDetailText] = useState('')
  const route = useRoute()
  const { itemId } = route.params
  const relRef = doc(db, 'relationships', itemId)
  const navigation = useNavigation('')

  const handleSave = async () => {
    try {
      if ((detailHeading, detailText)) {
        await updateDoc(
          relRef,
          {
            otherDetails: arrayUnion({
              detailHeading,
              detailText,
            }),
          },
          {
            merge: true,
          }
        ).then(navigation.navigate('Relationships'))
      }
    } catch (error) {
      console.log(error)
    }
  }

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
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.button__text}>SAVE</Text>
          </Pressable>`
        </View>
      </View>
    </Page>
  )
}

export default OtherDetails
