import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import RelationshipRating from '../components/RelationshipRating'
import { db, auth } from '../config/firebase-config'
import { getDoc, doc } from 'firebase/firestore'
import circlePlus from '../assets/circle-plus.svg'
import Spinner from '../shared/Spinner'
import ArrowBack from '../assets/arrow-back-white.svg'
import mapMarker from '../assets/map-marker.svg'
import EventItem from '../components/EventItem'
import Page from '../shared/Page'
import { styles } from '../styles'
import OtherDetails from '../components/OtherDetails'
import Avatar from '../assets/avatar.png'

const Relationship = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const [loading, setLoading] = useState(true)
  const [finalBirthday, setFinalBirthday] = useState('')
  const [finalAnniversary, setFinalAnniversary] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [savedId, setSavedId] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { itemId, upcomingEvents, imgDisplay, fullNameDisplay } = route.params

  useEffect(() => {
    getSpecificDoc()
  }, [])

  const getSpecificDoc = async () => {
    const docRef = doc(db, 'relationships', itemId)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setSingleRelationship(docSnap.data())
        setSavedId(docSnap.id)
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
    location,
    otherDetails,
    ratingComments,
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

  const handlePress = () => {
    navigation.navigate('Other Details', {
      itemId,
    })
  }

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
                  <Image source={Avatar} style={styles.profileImage} />
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
                  <Pressable
                    style={styles.ratingCard__button}
                    onPress={() =>
                      navigation.navigate('Relationship Status', {
                        rating: relationshipRating,
                        comments: ratingComments
                          ? ratingComments
                          : 'This relationship has no comments yet',
                      })
                    }
                  >
                    See relationship rating details
                  </Pressable>
                </View>
              </View>
            </View>
            <Text style={[styles.h2, styles.h1Gap, styles.alignLeft]}>
              Upcoming Events
            </Text>
            {!upcomingEvents ? (
              <View style={[styles.greybox, styles.greyboxLarge]}>
                <Text style={[styles.p, styles.center]}>
                  You don't have any upcoming events with {name}.
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonGrey, styles.center]}
                  onPress={handleMessagePress}
                >
                  {showMessage ? (
                    <Text>
                      A message has been sent. A cyrano will contact you soon
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
                <View
                  style={[styles.headingPlusBtn, styles.h1Gap, styles.mb16]}
                ></View>
              </>
            )}
            <Pressable
              style={[styles.button, styles.buttonGrey, styles.center]}
              onPress={() =>
                navigation.navigate('Edit Relationship', {
                  savedId,
                })
              }
            >
              <Text
                style={[
                  styles.button__text,
                  styles.buttonGrey__text,
                  styles.superBold,
                ]}
              >
                EDIT THIS RELATIONSHIP
              </Text>
            </Pressable>
          </View>
        </Page>
      )}
    </>
  )
}

export default Relationship
