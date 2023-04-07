import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'
import { useState, useEffect } from 'react'

const EventItemHistory = ({ item, imgDisplay, fullNameDisplay }) => {
  const [finalDate, setFinalDate] = useState('')
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  const { id, eventName, loveStyleTag, dateDate, dateRating, state } = item

  useEffect(() => {
    if (item) {
      setFinalDate(
        `${new Date(dateDate?.seconds * 1000).getMonth()} - ${new Date(
          dateDate?.seconds * 1000
        ).getDate()} - ${new Date(dateDate?.seconds * 1000).getFullYear()}`
      )
    }
  }, [item])

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventCard__top}>
        <Text style={styles.eventCard__heading}>{eventName}</Text>
        {loveStyleTag?.map((tag, index) => (
          <Text style={styles.eventCard__tag} key={index}>
            {tag}
          </Text>
        ))}
      </View>

      <Text style={styles.eventCard__dateTime}>{finalDate}</Text>
      <View style={styles.eventCard__bottom}>
        {!dateRating ? (
          state !== 'upcoming' && (
            <Pressable onPress={() => navigation.navigate('Event Rating')}>
              <Text>Complete Event Rating</Text>
            </Pressable>
          )
        ) : (
          <View>
            <RelationshipRating relationshipRating={dateRating} />
          </View>
        )}

        {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
          <Pressable onPress={() => console.log()} style={styles.button}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Edit Event
            </Text>
          </Pressable>
        ) : (
          ''
        )}
        {state !== 'past' ? (
          <Pressable
            style={styles.eventCard__link}
            onPress={() =>
              navigation.navigate('Event Details', {
                item,
                imgDisplay,
                fullNameDisplay,
              })
            }
          >
            <Text>View event details</Text>
          </Pressable>
        ) : (
          ''
        )}
      </View>

      {/* {finalDate && (
        <Text style={styles.eventCard__dateTime}>{finalDate}</Text>
      )} */}
    </View>
  )
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: 'rgba(241, 242, 246, 1)',
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  eventCard__top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  eventCard__heading: {
    fontSize: 19,
    fontWeight: 700,
    marginRight: 8,
    color: '#33374B',
  },
  eventCard__tag: {
    backgroundColor: '#ffffff',
    fontSize: 11,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 56,
    color: '#33374B',
  },
  eventCard__dateTime: {
    fontSize: 15,
    marginBottom: 16,
    color: '#33374B',
  },
  eventCard__bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  eventCard__bottomMobile: {
    flexDirection: 'column',
  },
  eventCard__profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventCard__profileImg: {
    width: 40,
    height: 40,
    borderRadius: '100%',
  },
  eventCard__profileName: {
    fontSize: 17,
    fontWeight: 700,
    color: '#33374B',
  },
  eventCard__buttons: {
    flex: 1,
    gap: 8,
    justifySelf: 'flex-end',
    textAlign: 'right',
  },
  eventCard__link: {
    color: 'rgba(51, 55, 75, .75)',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
})

export default EventItemHistory
