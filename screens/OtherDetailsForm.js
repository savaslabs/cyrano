import { View, Text, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { useNavigation } from '@react-navigation/native'

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
    <View>
      <Text>Fill the data...</Text>
      <TextInput
        placeholder="Detail Heading"
        placeholderTextColor="rgba(237,82,68,0.5)"
        value={detailHeading}
        onChangeText={(newHeading) => setDetailHeading(newHeading)}
      />
      <TextInput
        value={detailText}
        onChangeText={(newText) => setDetailText(newText)}
        placeholder="Detail Text"
        placeholderTextColor="rgba(237,82,68,0.5)"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        style={{ height: 150 }}
      />
      <Pressable onPress={handleSave}>
        <Text>SAVE</Text>
      </Pressable>
    </View>
  )
}

export default OtherDetails
