import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.svg'
<<<<<<< HEAD
import DropDownPicker from 'react-native-dropdown-picker'
import ArrowBack from '../assets/arrow-back.svg'
=======
>>>>>>> c02adeb175a8c2ad45419c060c5df7d5b2b20f3c
import axios from 'axios';

const BookCyrano = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const [nextDatePlace, setNextDatePlace] = useState('')
  const [nextDateDate, setNextDateDate] = useState('')
  const [nextDateTimeBetween, setNextDateTimeBetween] = useState('')
  const [nextDateTimeAnd, setNextDateTimeAnd] = useState('')
  const [openPickRestaurant, setOpenPickRestaurant] = useState(false)
  const [pickRestaurantValue, setPickRestaurantValue] = useState(null)
  const [pickRestaurantItems, setPickRestaurantItems] = useState([
    { label: "Roy's", value: "Roy's" },
    { label: 'Capital Grille', value: 'Capital Grille' },
    { label: 'Nobu', value: 'Nobu' },
    { label: 'Choose My Own Restaurant', value: 'Choose My Own Restaurant' },
  ])
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship, updateRelationship } = useContext(RelationshipContext)
  const { itemId } = route.params

  useEffect(() => {
    if (
      (pickRestaurantValue !== 'Choose My Own Restaurant' &&
        nextDateDate &&
        nextDateTimeBetween &&
        nextDateTimeAnd) ||
      (pickRestaurantValue === 'Choose My Own Restaurant' &&
        nextDatePlace &&
        nextDateDate &&
        nextDateTimeBetween &&
        nextDateTimeAnd)
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  })

  useEffect(() => {
    const getRelationship = relationship.find((item) => item.id === itemId)

    if (getRelationship) {
      setSingleRelationship(getRelationship)
    }
  }, [])

  const { name } = singleRelationship

  const handlePress = async () => {
    if (pickRestaurantValue) {
      const newRelationship = {
        nextDatePlace,
        nextDateDate,
        nextDateTimeAnd,
        nextDateTimeBetween,
        pickRestaurantValue,
      }

      await updateRelationship(itemId, newRelationship)

      setPickRestaurantValue('')
      setNextDatePlace('')
      setNextDateDate('')
      setNextDateTimeAnd('')
      setNextDateTimeBetween('')

      if (newRelationship) {
        navigation.navigate('Relationship', {
          itemId,
        })
      }

      require('dotenv').config();
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const qs = require('qs');
      const messageText = `You are taking ${name} to dinner at ${nextDatePlace} on ${nextDateDate} at ${nextDateTimeBetween}.

Make sure you let them know you're excited for your date!`

      await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json", qs.stringify({
        Body: messageText,
        From: '+19705008871',
        To: '(919) 538-3478'
      }),
      {
        auth: {
          username: sid,
          password: token
        }
      }));
    }

    require('dotenv').config();
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const qs = require('qs');

    await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json", qs.stringify({
      Body: 'hi',
      From: '+19705008871',
      To: '+19195383478'
    }),
    {
      auth: {
        username: sid,
        password: token
      }
    }));
  }

  const handleBack = () => {
    navigation.navigate('Relationship', {
      itemId,
    })
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.arrowContainer} onPress={handleBack}>
        <Image source={ArrowBack} style={styles.arrow} />
      </Pressable>
      <View>
        <Text style={styles.title}>
          For your next event, we recommend taking{' '}
          <Text style={{ fontWeight: '800' }}>{name}</Text> out to a fancy
          restaurant
        </Text>
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
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="rgba(237,82,68,0.5)"
            value={nextDateDate}
            onChangeText={(newNexteDateDate) =>
              setNextDateDate(newNexteDateDate)
            }
          />
        </View>
        <View style={styles.rowTime}>
          <View style={{ zIndex: '1', width: '50%' }}>
            <Text style={styles.label}>Between</Text>
            <TextInput
              style={styles.input}
              placeholder="7:00 PM"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={nextDateTimeBetween}
              onChangeText={(newNextDateTimeBetween) =>
                setNextDateTimeBetween(newNextDateTimeBetween)
              }
            />
          </View>
          <View style={{ zIndex: '1', width: '50%' }}>
            <Text style={styles.label}>and</Text>
            <TextInput
              style={styles.input}
              placeholder="9:00 PM"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={nextDateTimeAnd}
              onChangeText={(newNextTimeAnd) =>
                setNextDateTimeAnd(newNextTimeAnd)
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <Pressable
          style={[styles.button, isDisabled ? styles.disabled : '']}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <Text style={styles.text}>BOOK WITH CYRANO</Text>
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
    maxWidth:700,
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

export default BookCyrano
