import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import LoveLanguages from '../components/LoveLanguages'
import RelationshipContext from '../context/RelationshipContext'
import RelationshipRating from '../components/RelationshipRating'
import { db, auth } from '../config/firebase-config'
import { getDoc, doc } from 'firebase/firestore'
import Load from '../assets/spinner.gif'
import Shape from '../svg/Shape'
import Spinner from '../shared/Spinner'
import ArrowBack from '../assets/arrow-back-white.svg'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'
import { styles } from '../styles'

const Relationship = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const [loading, setLoading] = useState(true)
  const [finalBirthday, setFinalBirthday] = useState('')
  const [finalAnniversary, setFinalAnniversary] = useState('')
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const navigation = useNavigation()
  const route = useRoute()
  const { itemId } = route.params

  useEffect(() => {
    getSpecificDoc()
  }, [])

  const getSpecificDoc = async () => {
    const docRef = doc(db, 'relationships', itemId)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setSingleRelationship(docSnap.data())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (singleRelationship) {
      setLoading(false)
    }
  }, [singleRelationship])

  const {
    id,
    name,
    lastName,
    birthday,
    anniversary,
    profileImage,
    relationshipRating,
    lastTimeDate,
    upcomingDate,
    nextEvents,
  } = singleRelationship

  const handleBack = () => {
    navigation.navigate('Relationships')
  }

  const handleBackAdmin = () => {
    navigation.navigate('Admin')
  }

  useEffect(() => {
    if (singleRelationship) {
      setFinalBirthday(
        `${new Date(birthday.seconds * 1000).getMonth()} - ${new Date(
          birthday.seconds * 1000
        ).getDate()} - ${new Date(birthday.seconds * 1000).getFullYear()}`
      )
      setFinalAnniversary(
        `${new Date(anniversary.seconds * 1000).getMonth()} - ${new Date(
          anniversary.seconds * 1000
        ).getDate()} - ${new Date(anniversary.seconds * 1000).getFullYear()}`
      )
    }
  }, [singleRelationship])

  useEffect(() => {
    if (singleRelationship) {
      setUpcomingEvents(nextEvents)
    }
  }, [singleRelationship])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
            <Pressable style={styles.arrowContainer} onPress={handleBackAdmin}>
              <Image source={ArrowBack} style={styles.arrow} />
            </Pressable>
          ) : (
            <Pressable style={styles.arrowContainer} onPress={handleBack}>
              <Image source={ArrowBack} style={styles.arrow} />
            </Pressable>
          )}

          <View style={styles.row}>
            <Text style={styles.name}>
              {name} {lastName}
            </Text>

            {profileImage ? (
              <Image
                source={profileImage}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  marginRight: 10,
                }}
              />
            ) : (
              <Image
                source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
                style={styles.profileImg}
              />
            )}
          </View>

          <View style={styles.row}>
            <Card>
              <Text style={styles.title}>{name.toUpperCase()}'S BIRTHDAY</Text>
              <Text style={styles.lifeEventsText}>{finalBirthday}</Text>
            </Card>

            <Card>
              <Text style={styles.title}>YOUR ANNIVERSARY</Text>
              <Text style={styles.lifeEventsText}>{finalAnniversary}</Text>
            </Card>
          </View>

          <View style={styles.row}>
            <View style={styles.rankingContainer}>
              <Text>Relationship Rating</Text>
              <View>
                <RelationshipRating relationshipRating={relationshipRating} />
              </View>
            </View>
            <Pressable>
              <Text>See relationship rating details</Text>
            </Pressable>
          </View>

          <View style={styles.body}>
            <Card>
              <Text style={styles.titleLoveStyles}>{name}'s Love Styles</Text>
              <LoveLanguages />
            </Card>

            <View>
              <Text>UPCOMING EVENTS</Text>
              {!upcomingEvents ? (
                <View>
                  <Text>You don't have any upcoming event right now</Text>
                  {auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' && (
                    <Pressable
                      style={styles.button}
                      onPress={() => console.log('ok')}
                    >
                      <Text style={styles.text}>SCHEDULE AN EVENT</Text>
                    </Pressable>
                  )}
                </View>
              ) : (
                upcomingEvents.map((item, index) => (
                  <EventItem item={item} key={index} />
                ))
              )}
            </View>

            <Pressable
              onPress={() =>
                navigation.navigate('Event History', {
                  itemId: id,
                })
              }
            >
              <Text>View full events history</Text>
            </Pressable>

            <View>
              <Text>Other Details</Text>

              <View>
                <Text>FAVORITE RESTAURANTS</Text>
                <Text>Roy's</Text>
                <Text>Capital Grille</Text>
                <Text>Nobu</Text>
              </View>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-around',
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: 700,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     gap: 20,
//   },
//   img: {
//     width: '100%',
//     height: '100%',
//     zIndex: 0,
//     position: 'absolute',
//     top: '-35vh',
//     zIndex: '0',
//   },
//   body: {
//     paddingTop: 75,
//   },
//   profileImg: {
//     width: 70,
//     height: 70,
//     borderRadius: '50%',
//     marginRight: 20,
//   },
//   heading: {
//     flex: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     paddingBottom: 20,
//   },
//   birthday: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   birthdayDate: {
//     color: '#677788',
//     fontSize: 16,
//   },
//   name: {
//     color: '#677788',
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   relationshipText: {
//     color: '#677788',
//     fontSize: 12,
//     paddingTop: 10,
//     paddingLeft: 10,
//   },
//   rankingContainer: {
//     paddingTop: 5,
//   },
//   pressable: {
//     alignItems: 'center',
//     cursor: 'pointer',
//   },
//   navigation: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignContent: 'center',
//   },
//   next: {
//     color: '#677788',
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   edit: {
//     color: '#677788',
//     fontSize: 18,
//     fontWeight: '700',
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   message: {
//     color: '#677788',
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//     width: 300,
//   },
//   text: {
//     color: '#FFFFFF',
//   },
//   personInfo: {
//     minHeight: 70,
//   },
//   button: {
//     backgroundColor: '#677788',
//     paddingTop: 10,
//     paddingBottom: 10,
//     paddingRight: 50,
//     paddingLeft: 50,
//     borderRadius: 65,
//     textAlign: 'center',
//     margin: 'auto',
//     marginTop: 20,
//     marginBottom: 20,
//     opacity: '1',
//   },
//   title: {
//     color: '#677788',
//     fontSize: 16,
//     fontWeight: '700',
//   },
//   titleLoveStyles: {
//     color: '#677788',
//     fontSize: 16,
//     fontWeight: '700',
//     paddingBottom: 20,
//   },
//   row: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//     paddingTop: 20,
//   },
//   lifeEventsText: {
//     paddingTop: 20,
//     color: '#677788',
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   arrowContainer: {
//     position: 'absolute',
//     top: '15px',
//     left: '15px',
//   },
//   arrow: {
//     width: 20,
//     height: 20,
//   },
// })

export default Relationship
