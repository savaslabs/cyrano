import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
        <Image
          source="https://picsum.photos/200"
          style={styles.img}
          nativeID={item.id}
        />
        <Pressable onPress={(e) => handlePress(e.target.id)}>
          <Text style={styles.heading} nativeID={item.id}>
            {item.name} {item.lastName}
          </Text>
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
    height: '100vh',
    marginTop: '10px',
    marginBottom: '10px',
  },
  heading: {
    color: '#F1776C',
    fontWeight: 800,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
})

export default RelationshipItem
