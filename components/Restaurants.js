import { View, Text, StyleSheet } from 'react-native'

const Restaurants = ({ name, restaurantArray }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: 16, fontWeight: '400' }}>
        {name}'s Favorite Restaurants
      </Text>
      <View>
        {restaurantArray &&
          restaurantArray.map((item) => (
            <Text key={item.id} style={styles.restaurantTitle}>
              {item.restaurant}
            </Text>
          ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantTitle: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 10,
  },
})

export default Restaurants
