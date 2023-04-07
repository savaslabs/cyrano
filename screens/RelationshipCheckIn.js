import {
  View,
  Text,
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
import Spinner from '../shared/Spinner'
import { styles } from '../styles'


const RelationshipCheckIn = () => {
  const [dateRating, setDateRating] = useState('')
  const [ratingComments, setRatingComments] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const route = useRoute()
  const navigation = useNavigation()
  const { itemId, rating, name } = route.params
  const relRef = doc(db, 'relationships', itemId)

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  useEffect(() => {
    if (rating) {
      // setDateRating(rating)
      setIsLoading(false)
    }
  }, [rating])

  const handleUpdate = async () => {
    setIsLoading(true)
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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={[styles.page__content, styles.pageTopPadding]}>
              <View style={styles.page__upper}>
                <Text style={[styles.h1, styles.alignLeft]}>Relationship Check-in</Text>
              </View>
              <View>
                <Text style={{fontSize: 19, marginBottom: 8, lineHeight: 22}}>
                  How would you say your relationship with <Text style={styles.superBold}>{name}</Text> is going?
                </Text>
                {/* <StarRating
                  rating="0"
                  onChange={setDateRating}
                  color="#7B82A2"
                  starSize="52"
                  style={styles.starRating}
                /> */}
                <StarRating
                  rating={dateRating}
                  onChange={setDateRating}
                  color="#7B82A2"
                  starSize="52"
                  style={styles.starRating}
                />
              </View>

              <View>
                <Text style={[styles.medGap, {fontSize: 19, marginBottom: 16, lineHeight: 22}]}>
                  Are there any details you want to remember about this rating?
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={[styles.form__textArea, {marginTop: 0, marginBottom: 0, height: 112}]}
                  placeholderTextColor="rgba(51,55,75,0.5)"
                  value={ratingComments}
                  onChangeText={(newRatingCom) =>
                    setRatingComments(newRatingCom)
                  }
                />
              </View>

              <View style={styles.page__lower}>
                <Pressable style={styles.button} onPress={handleUpdate}>
                  <Text style={styles.button__text}>SUBMIT</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </Page>
      )}
    </>
  )
}

export default RelationshipCheckIn
