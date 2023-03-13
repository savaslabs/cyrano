import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'

const RelationshipItem = ({ item }) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {item?.profileImage ? (
          <Image
            source={item?.profileImage}
            style={styles.img}
            nativeID={item?.id}
          />
        ) : (
          <Image
            source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
            style={styles.img}
            nativeID={item?.id}
          />
        )}

        <Pressable onPress={(e) => handlePress(e.target.id)}>
          <Text style={styles.heading} nativeID={item?.id}>
            {item?.name} {item?.lastName}
          </Text>
        </Pressable>
        <View style={styles.startBG}>
          <RelationshipRating relationshipRating={item?.relationshipRating} />
        </View>
        {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ? (
          <Pressable onPress={() => console.log()} style={styles.button}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Create Event
            </Text>
          </Pressable>
        ) : (
          ''
        )}
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
    marginLeft: 30
  },
})

export default RelationshipItem
