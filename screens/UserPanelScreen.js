import { View, Text, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../config/firebase-config'

const UserPanelScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { userData, getUser } = useAuth()
  const navigation = useNavigation()

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (userData) {
      setIsLoading(false)
    }
  }, [userData])

  const { name, lastName, email, phone } = userData

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <Text>Settings</Text>
          <Text>
            Name: {name} {lastName}
          </Text>
          <Text>Email: {email}</Text>
          <Text>Phone: {phone}</Text>
          <Pressable onPress={() => console.log('ok')}>
            <Text>Save</Text>
          </Pressable>
          {auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
            <Pressable
              onPress={() => navigation.navigate('Relationship Check-In')}
            >
              Relationship Check-In
            </Pressable>
          ) : (
            ''
          )}
        </Page>
      )}
    </>
  )
}

export default UserPanelScreen
