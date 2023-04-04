import { View, Text, Pressable, Image } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import placeholderSkeleton from '../assets/skeleton.png'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'

const RelationshipsHomeAdminScreen = () => {
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const [relationships, setRelationships] = useState('')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const relationshipRef = collection(db, 'relationships')
  const route = useRoute()
  const { itemId } = route.params

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter((item) => item.author.id === itemId)
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
    if (relationships) {
      const eventList = relationships?.reduce(
        (acc, item) => [...acc, ...item.nextEvents],
        []
      )
      setUpcomingEvents(eventList)
    }
  }, [relationships])

  const handlePress = () => {
    setShowMessage(true)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            {relationships.length === 0 ? (
              <>
                <View style={styles.page__upper}>
                  <Text style={styles.h2}>Relationships</Text>
                  <Text style={styles.p}>
                    This user does not have any relationships yet
                  </Text>
                </View>
              </>
            ) : (
              <View>
                {relationships.length > 0 && (
                  <View style={styles.page__upper}>
                    <Text style={[styles.h2, styles.alignLeft]}>
                      Upcoming Events
                    </Text>
                    {upcomingEvents.length === 0 ? (
                      <View style={[styles.greybox, styles.greyboxLarge]}>
                        <Text style={[styles.p, styles.center]}>
                          This user does not have any upcoming events
                        </Text>
                        <Pressable
                          style={[
                            styles.button,
                            styles.buttonGrey,
                            styles.center,
                          ]}
                          onPress={handlePress}
                        >
                          {showMessage ? (
                            <Text>
                              A message has been sent. A cyrano will contact you
                              soon
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.button__text,
                                styles.buttonGrey__text,
                                styles.superBold,
                              ]}
                            >
                              SCHEDULE AN EVENT
                            </Text>
                          )}
                        </Pressable>
                      </View>
                    ) : (
                      upcomingEvents.map((item, index) => (
                        <EventItem item={item} key={index} />
                      ))
                    )}
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Event History', {
                          itemId: 'ifgjdoigjsdo',
                        })
                      }
                    >
                      <Text style={styles.textLink}>View events history</Text>
                    </Pressable>

                    <View>
                      <Text style={[styles.h2, styles.h1Gap, styles.alignLeft]}>
                        Relationships
                      </Text>
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

export default RelationshipsHomeAdminScreen
