import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'
import { useState, useEffect } from 'react'

const EventItem = ({ item }) => {
  const [finalDate, setFinalDate] = useState('')
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  const {
    img,
    lastName,
    name,
    loveStyleTag,
    nextDateDate,
    nextDateTime,
    pickRestaurantValue,
    nextDatePlace,
    additionalComments,
    eventName,
  } = item

  useEffect(() => {
    if (item) {
      setFinalDate(
        `${new Date(nextDateDate.seconds * 1000).getMonth()} - ${new Date(
          nextDateDate.seconds * 1000
        ).getDate()} - ${new Date(nextDateDate.seconds * 1000).getFullYear()}`
      )
    }
  }, [item])

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventCard__topRow}>
        <Text style={styles.h2}>
          {nextDatePlace !== '' ? nextDatePlace : pickRestaurantValue}
        </Text>
        {loveStyleTag.map((tag, index) => (
          <Text style={styles.eventCard__tag} key={index}>
            {tag}
          </Text>
        ))}
      </View>
      <View>
        <Text>{finalDate}</Text>
        <Text>{nextDateTime}</Text>
      </View>
      <View style={styles.item}>
        {img ? (
          <Image source={img} style={styles.img} />
        ) : (
          <Image
            source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
            style={styles.img}
          />
        )}

        <Pressable onPress={(e) => handlePress(e.target.id)}>
          <Text style={styles.heading}>
            {name} {lastName}
          </Text>
        </Pressable>
        {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
          <Pressable onPress={() => console.log()} style={styles.button}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Edit Event
            </Text>
          </Pressable>
        ) : (
          ''
        )}
        <Pressable
          onPress={() =>
            navigation.navigate('Event Details', {
              item: item,
            })
          }
        >
          <Text>View event details</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    color: '#F1776C',
    fontWeight: '800',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: 10,
  },
  startBG: {
    backgroundColor: '#F1776C',
    padding: 10,
    borderRadius: 15,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#EF6E62',
    padding: 8,
    borderRadius: 8,
    marginLeft: 30,
  },
})

export default EventItem
