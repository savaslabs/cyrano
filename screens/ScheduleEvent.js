import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, createElement } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from '../styles'
import DropDownPicker from 'react-native-dropdown-picker'
import Page from '../shared/Page'
import { db, auth } from '../config/firebase-config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import uuid from 'react-native-uuid'
import DatePicker from '../components/form/DatePicker'

const ScheduleEvent = () => {
  const [relationshipData, setRelationshipData] = useState('')
  const [eventName, setEventName] = useState('')
  const [datePlace, setNextDatePlace] = useState('')
  const [dateDate, setNextDateDate] = useState(new Date(Date.now()))
  const [dateTime, setNextDateTime] = useState('')
  const [docID, setDocID] = useState('')
  const [allID, setAllID] = useState('')
  const [additionalComments, setAdditionalComments] = useState('')
  const [eventState, setEventState] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const { itemId } = route.params
  const docRef = doc(db, 'relationships', itemId)

  useEffect(() => {
    getSpecificDoc()
  }, [])

  const getSpecificDoc = async () => {
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setRelationshipData(docSnap.data())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (eventName && datePlace && dateDate && dateTime) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [eventName, datePlace, dateDate, dateTime])

  useEffect(() => {
    setDocID(uuid.v4())
    setAllID(uuid.v4())
  }, [])

  useEffect(() => {
    const today = Date.parse(new Date())
    const event = Date.parse(new Date(dateDate))

    if (today > event) {
      setEventState(true)
    } else {
      setEventState(false)
    }
  }, [dateDate])

  const handlePress = async () => {
    await setDoc(doc(db, 'events', docID), {
      id: docID,
      name: relationshipData.name,
      lastName: relationshipData.lastName,
      fullName: `${relationshipData.name} ${relationshipData.lastName}`,
      img: relationshipData.profileImage,
      eventName,
      datePlace,
      dateDate,
      dateTime,
      dateRating: '',
      additionalComments,
      relID: itemId,
      state: eventState ? 'past' : 'upcoming',
    })
      .then(
        auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
          auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
          ? navigation.navigate('Admin')
          : navigation.navigate('Relationships')
      )
      .then(
        Toast.show({
          type: 'success',
          text1: 'Event created! ✅',
          visibilityTime: 2000,
        })
      )

    setEventName('')
    setNextDatePlace('')
    setNextDateDate('')
    setNextDateTime('')
  }

  const handleBack = () => {
    navigation.navigate('AdminRel', {
      itemId,
    })
  }

  const TimePicker = () => {
    return createElement('input', {
      type: 'time',
      value: dateTime,
      onChange: (event) => {
        setNextDateTime(event.target.value)
      },
      style: {
        height: 56,
        marginBottom: 16,
        fontSize: 17,
        border: '1px solid rgb(199, 203, 217)',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        color: 'rgba(51, 55, 75, 1)',
        marginTop: -8,
        flexGrow: 1,
        fontFamily: 'sans-serif',
      },
    })
  }

  return (
    <>
      <Page>
        <View style={[styles.page__content, styles.pageTopPadding]}>
          <View style={styles.page__upper}>
            <Text style={styles.h1}>Create Event</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.form__label}>Event Name</Text>
            <TextInput
              style={styles.form__input}
              placeholderTextColor="#c7cbd9"
              placeholder="Event name"
              value={eventName}
              onChangeText={(newEventName) => setEventName(newEventName)}
            />
            <View style={styles.form__twoCol}>
              <View style={styles.form__col}>
                <Text style={styles.form__label}>Date</Text>
                <DatePicker
                  onChange={(e) => setNextDateDate(e.target.value)}
                  onBlur={(e) => setNextDateDate(e.target.value)}
                  value={dateDate}
                />
              </View>
              <View style={styles.form__col}>
                <Text style={styles.form__label}>Time</Text>
                <TimePicker />
              </View>
            </View>
            <Text style={styles.form__label}>Location</Text>
            <TextInput
              style={styles.form__input}
              placeholderTextColor="#c7cbd9"
              placeholder="Address of the event"
              value={datePlace}
              onChangeText={(newNextDatePlace) =>
                setNextDatePlace(newNextDatePlace)
              }
            />
            <View style={{ zIndex: 1 }}>
              <Text style={styles.form__label}>Additional Comments</Text>
              <TextInput
                placeholder="Additional Comments"
                placeholderTextColor="#c7cbd9"
                multiline={true}
                numberOfLines={4}
                style={styles.form__textArea}
                onChangeText={(newComments) =>
                  setAdditionalComments(newComments)
                }
              />
            </View>
          </View>

          <View style={styles.page__lower}>
            <View style={styles.paginationBtns}>
              <Pressable
                style={[styles.button, styles.buttonGrey]}
                onPress={() => navigation.navigate('Admin')}
              >
                <Text style={[styles.button__text, styles.buttonGrey__text]}>
                  CANCEL
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, isDisabled ? styles.disabled : '']}
                onPress={handlePress}
                disabled={isDisabled}
              >
                <Text
                  style={[
                    styles.button__text,
                    isDisabled ? styles.disabled__text : '',
                  ]}
                >
                  CREATE EVENT
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Page>
    </>
  )
}

export default ScheduleEvent
