import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'

const EventItemHistory = ({
  item,
  imgDisplay,
  fullNameDisplay,
  searchEvent,
  relValue,
}) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  const { id, eventName, dateDate, dateRating, state, fullName } = item

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventCard__top}>
        <Text style={styles.eventCard__heading}>{eventName}</Text>
        <Text>{fullName}</Text>

        {searchEvent || relValue !== null ? (
          <Text style={styles.eventCard__tag}>
            {state?.charAt(0).toUpperCase()}
            {state?.slice(1)}
          </Text>
        ) : (
          ''
        )}
      </View>

      {dateDate ? (
        <Text style={styles.eventCard__dateTime}>
          {new Date(dateDate).toLocaleDateString()}
        </Text>
      ) : (
        ''
      )}

      <View style={styles.eventCard__bottom}>
        {!dateRating ? (
          state != 'upcoming' && (
            <Pressable
              style={styles.eventCard__button}
              onPress={() => navigation.navigate('Event Rating', { item })}
            >
              <Text>Complete Event Rating</Text>
            </Pressable>
          )
        ) : (
          <View>
            <RelationshipRating relationshipRating={dateRating} />
          </View>
        )}

        {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
        auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
          <Pressable
            onPress={() => console.log()}
            style={styles.eventCard__link}
          >
            <Text>Edit Event</Text>
          </Pressable>
        ) : (
          ''
        )}

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
  eventCard__button: {
    padding: 16,
    border: '1px solid #A0A5BD',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderRadius: 60,
    fontSize: 15,
    fontFamily: 'sans-serif',
    color: '#33374B',
  },
  eventCard__link: {
    color: 'rgba(51, 55, 75, .75)',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
})

export default EventItemHistory
