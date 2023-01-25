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

const BookCyrano = () => {
  const { relationship } = useContext(RelationshipContext)

  const { name } = relationship

  const handlePress = async () => {}

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#FED9B7', '#F07167']} style={styles.background}>
        <Image source={LogoIMG} style={styles.logo} />
        {/* <Logo /> */}
        <Text style={styles.h2}>Schedule a new date with {name}</Text>
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
