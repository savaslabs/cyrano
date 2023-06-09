import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import Page from '../shared/Page'
import { styles } from '../styles'

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
    <>
      <Page>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <View style={[styles.page__content, styles.pageTopPadding]}>
              <View style={styles.page__upper}>
                <Text style={styles.h1}>Manage Relationships</Text>
              </View>
              <Text style={[styles.h4, styles.medGap]}>Relationships</Text>
              {relationships.length !== 0 ? (
                relationships.map((item) => (
                  <RelationshipItem item={item} key={item.id} userId={itemId} />
                ))
              ) : (
                <Text style={styles.p}>
                  The user doesn't have any relationships yet!
                </Text>
              )}
            </View>
            <View style={[styles.page__lower, styles.center]}>
              <Pressable style={[styles.button, styles.buttonGrey]}>
                <Text
                  style={[styles.button__text, styles.buttonGrey__text]}
                  onPress={handlePress}
                >
                  BACK
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </Page>
    </>
  )
}

export default AdminRelationshipsView
