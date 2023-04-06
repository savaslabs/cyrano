import { View, Text, Pressable, Image } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import { useNavigation } from '@react-navigation/native'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import placeholderSkeleton from '../assets/skeleton.png'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'

const RelationshipsHomeScreen = () => {
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const [relationships, setRelationships] = useState('')
  const [upcomingArr, setUpcomingArr] = useState([])
  const [imgDisplay, setImgDisplay] = useState('')
  const [fullNameDisplay, setFullNameDisplay] = useState('')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const relationshipRef = collection(db, 'relationships')
  const upcomingEventsRef = collection(db, 'upcomingEvents')

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

  const getUpcomingEvents = async () => {
    const data = await getDocs(upcomingEventsRef)
    const newData = data.docs.map((doc) => doc.data())

    setUpcomingArr(newData)
  }

  useEffect(() => {
    getRelationships()
    getUpcomingEvents()
  }, [])

  useEffect(() => {
    if (relationships && upcomingArr) {
      relationships.map((item) => {
        setImgDisplay(item.profileImage)
        setFullNameDisplay(`${item.name} ${item.lastName}`)
        const newArr = upcomingArr.filter((i) => i.relID === item.id)
        setUpcomingEvents(newArr)
      })
    }
  }, [relationships, upcomingArr, imgDisplay, fullNameDisplay])

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

  const handleMessagePress = () => {
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
                    <Text style={[styles.h2, styles.alignLeft]}>
                      Upcoming Events
                    </Text>
                    {upcomingEvents.length === 0 ? (
                      <View style={[styles.greybox, styles.greyboxLarge]}>
                        <Text style={[styles.p, styles.center]}>
                          You don't have any upcoming events right now.
                        </Text>
                        <Pressable
                          style={[
                            styles.button,
                            styles.buttonGrey,
                            styles.center,
                          ]}
                          onPress={handleMessagePress}
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
                        <EventItem
                          item={item}
                          key={index}
                          imgDisplay={imgDisplay}
                          fullNameDisplay={fullNameDisplay}
                        />
                      ))
                    )}
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Event History', {
                          itemId: 'ifgjdoigjsdo',
                          imgDisplay,
                          fullNameDisplay,
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
                          <RelationshipItem
                            item={item}
                            key={item.id}
                            upcomingEvents={upcomingEvents}
                            imgDisplay={imgDisplay}
                            fullNameDisplay={fullNameDisplay}
                          />
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
