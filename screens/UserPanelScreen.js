import { View, Text, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import useAuth from '../hooks/useAuth'

const UserPanelScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { userData, getUser } = useAuth()

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
        </Page>
      )}
    </>
  )
}

export default UserPanelScreen
