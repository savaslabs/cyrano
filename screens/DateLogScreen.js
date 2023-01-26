import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import ShapeSVG from '../assets/shape.svg'
import Birthday from '../assets/birthday.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import RelationshipContext from '../context/RelationshipContext'
import RelationshipRating from '../components/RelationshipRating'
import Shape from '../svg/Shape'

const DateLog = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship } = useContext(RelationshipContext)
  const { itemId } = route.params

  useEffect(() => {
    const getRelationship = relationship.find((item) => item.id === itemId)

    if (getRelationship) {
      setSingleRelationship(getRelationship)
    }
  }, [])

  const { name, lastTimeDate, datePlace, dateRatingValue, upcomingDate } =
    singleRelationship

  return (
    <View style={styles.container}>
      {/* <Shape /> */}
      <Image source={ShapeSVG} style={styles.img} />
      <View style={styles.block}>
        <Text style={styles.h1}>Date Log</Text>
      </View>

      <View style={styles.body}>
        <Card>
          <Text style={styles.title}>Last date with {name}</Text>
          <Text style={styles.next}>Was on {lastTimeDate}</Text>
          <Text style={styles.next}>You went to {datePlace}</Text>
          <Text style={styles.next}>
            You rate this date {dateRatingValue} stars
          </Text>
        </Card>

        <Card>
          <Text style={styles.title}>Upcoming dates with {name}</Text>
          {upcomingDate ? (
            <>
              <Text style={styles.next}>Your next date with {name}</Text>
              <Text style={styles.next}>
                Will be on {upcomingDate.nextDateTime}
              </Text>
              <Text style={styles.next}>
                You will go to {upcomingDate.nextDatePlace}
              </Text>
            </>
          ) : (
            <Text style={styles.message}>
              You have no upcoming dates with {name}, it's time to schedule
              another one.
            </Text>
          )}
        </Card>
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Relationship', {
            itemId,
          })
        }
      >
        <Text style={styles.text}>Back</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
    zIndex: 2,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    top: -335,
  },
  next: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5,
  },
  message: {
    color: '#EF6E62',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
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
})

export default DateLog
