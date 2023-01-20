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

const SendMessageScreen = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (name && phone) {
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
          <Image
            source={require('../assets/logo.svg')}
            style={{ width: 80, height: 60 }}
          />
        </View>
        <View style={styles.heading}>
          <Text style={styles.h1}>Text Cyrano</Text>
          <Text style={styles.h2}>
            Please fill out the form to continue the demo
          </Text>
        </View>
        <SafeAreaView style={styles.form}>
          <View>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(newName) => setName(newName)}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1 (555) 123-4567"
              value={phone}
              onChangeText={(newPhone) => setPhone(newPhone)}
              keyboardType="numeric"
              placeholderTextColor="rgba(255,255,255, 0.5)"
            />
          </View>
          <Pressable
            style={[styles.button, isDisabled ? styles.disabled : '']}
            disabled={isDisabled}
          >
            <Text style={styles.text}>Send Message</Text>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    aspectRatio: '10/3',
  },
  background: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    textAlign: 'center',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: '32px',
    fontWeight: '600',
    paddingBottom: '10px',
  },
  h2: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '400',
    paddingBottom: '20px',
    width: '70%',
    alignSelf: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '16px',
    paddingLeft: '10px',
  },
  imgContainer: {
    alignSelf: 'center',
    paddingBottom: '10px',
  },
  form: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    height: '40px',
    margin: '12px',
    borderWidth: '1px',
    padding: '10px',
    borderColor: '#FFFFFF',
    borderRadius: '5px',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '20px',
    paddingLeft: '20px',
    borderRadius: '65px',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '20px',
    shadowColor: '#ed6358',
    shadowOffset: {
      width: '0',
      height: '4',
    },
    shadowOpacity: '0.19',
    shadowRadius: '5.62',
    elevation: '6',
    opacity: '1',
  },
  disabled: {
    opacity: '0.5',
  },
  text: {
    color: '#EF6E62',
  },
})

export default SendMessageScreen
