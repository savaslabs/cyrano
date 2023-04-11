import { View, Text, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import { useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import AdminRelItem from '../components/AdminRelItem'
import { styles } from '../styles'


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
      if (searchItem) {
        const newData = users.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchItem.toLowerCase())
          )
        })
        setFilteredUser(newData)
      } else {
        setFilteredUser(users)
      }
    }
  }, [searchItem])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={styles.page__upper}>
              <Text style={[styles.h2, styles.alignLeft]}>Users</Text>
              <Text style={[styles.h4, styles.medGap]}>SEARCH USERS</Text>
              <TextInput
                style={[styles.form__input, {marginTop: 0}]}
                placeholder="Enter first or last name"
                placeholderTextColor="#c7cbd9"
                value={searchItem}
                onChangeText={(newSearchItem) => setSearchItem(newSearchItem)}
              />
            </View>
            <View style={{gap: 16}}>
              {filteredUsers
                ? filteredUsers?.map((user, index) => (
                  <AdminRelItem user={user} key={index} />
                ))
                : users?.map((user, index) => (
                  <AdminRelItem user={user} key={index} />
                ))
              }
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default AdminDashboard
