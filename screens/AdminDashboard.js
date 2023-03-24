import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import { useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import AdminRelItem from '../components/AdminRelItem'

const AdminDashboard = () => {
  const [users, setUsers] = useState('')
  const [filteredUsers, setFilteredUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchItem, setSearchItem] = useState('')
  const userRef = collection(db, 'users')
  const navigation = useNavigation()

  useEffect(() => {
    getUsers()
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

  useEffect(() => {
    if (users) {
      if (searchItem === '') {
        return setFilteredUser([])
      } else {
        const filterArr = users.filter(
          (item) =>
            item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchItem.toLowerCase())
        )

        setFilteredUser(filterArr)
      }
    }
  }, [searchItem])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <Text style={styles.text}>Admin Dashboard</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Search by name"
            placeholderTextColor="#c7cbd9"
            value={searchItem}
            onChangeText={(newSearchItem) => setSearchItem(newSearchItem)}
          />

          {filteredUsers.length > 0
            ? filteredUsers?.map((user) => (
                <AdminRelItem user={user} key={user?.userId} />
              ))
            : users &&
              users?.map((user) => (
                <AdminRelItem user={user} key={user?.userId} />
              ))}
        </Page>
      )}
    </>
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
  form__input: {
    height: 56,
    marginBottom: 16,
    border: '1px solid rgba(199, 203, 217, 1)',
    padding: 16,
    borderRadius: 4,
    color: 'rgba(51, 55, 75, 1)',
    marginTop: -8,
    flexGrow: 1,
    fontSize: 17,
  },
})

export default AdminDashboard
