import { View, Text, Pressable, Image } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState, useContext } from 'react'
import RelationshipItem from '../components/RelationshipItem'
// import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection, where, query } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import placeholderSkeleton from '../assets/skeleton.png'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'

const RelationshipsHomeScreen = () => {
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const [relationships, setRelationships] = useState('')
  // Events state is a placeholder for now
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const { user, getUser } = useContext(RelationshipContext)
  const userRef = collection(db, 'users')
  const relationshipRef = collection(db, 'relationships')

  const handlePress = () => {
    navigation.navigate('Add a Relationship')
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
    getRelationships()
  }, [])

  useEffect(() => {
    if (relationships) {
      setLoading(false)
    }
  }, [relationships])

  useEffect(() => {
    if (auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03') {
      navigation.navigate('Admin')
    }
  }, [auth.currentUser.uid])

  useEffect(() => {
    if (relationships) {
      const eventList = relationships?.reduce(
        (acc, item) => [...acc, ...item.nextEvents],
        []
      )
      setUpcomingEvents(eventList)
    }
  }, [relationships])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <Pressable onPress={() => navigation.navigate('User Panel')}>
              <Text>Go to User Panel</Text>
            </Pressable>

            {/* <Text style={styles.textNew}>
              Hello, {userData?.name} {userData?.lastName}!
            </Text>
            <Text style={styles.textNew}>
              Email: {userData?.email}
            </Text>
            <Text style={styles.textNew}>
              Phone: {userData?.phone}
            </Text> */}
            {relationships.length === 0 ? (
              <>
                <View style={styles.page__upper}>
                  <Text style={styles.h1}>Relationships</Text>
                  <Text style={styles.p}>
                    You don't have any relationships yet. Get started by adding
                    one.
                  </Text>
                </View>
                <Image
                  source={placeholderSkeleton}
                  style={{ width: 450, height: 320 }}
                />
                <View style={styles.page__lower}>
                  <Pressable style={styles.button}>
                    <Text style={styles.button__text} onPress={handlePress}>
                      ADD RELATIONSHIP
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View>
                {relationships.length > 0 && (
                  <View style={styles.page__upper}>
                    <Text style={[styles.h1, styles.alignLeft]}>
                      Upcoming Events
                    </Text>
                    {upcomingEvents.length === 0 ? (
                      <View>
                        <Text style={styles.p}>
                          You don't have any upcoming event right now
                        </Text>
                        <Pressable style={styles.button}>
                          <Text style={styles.button__text}>
                            SCHEDULE AN EVENT
                          </Text>
                        </Pressable>
                      </View>
                    ) : (
                      upcomingEvents.map((item, index) => (
                        <EventItem item={item} key={index} />
                      ))
                    )}
                    <Text>View events history</Text>
                    <View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text style={styles.heading}>Relationships</Text>
                        <Pressable onPress={handlePress}>
                          <Text
                            style={{
                              fontSize: 30,
                              borderWidth: 1,
                              borderRadius: 100,
                              padding: 10,
                            }}
                          >
                            +
                          </Text>
                        </Pressable>
                      </View>

                      {relationships.map((item) => (
                        <View key={item.id}>
                          <RelationshipItem item={item} key={item.id} />
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        </Page>
      )}
    </>
  )
}

export default RelationshipsHomeScreen
