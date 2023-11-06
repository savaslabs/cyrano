import { View, Text, Image, Pressable, TextInput } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useState, useEffect, createElement } from 'react'
import { styles } from '../styles'
import CloseIcon from '../assets/close.svg'
import { auth, db } from '../config/firebase-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import DropDownPicker from 'react-native-dropdown-picker'
import DatePicker from '../components/form/DatePicker'

const EditEventScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [editEventName, setEditEventName] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')
  const [editPlace, setEditPlace] = useState('')
  const [editComments, setEditComments] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [singleRelationship, setSingleRelationship] = useState('')
  const [eventState, setEventState] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { item, imgDisplay, fullNameDisplay } = route.params

  useEffect(() => {
    if (item) {
      setIsLoading(false)
    }
  }, [])

  const { eventName, dateDate, datePlace, dateTime, additionalComments, id } =
    item

  const TimePicker = () => {
    return createElement('input', {
      type: 'time',
      value: editTime,
      onChange: (event) => {
        setEditTime(event.target.value)
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

  useEffect(() => {
    setEditEventName(eventName)
    setEditDate(dateDate)
    setEditTime(dateTime)
    setEditPlace(datePlace)
    setEditComments(additionalComments)
  }, [dateDate, dateTime, datePlace, additionalComments, eventName])

  const docRef = doc(db, 'events', id)

  useEffect(() => {
    getSpecificDoc()
  }, [])

  const getSpecificDoc = async () => {
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setSingleRelationship(docSnap.data())
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        visibilityTime: 2000,
      })
    }
  }

  useEffect(() => {
    const today = Date.parse(new Date())
    const event = Date.parse(new Date(editDate))

    if (today > event) {
      setEventState(true)
    } else {
      setEventState(false)
    }
  }, [editDate])

  const handleSave = async () => {
    if (singleRelationship) {
      await updateDoc(
        docRef,
        {
          eventName: editEventName ? editEventName : eventName,
          additionalComments: editComments ? editComments : additionalComments,
          dateDate: editDate ? editDate : dateDate,
          datePlace: editPlace ? editPlace : datePlace,
          dateTime: editTime ? editTime : dateTime,
          state: editDate ? (eventState ? 'past' : 'upcoming') : item?.state,
        },
        { merge: true }
      )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Event updated!',
            visibilityTime: 2000,
          })
        })
        .then(() =>
          // auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
          // auth.currentUser.uid !== 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
          auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03'
            ? navigation.navigate('Relationships')
            : navigation.navigate('Admin')
        )
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
              <Text style={styles.h1}>Edit Event</Text>
              {/* <View>
                with{' '}
                <Image
                  source={imgDisplay}
                  style={[styles.profileImage, { width: 24, height: 24 }]}
                />
                <Text>{fullNameDisplay}</Text>
              </View> */}

              <Text style={[styles.form__label, { marginTop: 16 }]}>
                Event Name
              </Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editEventName}
                onChangeText={(newEventName) => setEditEventName(newEventName)}
              />
              <Text style={styles.form__label}>Date</Text>
              {showDatePicker ? (
                <View style={styles.form__twoCol}>
                  <DatePicker
                    style={styles.form__date}
                    onChange={(e) => setEditDate(e.target.value)}
                    onBlur={(e) => setEditDate(e.target.value)}
                    value={editDate}
                  />
                  <Pressable onPress={() => setShowDatePicker(false)}>
                    <Image
                      source={CloseIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  </Pressable>
                </View>
              ) : (
                <Pressable onPress={() => setShowDatePicker(true)}>
                  <TextInput
                    style={styles.form__input}
                    placeholder={dateDate ? '' : 'Edit the event date'}
                    placeholderTextColor="#c7cbd9"
                    value={
                      dateDate ? new Date(dateDate).toLocaleDateString() : ''
                    }
                  />
                </Pressable>
              )}

              <Text style={styles.form__label}>Time</Text>
              {showTimePicker ? (
                <View style={styles.form__twoCol}>
                  <TimePicker style={styles.form__date} />
                  <Pressable onPress={() => setShowTimePicker(false)}>
                    <Image
                      source={CloseIcon}
                      style={{ width: 24, height: 24 }}
                    />
                  </Pressable>
                </View>
              ) : (
                <Pressable onPress={() => setShowTimePicker(true)}>
                  <TextInput
                    style={styles.form__input}
                    placeholder="Edit the time of the event"
                    placeholderTextColor="#c7cbd9"
                    value={editTime}
                  />
                </Pressable>
              )}
              <Text style={styles.form__label}>Location</Text>
              <TextInput
                style={styles.form__input}
                placeholder="Edit their location"
                placeholderTextColor="#c7cbd9"
                value={editPlace}
                onChangeText={(newPlace) => setEditPlace(newPlace)}
              />
              <Text style={styles.form__label}>Additional Comments</Text>
              <TextInput
                style={styles.form__input}
                placeholder="Add any comments"
                placeholderTextColor="#c7cbd9"
                value={editComments}
                onChangeText={(newComments) => setEditComments(newComments)}
              />
              <Pressable onPress={handleSave} style={styles.button}>
                <Text style={styles.button__text}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default EditEventScreen
