import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.svg'
import axios from 'axios';

const BookCyrano = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const [nextDatePlace, setNextDatePlace] = useState('')
  const [nextDateTime, setNextDateTime] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship, updateRelationship } = useContext(RelationshipContext)
  const { itemId } = route.params

  useEffect(() => {
    const getRelationship = relationship.find((item) => item.id === itemId)

    if (getRelationship) {
      setSingleRelationship(getRelationship)
    }
  }, [])

  const { name } = singleRelationship

  const handlePress = async (e) => {
    if ((nextDatePlace, nextDateTime)) {
      const newRelationship = {
        nextDatePlace,
        nextDateTime,
      }

      await updateRelationship(itemId, newRelationship)

      navigation.navigate('DateLog', {
        itemId,
      })
      setNextDatePlace('')
      setNextDateTime('')
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      },
      auth: {
        username: sid,
        password: token
      }
    }));
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FED9B7', '#F07167']} style={styles.background}>
        <Image source={LogoIMG} style={styles.logo} />
        {/* <Logo /> */}
        <Text style={styles.h2}>
          Based on {name}'s love styles we recommend this restaurant:{' '}
          <Text style={{ fontWeight: '800' }}>Fancy Restaurant</Text>
        </Text>
        <View>
          <Text style={styles.label}>Enter restaurant name</Text>
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
        <View>
          <Text style={styles.label}>Enter the Date</Text>
          <TextInput
            style={styles.input}
            placeholder="4 - 26 - 1933"
            placeholderTextColor="rgba(237,82,68,0.5)"
            value={nextDateTime}
            onChangeText={(newNextDateTime) => setNextDateTime(newNextDateTime)}
          />
        </View>
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.text}>BOOK WITH CYRANO</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 80,
    alignSelf: 'center',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    paddingBottom: 10,
    alignSelf: 'center',
  },
  h2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 20,
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  imgContainer: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 65,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 20,
    shadowColor: '#ed6358',
    shadowOffset: {
      width: '0',
      height: '4',
    },
    shadowOpacity: '0.19',
    shadowRadius: '5.62',
    elevation: '6',
    opacity: '1',
    width: '50%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
  text: {
    color: '#EF6E62',
    textAlign: 'center',
    fontWeight: '800',
  },
})

export default BookCyrano
