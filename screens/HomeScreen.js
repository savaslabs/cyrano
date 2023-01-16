import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()

  const handlePress = async () => {
    if (name && lastName && phone) {
      try {
        const json = JSON.stringify({ name, lastName, phone })
        await AsyncStorage.setItem('userData', json)
      } catch (error) {
        console.log(error)
      }
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
        <Image
          source={require('../assets/logo.svg')}
          style={{ width: 80, height: 60 }}
        />
        <View>
          <Text>Welcome to Cyrano</Text>
          <Text>Please fill your details below to create your account</Text>
        </View>
        <SafeAreaView>
          <View>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(newName) => setName(newName)}
            />
          </View>
          <View>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(newLastName) => setLastName(newLastName)}
            />
          </View>
          <View>
            <Text>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1 (555) 123-4567"
              value={phone}
              onChangeText={(newPhone) => setPhone(newPhone)}
              keyboardType="numeric"
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text style={styles.text}>Create Account</Text>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100vh',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: '10px',
    borderRadius: '65px',
    textAlign: 'center',
  },
  text: {
    color: '#EF6E62',
  },
  inputs: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    margin: 10,
    height: 75,
    paddingLeft: 10,
  },
})

export default HomeScreen
