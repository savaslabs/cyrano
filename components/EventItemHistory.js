import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'
import { useState } from 'react'

const EventItemHistory = ({ item }) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  const { id, eventTitle, loveStyleTag, date, name, relationshipRating } = item

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>{eventTitle}</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {loveStyleTag?.map((tag, index) => (
            <Text
              key={index}
              style={{
                borderWidth: 1,
                padding: 5,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <View>
        <Text>{date}</Text>
      </View>
      <View style={styles.item}>
        {!relationshipRating ? (
          <Pressable onPress={() => navigation.navigate('Event Rating')}>
            <Text>Complete Event Rating</Text>
          </Pressable>
        ) : (
          <View style={{ backgroundColor: '#677788', padding: 5 }}>
            <RelationshipRating relationshipRating={relationshipRating} />
          </View>
        )}

        <Pressable onPress={(e) => handlePress(e.target.id)}>
          <Text style={styles.heading} nativeID={id}>
            {name}
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
        <Text>View event details</Text>
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

export default EventItemHistory
