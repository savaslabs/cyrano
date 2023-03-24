import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native'
import React, { useEffect, useState, useContext, createElement } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.png'
import DropDownPicker from 'react-native-dropdown-picker'
import ArrowBack from '../assets/arrow-back.svg'
import axios from 'axios'
import { db } from '../config/firebase-config'
import { updateDoc, doc, arrayUnion, getDoc } from 'firebase/firestore'

const ScheduleEvent = () => {
  const [relationshipData, setRelationshipData] = useState('')
  const [nextDatePlace, setNextDatePlace] = useState('')
  const [nextDateDate, setNextDateDate] = useState(new Date(Date.now()))
  const [nextDateTime, setNextDateTime] = useState('')
  const [openPickRestaurant, setOpenPickRestaurant] = useState(false)
  const [pickRestaurantValue, setPickRestaurantValue] = useState(null)
  const [pickRestaurantItems, setPickRestaurantItems] = useState([
    { label: "Roy's", value: "Roy's" },
    { label: 'Capital Grille', value: 'Capital Grille' },
    { label: 'Nobu', value: 'Nobu' },
    { label: 'Choose My Own Restaurant', value: 'Choose My Own Restaurant' },
  ])
  const [openLoveStyleTag, setOpenLoveStyleTag] = useState(false)
  const [loveStyleTagValue, setLoveStyleTagValue] = useState(null)
  const [loveStyleTagItems, setLoveStyleTagItems] = useState([
    { label: 'Activity', value: 'Activity' },
    { label: 'Financial', value: 'Financial' },
    { label: 'Physical', value: 'Physical' },
    { label: 'Appeciation', value: 'Appeciation' },
    { label: 'Emotional', value: 'Emotional' },
    { label: 'Intellectual', value: 'Intellectual' },
    { label: 'Practical', value: 'Practical' },
  ])
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship, updateRelationship, user } =
    useContext(RelationshipContext)
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
    if (
      (pickRestaurantValue !== 'Choose My Own Restaurant' &&
        nextDateDate &&
        nextDateTime) ||
      (pickRestaurantValue === 'Choose My Own Restaurant' &&
        nextDatePlace &&
        nextDateDate &&
        nextDateTime)
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  }, [pickRestaurantValue, nextDateDate, nextDateTime])

  const handlePress = async () => {
    if (pickRestaurantValue) {
      await updateDoc(
        docRef,
        {
          nextEvents: arrayUnion({
            name: relationshipData.name,
            lastName: relationshipData.lastName,
            img: relationshipData.profileImage,
            loveStyleTag: loveStyleTagValue,
            nextDatePlace,
            nextDateDate,
            nextDateTime,
            pickRestaurantValue,
          }),
        },
        {
          merge: true,
        }
      ).then(navigation.navigate('Admin'))

      // await updateRelationship(itemId, newRelationship)

      setPickRestaurantValue('')
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
    <View style={styles.container}>
      <Pressable style={styles.arrowContainer} onPress={handleBack}>
        <Image source={ArrowBack} style={styles.arrow} />
      </Pressable>
      <View>
        <Text style={styles.title}>Schedule a New Event</Text>
      </View>
      <View style={styles.form}>
        <View style={{ zIndex: '2' }}>
          <Text style={styles.label}>Where would you like to go?</Text>
          <DropDownPicker
            open={openPickRestaurant}
            value={pickRestaurantValue}
            items={pickRestaurantItems}
            setOpen={setOpenPickRestaurant}
            setValue={setPickRestaurantValue}
            setItems={setPickRestaurantItems}
            style={styles.dropdown}
            placeholder="Select a location"
            placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
            dropDownContainerStyle={{
              top: 50,
              left: 12,
              margin: 'auto',
              color: '#EF6E62',
              borderColor: '#ED5244',
              zIndex: '10000',
              width: '94%',
              height: 160,
            }}
            labelStyle={{
              color: '#ED5244',
            }}
            listItemLabelStyle={{
              color: '#ED5244',
            }}
            disabledItemLabelStyle={{
              color: 'rgba(237,82,68,0.5)',
            }}
          />
        </View>
        {pickRestaurantValue === 'Choose My Own Restaurant' && (
          <View>
            <Text style={styles.label}>Preferred Restaurant</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(237,82,68,0.5)"
              placeholder="Restaurant Name"
              value={nextDatePlace}
              onChangeText={(newNextDatePlace) =>
                setNextDatePlace(newNextDatePlace)
              }
            />
          </View>
        )}

        <View style={{ zIndex: '1' }}>
          <Text style={styles.label}>When would you like to go?</Text>
          <NextDatePicker />
        </View>
        <View style={styles.rowTime}>
          <View style={{ zIndex: '1', width: '50%' }}>
            <Text style={styles.label}>Select Time</Text>
            <TimePicker />
          </View>
        </View>
        <View style={{ zIndex: '2' }}>
          <Text style={styles.label}>Where would you like to go?</Text>
          <DropDownPicker
            open={openLoveStyleTag}
            value={loveStyleTagValue}
            items={loveStyleTagItems}
            setOpen={setOpenLoveStyleTag}
            setValue={setLoveStyleTagValue}
            setItems={setLoveStyleTagItems}
            style={styles.dropdown}
            placeholder="Select Love Styles"
            placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
            dropDownContainerStyle={{
              top: 50,
              left: 12,
              margin: 'auto',
              color: '#EF6E62',
              borderColor: '#ED5244',
              zIndex: '10000',
              width: '94%',
              height: 160,
            }}
            labelStyle={{
              color: '#ED5244',
            }}
            listItemLabelStyle={{
              color: '#ED5244',
            }}
            disabledItemLabelStyle={{
              color: 'rgba(237,82,68,0.5)',
            }}
            multiple={true}
            mode="BADGE"
            badgeDotColors={['#e76f51']}
          />
        </View>
      </View>

      <View style={styles.row}>
        <Pressable
          // style={[styles.button, isDisabled ? styles.disabled : '']}
          style={styles.button}
          onPress={handlePress}
          // disabled={isDisabled}
        >
          <Text style={styles.text}>LET US TAKE IT FROM HERE</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    zIndex: 2,
    alignSelf: 'center',
    width: 300,
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    top: -545,
  },
  arrowContainer: {
    position: 'absolute',
    top: '15px',
    left: '15px',
  },
  arrow: {
    width: 20,
    height: 20,
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  rowTime: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  block: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    top: -500,
  },
  cameraContainer: {
    width: 68,
    height: 68,
    borderRadius: '50%',
    position: 'relative',
    cursor: 'pointer',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(237, 99, 88, 0.4);',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 16,
    elevation: 7,
  },
  camera: {
    width: 15,
    height: 15,
    color: '#EF6E62',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  profileImage: {
    width: 68,
    height: 68,
    borderRadius: '50%',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
    zIndex: 2,
    alignSelf: 'center',
  },
  label: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  title: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    width: 300,
  },
  form: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
    width: '94%',
    minHeight: 0,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 65,
    textAlign: 'center',
    // margin: 'auto',
    marginTop: 20,
    opacity: '1',
    marginRight: 10,
  },
  disabled: {
    opacity: '0.5',
  },
  hideButton: {
    display: 'none',
  },
  showButton: {
    display: 'block',
  },
})

export default ScheduleEvent
