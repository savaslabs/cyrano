import { View, Text, Pressable, StyleSheet } from 'react-native'
import Card from '../shared/Card'
import { useState, useEffect } from 'react'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import { useNavigation } from '@react-navigation/native'

const AdminDashboard = () => {
  const [users, setUsers] = useState('')
  const [loading, setLoading] = useState(true)
  const userRef = collection(db, 'users')
  const navigation = useNavigation()

  useEffect(() => {
    getUsers()

    console.log('Admin users...')
  }, [])

  const getUsers = async () => {
    const data = await getDocs(userRef)
    const newData = data.docs.map((doc) => {
      return doc.data()
    })
    const filterUsers = newData.filter(
      (item) => item.userId !== auth.currentUser.uid
    )
    setUsers(filterUsers)
  }

  useEffect(() => {
    if (users) {
      setLoading(false)
    }
  }, [users])

  const handlePress = (id) => {
    navigation.navigate('AdminRel', {
      itemId: id,
    })
  }

  return (
    <Page>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Text style={styles.text}>Admin Dashboard</Text>
          <Text style={styles.text}>USER coming from</Text>
          {users &&
            users?.map((user) => (
              <View style={styles.mb3}>
                <Card key={user?.userId}>
                  <View style={styles.row}>
                    <Text style={styles.textSM}>
                      Name: {user?.name} {user?.lastName}
                    </Text>

                    <Text style={styles.textSM}>Email: {user?.email}</Text>

                    <Pressable
                      style={styles.button}
                      onPress={() => handlePress(user?.userId)}
                    >
                      <Text style={styles.buttonText}>SEE RELATIONSHIPS</Text>
                    </Pressable>
                  </View>
                </Card>
              </View>
            ))}
        </>
      )}
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#EF6E62',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  textSM: {
    color: '#EF6E62',
    fontWeight: 'bold',
    fontSize: 10,
    paddingRight: 20,
  },
  mb3: {
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EF6E62',
    padding: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})

export default AdminDashboard
