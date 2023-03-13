import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import RelationshipItem from '../components/RelationshipItem'
// import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection, where, query } from 'firebase/firestore'
import Spinner from '../shared/Spinner'

const RelationshipsHomeScreen = () => {
  const [userData, setUserData] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const [relationships, setRelationships] = useState('')
  const { user } = useContext(RelationshipContext)
  const userRef = collection(db, 'users')
  const relationshipRef = collection(db, 'relationships')

  const handlePress = () => {
    navigation.navigate('Add')
  }

  const getUser = async () => {
    const q = query(userRef, where('userId', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUserData(doc.data())
    })
  }

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter(
      (item) => item.author.id === auth.currentUser.uid
    )
    setRelationships(finalRel)
  }

  useEffect(() => {
    getUser()
    console.log('User running..')
  }, [])

  useEffect(() => {
    getRelationships()
    console.log('Rel running...')
  }, [])

  useEffect(() => {
    if (userData && relationships) {
      setLoading(false)
    }
  }, [userData, relationships])

  useEffect(() => {
    if (auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03') {
      navigation.navigate('Admin')
    }
  }, [auth.currentUser.uid])

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.textNew}>
              Hello, {userData?.name} {userData?.lastName}!
            </Text>
            <Text style={styles.textNew}>
              Email: {userData?.email}
            </Text>
            <Text style={styles.textNew}>
              Phone: {userData?.phone}
            </Text>
            <Text style={styles.heading}>Relationships</Text>
            {relationships.length !== 0 ? (
              relationships.map((item) => (
                <RelationshipItem item={item} key={item.id} />
              ))
            ) : (
              <Text style={{ color: '#F17369' }}>
                There are no relationships yet. Start by adding one!
              </Text>
            )}
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.text} onPress={handlePress}>
              Add Relationship
            </Text>
          </Pressable>

          {/* <Navbar style={{ height: '10%' }} /> */}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  data: {
    height: '90%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  heading: {
    color: '#F17369',
    fontSize: 20,
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F17369',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 65,
    width: '50%',
    alignSelf: 'center',
  },
  hover: {
    backgroundColor: 'green',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  textNew: {
    color: '#F17369',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default RelationshipsHomeScreen
