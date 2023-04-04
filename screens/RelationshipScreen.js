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
import circlePlus from '../assets/circle-plus.svg'
import Shape from '../svg/Shape'
import Spinner from '../shared/Spinner'
import ArrowBack from '../assets/arrow-back-white.svg'
import mapMarker from '../assets/map-marker.svg'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'
import { styles } from '../styles'
import OtherDetails from '../components/OtherDetails'

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
    location,
    otherDetails,
  } = singleRelationship

  const fullName = `${name} ${lastName}`

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

  const handlePress = () => {
    navigation.navigate('Other Details', {
      itemId,
    })
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
              <Pressable
                style={styles.arrowContainer}
                onPress={handleBackAdmin}
              >
                <Image source={ArrowBack} style={styles.arrow} />
              </Pressable>
            ) : (
              <Pressable style={styles.arrowContainer} onPress={handleBack}>
                <Image source={ArrowBack} style={styles.arrow} />
              </Pressable>
            )}
            <View
              style={[
                styles.page__upper,
                styles.vertCenter,
                styles.relationshipHeading,
              ]}
            >
              <View style={styles.relationshipHeading__text}>
                <Text style={styles.xl}>{fullName}</Text>
                <View style={styles.location}>
                  <Image source={mapMarker} style={styles.location__icon} />
                  <Text style={styles.location__text}>{location}</Text>
                </View>
              </View>
              <View>
                {profileImage ? (
                  <Image source={profileImage} style={styles.profileImage} />
                ) : (
                  <Image
                    source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
                    style={styles.profileImage}
                  />
                )}
              </View>
            </View>
            <View style={styles.greybox__pair}>
              <View style={styles.greybox}>
                <Text style={styles.h5}>{name.toUpperCase()}'S BIRTHDAY</Text>
                <Text style={[styles.p, styles.mb0]}>{finalBirthday}</Text>
              </View>
              <View style={styles.greybox}>
                <Text style={styles.h5}>YOUR ANNIVERSARY</Text>
                <Text style={[styles.p, styles.mb0]}>{finalAnniversary}</Text>
              </View>
            </View>
            <View style={styles.greybox}>
              <View style={styles.ratingCard}>
                <View style={styles.ratingCard__text}>
                  <Text style={styles.h5}>RELATIONSHIP RATING</Text>
                  <RelationshipRating relationshipRating={relationshipRating} />
                </View>
                <View>
                  <Pressable style={styles.ratingCard__button}>
                    See relationship rating details
                  </Pressable>
                </View>
              </View>
            </View>
            <Text style={[styles.h2, styles.h1Gap, styles.alignLeft]}>
              Upcoming Events
            </Text>
            {upcomingEvents.length === 0 ? (
              <View style={[styles.greybox, styles.greyboxLarge]}>
                <Text style={[styles.p, styles.center]}>
                  You don't have any upcoming events with {name}.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonGrey, styles.center]}
                >
                  <Text
                    style={[
                      styles.button__text,
                      styles.buttonGrey__text,
                      styles.superBold,
                    ]}
                  >
                    SCHEDULE NEXT EVENT
                  </Text>
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
                  itemId,
                })
              }
            >
              <Text style={styles.textLink}>View full events history</Text>
            </Pressable>
            {otherDetails.length === 0 ? (
              <View style={[styles.headingPlusBtn, styles.h1Gap, styles.mb16]}>
                <Text
                  style={[
                    styles.h2,
                    styles.alignLeft,
                    styles.mb0,
                    { paddingTop: 8 },
                  ]}
                >
                  Add Details
                </Text>
                <Pressable style={styles.addBtn} onPress={handlePress}>
                  <Image source={circlePlus} style={styles.addBtn__icon} />
                </Pressable>
              </View>
            ) : (
              <>
                <View
                  style={[styles.headingPlusBtn, styles.h1Gap, styles.mb16]}
                >
                  <Text
                    style={[
                      styles.h2,
                      styles.alignLeft,
                      styles.mb0,
                      { paddingTop: 8 },
                    ]}
                  >
                    Other Details
                  </Text>
                  <Pressable style={styles.addBtn} onPress={handlePress}>
                    <Image source={circlePlus} style={styles.addBtn__icon} />
                  </Pressable>
                </View>
                {otherDetails.map((item, i) => (
                  <OtherDetails item={item} key={i} />
                ))}
              </>
            )}
          </View>
        </Page>
      )}
    </>
  )
}

export default Relationship
