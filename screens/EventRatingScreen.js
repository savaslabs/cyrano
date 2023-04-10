import { View, Text, TextInput, Animated, Pressable } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import Card from '../shared/Card'
import StarRating from 'react-native-star-rating-widget'
import Page from '../shared/Page'
import { useRoute, useNavigation } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import { doc, updateDoc } from 'firebase/firestore'
import { styles } from '../styles'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

const EventRatingScreen = () => {
  const [dateRating, setDateRating] = useState('')
  const [highlight, setHighlight] = useState('')
  const [lowlights, setLowlights] = useState('')
  const [additionalComments, setAdditionalComments] = useState('')
  const [relationshipRating, setRelationshipRating] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current
  const route = useRoute()
  const { item } = route.params
  const navigation = useNavigation()

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const { id, relID, name, loveStyleTag, eventName, dateDate, dateTime } = item

  const upcomingEventsRef = doc(db, 'prevEvents', id)
  const relRef = doc(db, 'relationships', relID)

  const handleSave = async () => {
    await updateDoc(
      upcomingEventsRef,
      {
        dateRating,
        highlight,
        lowlights,
        additionalComments,
      },
      {
        merge: true,
      }
    )

    await updateDoc(relRef, {
      relationshipRating,
    })
      .then(() => {
        navigation.navigate('Relationships')
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Event rated!',
          visibilityTime: 2000,
        })
      })
  }

  return (
    <Page>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <Text>Event Rating</Text>
          <Card>
            <Text>
              {eventName} with {name}
            </Text>
            {loveStyleTag?.map((tag, index) => (
              <Text style={styles.eventCard__tag} key={index}>
                {tag}
              </Text>
            ))}
            <Text>
              {new Date(dateDate).toLocaleDateString()} @ {dateTime}
            </Text>
          </Card>

          <View>
            <Text style={styles.label}>
              How would you rate your {eventName} date with {name}?
            </Text>
            <View>
              <StarRating
                rating={dateRating}
                onChange={setDateRating}
                color="#7B82A2"
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>What was a highlight?</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.form__textArea}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={highlight}
              onChangeText={(newHighlight) => setHighlight(newHighlight)}
            />
          </View>

          <View>
            <Text style={styles.label}>
              Were there any lowlights or challenges?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.form__textArea}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={lowlights}
              onChangeText={(newLow) => setLowlights(newLow)}
            />
          </View>

          <View>
            <Text style={styles.label}>
              Any other notes regarding the recommendation?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.form__textArea}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={additionalComments}
              onChangeText={(newNotes) => setAdditionalComments(newNotes)}
            />
          </View>

          <View>
            <Text style={styles.label}>
              How would you rate your overall relationship with {name} after
              this event?
            </Text>
            <StarRating
              rating={relationshipRating}
              onChange={setRelationshipRating}
              color="#7B82A2"
            />
          </View>

          <Pressable style={styles.button} onPress={handleSave}>
            <Text>SUBMIT</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Page>
  )
}

export default EventRatingScreen
