import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
} from 'react-native'
import { useRef, useEffect, useState } from 'react'
import StarRating from 'react-native-star-rating-widget'
import Page from '../shared/Page'
import { useRoute, useNavigation } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'

const RelationshipCheckIn = () => {
  const [dateRating, setDateRating] = useState('')
  const [ratingComments, setRatingComments] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const route = useRoute()
  const navigation = useNavigation()
  const { itemId, rating } = route.params
  const relRef = doc(db, 'relationships', itemId)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  useEffect(() => {
    setDateRating(rating)
  }, [rating])

  const handleUpdate = async () => {
    await updateDoc(relRef, {
      relationshipRating: dateRating,
      ratingComments,
    })
      .then(() =>
        Toast.show({
          type: 'success',
          text1: 'Relationship updated ✅',
          visibilityTime: 2000,
        })
      )

      .then(() => navigation.navigate('Relationships'))
  }

  return (
    <Page>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <Text>Relationship Check-in</Text>

          <View>
            <Text style={styles.label}>
              How would you say your relationship with Amber is going?
            </Text>
            <StarRating
              rating={dateRating}
              onChange={setDateRating}
              color="#7B82A2"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Are there any details you want to remember about this rating?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={ratingComments}
              onChangeText={(newRatingCom) => setRatingComments(newRatingCom)}
            />
          </View>

          <Pressable style={styles.button} onPress={handleUpdate}>
            <Text>SUBMIT</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#33374B',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#33374B',
    paddingTop: 5,
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 65,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    opacity: '1',
    width: '70%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default RelationshipCheckIn
