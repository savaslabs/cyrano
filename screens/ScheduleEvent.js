import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, createElement } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styles } from '../styles'
import DropDownPicker from 'react-native-dropdown-picker'
import Page from '../shared/Page'
import { db } from '../config/firebase-config'
import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore'
import Toast from 'react-native-toast-message'

const ScheduleEvent = () => {
  const [relationshipData, setRelationshipData] = useState('')
  const [eventName, setEventName] = useState('')
  const [nextDatePlace, setNextDatePlace] = useState('')
  const [nextDateDate, setNextDateDate] = useState(new Date(Date.now()))
  const [nextDateTime, setNextDateTime] = useState('')
  const [additionalComments, setAdditionalComments] = useState('')
  const [openLoveStyleTag, setOpenLoveStyleTag] = useState(false)
  const [loveStyleTagValue, setLoveStyleTagValue] = useState(null)
  const [loveStyleTagItems, setLoveStyleTagItems] = useState([
    { label: 'Activity', value: 'Activity' },
    { label: 'Financial', value: 'Financial' },
    { label: 'Physical', value: 'Physical' },
    { label: 'Appreciation', value: 'Appreciation' },
    { label: 'Emotional', value: 'Emotional' },
    { label: 'Intellectual', value: 'Intellectual' },
    { label: 'Practical', value: 'Practical' },
  ])
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
    if (nextDatePlace && nextDateDate && nextDateTime) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  }, [nextDateDate, nextDateTime])

  const handlePress = async () => {
    if (nextDatePlace) {
      await updateDoc(
        docRef,
        {
          nextEvents: arrayUnion({
            name: relationshipData.name,
            lastName: relationshipData.lastName,
            fullName: `${relationshipData.name} ${relationshipData.lastName}`,
            img: relationshipData.profileImage,
            loveStyleTag: loveStyleTagValue,
            eventName,
            nextDatePlace,
            nextDateDate,
            nextDateTime,
            additionalComments,
          }),
          totalEvents: arrayUnion({
            name: relationshipData.name,
            lastName: relationshipData.lastName,
            fullName: `${relationshipData.name} ${relationshipData.lastName}`,
            img: relationshipData.profileImage,
            loveStyleTag: loveStyleTagValue,
            eventName,
            nextDatePlace,
            nextDateDate,
            nextDateTime,
            additionalComments,
          }),
        },
        {
          merge: true,
        }
      )
        .then(navigation.navigate('Admin'))
        .then(
          Toast.show({
            type: 'success',
            text1: 'Event created! ✅',
            visibilityTime: 2000,
          })
        )

      // await updateRelationship(itemId, newRelationship)

      setEventName('')
      setNextDatePlace('')
      setNextDateDate('')
      setNextDateTime('')
    }
  }

  const handleBack = () => {
    navigation.navigate('AdminRel', {
      itemId,
    })
  }

  const NextDatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: nextDateDate,
      onChange: (event) => {
        setNextDateDate(new Date(event.target.value))
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

  const TimePicker = () => {
    return createElement('input', {
      type: 'time',
      value: nextDateTime,
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
                <NextDatePicker />
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
              value={nextDatePlace}
              onChangeText={(newNextDatePlace) =>
                setNextDatePlace(newNextDatePlace)
              }
            />
            <Text style={styles.form__label}>Select the love styles</Text>
            <DropDownPicker
              open={openLoveStyleTag}
              value={loveStyleTagValue}
              items={loveStyleTagItems}
              setOpen={setOpenLoveStyleTag}
              setValue={setLoveStyleTagValue}
              setItems={setLoveStyleTagItems}
              style={styles.form__select}
              placeholder="Select Love Styles"
              placeholderStyle={{ color: 'rgba(51,55,75,0.5)' }}
              dropDownContainerStyle={{
                margin: 'auto',
                color: '#33374B',
                zIndex: '20000',
                height: 160,
                bottom: -135,
                borderColor: 'rgba(199, 203, 217, 1)',
                paddingLeft: 4,
                fontSize: 17,
              }}
              listItemLabelStyle={{
                color: '#33374B',
              }}
              disabledItemLabelStyle={{
                color: 'rgba(51,55,75,0.5)',
              }}
              labelStyle={{
                color: '#33374B',
              }}
              multiple={true}
              mode="BADGE"
              badgeDotColors={['#586187']}
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
            <Pressable
              // style={[styles.button, isDisabled ? styles.disabled : '']}
              style={styles.button}
              onPress={handlePress}
              // disabled={isDisabled}
            >
              <Text style={styles.button__text}>CREATE EVENT</Text>
            </Pressable>
          </View>
        </View>
      </Page>
    </>
  )
}

export default ScheduleEvent
