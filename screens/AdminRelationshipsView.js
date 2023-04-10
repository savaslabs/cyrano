import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'

const AdminRelationshipsView = () => {
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const [relationships, setRelationships] = useState('')
  const relationshipRef = collection(db, 'relationships')
  const route = useRoute()
  const { itemId } = route.params

  const handlePress = () => {
    navigation.navigate('Admin')
  }

  useEffect(() => {
    getRelationships()
  }, [])

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter((item) => item.author.id === itemId)
    setRelationships(finalRel)
  }

  useEffect(() => {
    if (relationships) {
      setLoading(false)
    }
  }, [relationships])

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <View style={{ paddingLeft: 20 }}>
            <Text style={styles.heading}>Admin Dashboard</Text>

            <Text style={styles.heading}>Relationships:</Text>
            {relationships.length !== 0 ? (
              relationships.map((item) => (
                <RelationshipItem item={item} key={item.id} />
              ))
            ) : (
              <Text style={{ color: '#F17369' }}>
                The user doesn't have any relationships yet!
              </Text>
            )}
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.text} onPress={handlePress}>
              BACK
            </Text>
          </Pressable>
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
})

export default AdminRelationshipsView
