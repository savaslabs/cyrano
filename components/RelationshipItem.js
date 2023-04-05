import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipCardRating from './RelationshipCardRating'
import { auth } from '../config/firebase-config'
import Avatar from '../assets/avatar.png'

const RelationshipItem = ({ item }) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  return (
    <View style={styles.relationshipCard}>
      <View style={styles.relationshipCard__top}>
        <View style={styles.relationshipCard__profile}>
          {item?.profileImage ? (
            <Image
              source={item?.profileImage}
              style={styles.relationshipCard__img}
              nativeID={item?.id}
            />
          ) : (
            <Image
              source={Avatar}
              style={styles.relationshipCard__img}
              nativeID={item?.id}
            />
          )}
          <Pressable onPress={(e) => handlePress(e.target.id)}>
            <Text style={styles.relationshipCard__name} nativeID={item?.id}>
              {item?.name} {item?.lastName}
            </Text>
          </Pressable>
        </View>
        <RelationshipCardRating relationshipRating={item?.relationshipRating} />
      </View>
      {auth.currentUser.uid != 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
        <View style={styles.relationshipCard__admin}>
          <Pressable
            onPress={() =>
              navigation.navigate('Schedule Event', {
                itemId: item?.id,
              })
            }
            style={styles.relationshipCard__button}
          >
            Create Event
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('Schedule Event', {
                itemId: item?.id,
              })
            }
            style={styles.relationshipCard__button}
          >
            Request Check-in
          </Pressable>
        </View>
      ) : (
        <View style={styles.relationshipCard__bottom}>
          <Pressable style={styles.relationshipCard__button}>
            How is the relationship going?
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('Schedule Event', {
                itemId: item?.id,
              })
            }
            style={styles.relationshipCard__button}
          >
            Create Event
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  relationshipCard: {
    backgroundColor: '#F1F2F6',
    padding: 16,
    borderRadius: 4,
  },
  relationshipCard__top: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
