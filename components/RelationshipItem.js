import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipCardRating from './RelationshipCardRating'
import { auth } from '../config/firebase-config'
import Avatar from '../assets/avatar.png'

const isSmallDevice = Dimensions.get('window').width < 800

const RelationshipItem = ({
  item,
  upcomingEvents,
  imgDisplay,
  fullNameDisplay,
  userId,
}) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
      upcomingEvents,
      imgDisplay,
      fullNameDisplay,
    })
  }

  const {
    name,
    lastName,
    relationshipValue,
    profileImage,
    id,
    relationshipRating,
  } = item

  return (
    <View style={styles.relationshipCard}>
      <View
        style={[
          styles.relationshipCard__top,
          isSmallDevice && styles.relationshipCard__topMobile,
        ]}
      >
        <View style={styles.relationshipCard__profile}>
          {profileImage ? (
            <Image
              source={profileImage}
              style={styles.relationshipCard__img}
              nativeID={id}
            />
          ) : (
            <Image
              source={Avatar}
              style={styles.relationshipCard__img}
              nativeID={id}
            />
          )}

          <View style={{ alignItems: 'flex-start', gap: 8}}>
            <Pressable onPress={(e) => handlePress(e.target.id)}>
              <Text style={styles.relationshipCard__name} nativeID={id}>
                {name} {lastName}
              </Text>
            </Pressable>
            <Text style={styles.relationshipCard__type}>{relationshipValue}</Text>
          </View>
        </View>
        {relationshipRating ? (
          <RelationshipCardRating
            style={{ maxWidth: 118, marginHorizontal: 'auto' }}
            relationshipRating={relationshipRating}
          />
        ) : (
          ''
        )}
      </View>
      {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
      auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
        <View style={styles.relationshipCard__admin}>
          <Pressable
            onPress={() =>
              navigation.navigate('Schedule Event', {
                itemId: id,
              })
            }
            style={styles.relationshipCard__button}
          >
            <Text> Create Event</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.relationshipCard__bottom}>
          <Pressable
            style={styles.relationshipCard__button}
            onPress={() =>
              navigation.navigate('Relationship Check-In', {
                itemId: id,
                rating: relationshipRating,
                name: name,
                imgDisplay,
                fullNameDisplay,
              })
            }
          >
            <Text>How is the relationship going?</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  relationshipCard: {
    backgroundColor: '#F1F2F6',
    marginBottom: 16,
    padding: 16,
    borderRadius: 4,
  },
  relationshipCard__top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  relationshipCard__topMobile: {
    flexDirection: 'column',
    gap: 16,
  },
  relationshipCard__profile: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  relationshipCard__img: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  relationshipCard__name: {
    fontSize: 17,
    fontWeight: 700,
  },
  relationshipCard__type: {
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: '#586187',
    color: '#ffffff',
    borderRadius: 16
  },
  relationshipCard__bottom: {
    paddingTop: 16,
  },
  relationshipCard__button: {
    padding: 16,
    border: '1px solid #A0A5BD',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    borderRadius: 60,
    fontSize: 15,
    fontFamily: 'sans-serif',
    color: '#33374B',
    flexGrow: 1,
  },
  relationshipCard__admin: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 16,
  },
})

export default RelationshipItem
