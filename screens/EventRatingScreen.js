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
  const [isDisabled, setIsDisabled] = useState(true)
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

  const { id, relID, name, eventName, dateDate, dateTime } = item

  const eventsRef = doc(db, 'events', id)
  const relRef = doc(db, 'relationships', relID)

  const handleSave = async () => {
    await updateDoc(
      eventsRef,
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

  useEffect(() => {
    if (dateRating && relationshipRating) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [dateRating, relationshipRating])

  return (
    <Page>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={[styles.page__content, styles.pageTopPadding]}>
          <View style={styles.page__upper}>
            <Text style={[styles.h2, styles.alignLeft]}>Event Rating</Text>
            <View style={styles.eventSummary}>
              <Text style={styles.eventSummary__title}>
                {eventName} with {name}
              </Text>
              <Text style={styles.eventSummary__date}>
                {new Date(dateDate).toLocaleDateString()} @ {dateTime}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 19, marginBottom: 8, lineHeight: 22 }}>
              How would you rate your event with{' '}
              <Text style={styles.superBold}>{name}</Text>?
            </Text>
            <View>
              <StarRating
                rating={dateRating}
                onChange={setDateRating}
                color="#7B82A2"
                starSize="52"
                style={styles.starRating}
              />
            </View>
          </View>

          <View style={styles.medGap}>
            <Text style={{ fontSize: 19, marginBottom: 8, lineHeight: 22 }}>
              What was a highlight?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={[
                styles.form__textArea,
                { marginTop: 0, marginBottom: 0, height: 112 },
              ]}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={highlight}
              onChangeText={(newHighlight) => setHighlight(newHighlight)}
            />
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 19, marginBottom: 8, lineHeight: 22 }}>
              Were there any lowlights or challenges?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={[
                styles.form__textArea,
                { marginTop: 0, marginBottom: 0, height: 112 },
              ]}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={lowlights}
              onChangeText={(newLow) => setLowlights(newLow)}
            />
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 19, marginBottom: 8, lineHeight: 22 }}>
              Any other notes regarding the recommendation?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={[
                styles.form__textArea,
                { marginTop: 0, marginBottom: 0, height: 112 },
              ]}
              placeholderTextColor="rgba(51,55,75,0.5)"
              value={additionalComments}
              onChangeText={(newNotes) => setAdditionalComments(newNotes)}
            />
          </View>

          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 19, marginBottom: 8, lineHeight: 22 }}>
              How would you rate your overall relationship with{' '}
              <Text style={styles.superBold}>{name}</Text> after this event?
            </Text>
            <StarRating
              rating={relationshipRating}
              onChange={setRelationshipRating}
              color="#7B82A2"
              starSize="52"
              style={styles.starRating}
            />
          </View>
          <View style={styles.page__lower}>
            <View style={styles.paginationBtns}>
              <Pressable
                style={[styles.button, styles.buttonGrey]}
                onPress={() => navigation.navigate('Relationships')}
              >
                <Text style={[styles.button__text, styles.buttonGrey__text]}>
                  CANCEL
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonNext,
                  isDisabled ? styles.disabled : '',
                ]}
                onPress={handleSave}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.button__text,
                    isDisabled ? styles.disabled__text : '',
                  ]}
                >
                  SUBMIT
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </Page>
  )
}

export default EventRatingScreen
