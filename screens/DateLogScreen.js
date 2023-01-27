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
  const { itemId, relParams } = route.params

  useEffect(() => {
    const getRelationship = relationship.find((item) => item.id === itemId)

    if (getRelationship) {
      setSingleRelationship(getRelationship)
    }
  }, [])

  const { name, lastTimeDate, datePlace, dateRating, upcomingDate } =
    singleRelationship

  return (
    <View style={styles.container}>
      {/* <Shape /> */}
      <Image source={ShapeSVG} style={styles.img} />
      <View style={styles.block}>
        <Text style={styles.h1}>History</Text>
      </View>

      <View style={styles.body}>
        <Card>
          <Text style={styles.title}>Last event with {name}</Text>
          <Text style={styles.next}>Was on {lastTimeDate}</Text>
          <Text style={styles.next}>You went to {datePlace}</Text>
          <Text style={styles.next}>
            You rate this event {dateRating} stars
          </Text>
          <Text style={styles.next}>{name} rated this event with 4 stars</Text>
        </Card>

        <Card>
          <Text style={styles.title}>Upcoming events with {name}</Text>
          {relParams &&
            relParams.pickRestaurantValue !== 'Choose My Own Restaurant' && (
              <>
                <Text style={styles.next}>
                  You are taking {name} to dinner at{' '}
                  {relParams.pickRestaurantValue}.
                </Text>
                <Text style={styles.next}>
                  On {relParams.nextDateDate} at {relParams.nextDateTimeBetween}
                  .
                </Text>
              </>
            )}

          {relParams &&
            relParams.pickRestaurantValue === 'Choose My Own Restaurant' && (
              <>
                <Text style={styles.next}>
                  You are taking {name} to dinner at {relParams.nextDatePlace}{' '}
                </Text>
                <Text style={styles.next}>
                  On {relParams.nextDateDate} at {relParams.nextDateTimeBetween}
                </Text>
              </>
            )}
          {!relParams && (
            <Text style={styles.next}>
              You have no events scheduled with {name}
            </Text>
          )}
        </Card>
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Relationship', {
            itemId,
            relParams: relParams,
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
