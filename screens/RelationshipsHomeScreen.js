import { View, Text, Pressable, Image } from 'react-native'
import { styles } from '../styles'
import React, { useEffect, useState } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { db, auth } from '../config/firebase-config'
import { signOut } from 'firebase/auth'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import Spinner from '../shared/Spinner'
import placeholderSkeleton from '../assets/skeleton.png'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '@env'

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
  const upcomingEventsRef = collection(db, 'events')
  const usersRef = collection(db, 'users')
  const isFocused = useIsFocused()
  const { userData, getUser, user } = useAuth()

  useEffect(() => {
    getUser()
  }, [])

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter(
      (item) => item.author.id === auth?.currentUser?.uid
    )
    setRelationships(finalRel)
  }

  const getUpcomingEvents = async () => {
    const data = await getDocs(upcomingEventsRef)
    const newData = data.docs.map((doc) => doc.data())
    const filterUpcoming = newData.filter((item) => item.state === 'upcoming')

    setUpcomingArr(filterUpcoming)
  }

  useEffect(() => {
    if (isFocused) {
      getRelationships()
    }

    getUpcomingEvents()
  }, [isFocused])

  const handlePress = () => {
    navigation.navigate('Add a Relationship')
  }

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
    if (relationships && isFocused) {
      setLoading(false)

      if (!userData) {
        addDoc(usersRef, {
          userId: user?.user?.id,
          name: user?.user?.fullName,
          lastName: user?.user?.fullName,
          email: user?.user?.email,
          phone: '',
          profileImg: user?.user?.img,
          fullName: user?.user?.fullName,
        }).then(() => navigation.navigate('User Panel'))
      }
    }
  }, [relationships, isFocused])

  useEffect(() => {
    if (
      auth?.currentUser?.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
      auth?.currentUser?.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
    ) {
      navigation.navigate('Admin')
    }
  }, [auth])

  const handleMessagePress = async () => {
    navigation.navigate('Schedule Event', {
      itemId: relationships[0].id,
    })
    // setShowMessage(true);
    // const sid = TWILIO_ACCOUNT_SID;
    // const token = TWILIO_AUTH_TOKEN;
    // const qs = require('qs');
    // const cyranoText = `${userData?.name} ${userData?.lastName} has requested an event with ${relationships[0].name} ${relationships[0].lastName}. Text them back at ${userData?.phone}`;
    // await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json", qs.stringify({
    //   Body: cyranoText,
    //   From: '+19705008871',
    //   To: '+12543544848'
    // }),
    // {
    //   auth: {
    //     username: sid,
    //     password: token
    //   }
    // }));
    // const userText = `A message has been sent to your Cyrano. They will be in touch soon with a recommendation about your event with ${relationships[0].name} ${relationships[0].lastName}.`
    // await(axios.post("https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json", qs.stringify({
    //   Body: userText,
    //   From: '+19705008871',
    //   To: userData?.phone
    // }),
    // {
    //   auth: {
    //     username: sid,
    //     password: token
    //   }
    // }));
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
                          {/* {showMessage ? (
                            <Text>
                              A message has been sent. A cyrano will contact you
                              soon
                            </Text>
                          ) : ( */}
                          <Text
                            style={[
                              styles.button__text,
                              styles.buttonGrey__text,
                              styles.superBold,
                            ]}
                          >
                            SCHEDULE AN EVENT
                          </Text>
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
                          itemId: relationships[0].author.id,
                          imgDisplay,
                          fullNameDisplay,
                        })
                      }
                    >
                      <Text style={styles.textLink}>View all events</Text>
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
                      <View style={styles.page__lower}>
                        <Pressable style={styles.button}>
                          <Text
                            style={styles.button__text}
                            onPress={handlePress}
                          >
                            ADD RELATIONSHIP
                          </Text>
                        </Pressable>
                      </View>
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
