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
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import Logo from '../svg/Logo'
import LogoIMG from '../assets/logo.svg'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { logInUser } = useContext(RelationshipContext)

  const handlePress = async () => {
    if (name && lastName && phone) {
      const newUser = {
        name,
        lastName,
        phone,
      }

      await logInUser(newUser)
    }

    setName('')
    setLastName('')
    setPhone('')

    navigation.navigate('Relationships')
  }

  useEffect(() => {
    if (name && lastName && phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  })

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FED9B7', '#F07167']} style={styles.background}>
        <View style={styles.imgContainer}>
          <Image source={LogoIMG} style={styles.logo} />
          {/* <Logo /> */}
        </View>
          <Text style={styles.h1}>Welcome to Cyrano</Text>
          <Text style={styles.h2}>
            Please fill in your details below to create your account
          </Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(newName) => setName(newName)}
            />
          </View>
          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(newLastName) => setLastName(newLastName)}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="(555) 123-4567"
              value={phone}
              onChangeText={(newPhone) => setPhone(newPhone)}
              placeholderTextColor="rgba(255,255,255, 0.5)"
            />
          </View>
          <Pressable
            style={[styles.button, isDisabled ? styles.disabled : '']}
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text style={styles.text}>Create Account</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth:700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  background: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 80,
    alignSelf: 'center'
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    paddingBottom: 10,
    alignSelf: 'center'
  },
  h2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 20,
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center'
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  imgContainer: {
    paddingBottom: 10,
    alignSelf: 'center'
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
    alignSelf: 'center'
  },
  disabled: {
    opacity: '0.5',
  },
  text: {
    color: '#EF6E62',
    textAlign: 'center'
  },
})

export default HomeScreen
