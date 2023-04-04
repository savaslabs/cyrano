import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../assets/logo.svg'
import { auth } from '../config/firebase-config'

const TabNavigator = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Pressable>
        <Image source={Logo} style={{ width: 20, height: 20 }} />
      </Pressable>
      {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
        <>
          <Pressable onPress={() => navigation.navigate('Admin')}>
            <Text>Home</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('User Panel')}>
            <Text>Settings</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable onPress={() => navigation.navigate('Relationships')}>
            <Text>Home</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Event History')}>
            <Text>Events</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('User Panel')}>
            <Text>Settings</Text>
          </Pressable>
        </>
      )}
    </View>
  )
}

export default TabNavigator
