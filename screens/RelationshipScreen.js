import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native'
import React from 'react'
import ShapeSVG from '../assets/shape.svg'
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

const Relationship = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const route = useRoute()
  const { itemId } = route.params
  const month = new Date().getMonth()
  const date = new Date().getDate()
  const year = new Date().getFullYear()

  // useEffect(() => {
  //   const getRelationship = relationship.find((item) => item.id === itemId)

  //   if (getRelationship) {
  //     setSingleRelationship(getRelationship)
  //   }
  // }, [relationship])

  useEffect(() => {
    getSpecificDoc()
    console.log('Specific Doc running...')
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
      console.log('isLoading rel running...')
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
  } = singleRelationship

  const handleBack = () => {
    navigation.navigate('Relationships')
  }

  const handleBackAdmin = () => {
    navigation.navigate('Admin')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ImageBackground source={ShapeSVG} style={styles.img} />
          {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
            <Pressable style={styles.arrowContainer} onPress={handleBackAdmin}>
              <Image source={ArrowBack} style={styles.arrow} />
            </Pressable>
          ) : (
            <Pressable style={styles.arrowContainer} onPress={handleBack}>
              <Image source={ArrowBack} style={styles.arrow} />
            </Pressable>
          )}

          <View style={styles.heading}>
            {profileImage ? (
              <Image source={profileImage} style={styles.profileImg} />
            ) : (
              <Image
                source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
                style={styles.profileImg}
              />
            )}

            <View style={styles.personInfo}>
              <Text style={styles.name}>
                {name} {lastName}
              </Text>

              <View style={styles.rankingContainer}>
                <RelationshipRating relationshipRating={relationshipRating} />
                <Text style={styles.relationshipText}>
                  Relationship Strength
                </Text>
                <Text style={styles.relationshipText}>
                  As of {month + 1}/{date}/{year}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <Card>
              <Text style={styles.titleLoveStyles}>{name}'s Love Styles</Text>
              <LoveLanguages />
            </Card>
            <Card>
              <Text style={styles.title}>{name}'s Life Events</Text>
              <View style={styles.row}>
                <View>
                  <Text style={styles.title}>Birthday</Text>
                  <Text style={styles.lifeEventsText}>{birthday}</Text>
                </View>

                <View>
                  <Text style={styles.title}>Anniversary</Text>
                  <Text style={styles.lifeEventsText}>{anniversary}</Text>
                </View>
              </View>
            </Card>

            <Pressable
              onPress={() =>
                navigation.navigate('DateLog', {
                  itemId: id,
                })
              }
            >
              <Card>
                <Text style={styles.title}>History</Text>
                <Text style={styles.lifeEventsText}>
                  Your last event was on {lastTimeDate}
                </Text>
                {upcomingDate ? (
                  <Text style={styles.lifeEventsText}>
                    You have 1 upcoming date on {upcomingDate.nextDateDate}
                  </Text>
                ) : (
                  ''
                )}
              </Card>
            </Pressable>
          </View>

          {upcomingDate &&
            upcomingDate.pickRestaurantValue !== 'Choose My Own Restaurant' && (
              <>
                <Text style={styles.message}>
                  You are taking{' '}
                  <Text style={{ fontWeight: '700' }}>{name}</Text> to dinner at{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.pickRestaurantValue}
                  </Text>{' '}
                  on{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.nextDateDate}{' '}
                  </Text>
                  at{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.nextDateTimeBetween}
                  </Text>
                  . Make sure you let them know you're excited for your date!
                </Text>
              </>
            )}

          {upcomingDate &&
            upcomingDate.pickRestaurantValue === 'Choose My Own Restaurant' && (
              <>
                <Text style={styles.message}>
                  You are taking{' '}
                  <Text style={{ fontWeight: '700' }}>{name}</Text> to dinner at{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.nextDatePlace}
                  </Text>{' '}
                  on{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.nextDateDate}
                  </Text>{' '}
                  at{' '}
                  <Text style={{ fontWeight: '700' }}>
                    {upcomingDate.nextDateTimeBetween}.
                  </Text>
                  Make sure you let them know you're excited for your date!
                </Text>
              </>
            )}

          {upcomingDate
            ? ''
            : auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' && (
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('Book', {
                      itemId: id,
                    })
                  }
                >
                  <Text style={styles.text}>Schedule Your Next Date</Text>
                </Pressable>
              )}
        </>
      )}
      {/* <Shape /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    gap: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '-35vh',
    zIndex: '0',
  },
  body: {
    paddingTop: 75,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    marginRight: 20,
  },
  heading: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  birthday: {
    flex: 1,
    flexDirection: 'row',
  },
  birthdayDate: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  relationshipText: {
    color: '#FFFFFF',
    fontSize: 12,
    paddingTop: 10,
    paddingLeft: 10,
  },
  rankingContainer: {
    paddingTop: 5,
  },
  pressable: {
    alignItems: 'center',
    cursor: 'pointer',
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  next: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '400',
  },
  edit: {
    color: '#EF6E62',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 10,
  },
  message: {
    color: '#EF6E62',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    width: 300,
  },
  text: {
    color: '#FFFFFF',
  },
  personInfo: {
    minHeight: 70,
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 65,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
    opacity: '1',
  },
  title: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '700',
  },
  titleLoveStyles: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 20,
  },
  lifeEventsText: {
    paddingTop: 20,
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '400',
  },
  arrowContainer: {
    position: 'absolute',
    top: '15px',
    left: '15px',
  },
  arrow: {
    width: 20,
    height: 20,
  },
})

export default Relationship
