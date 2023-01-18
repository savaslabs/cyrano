import { View, Text, StyleSheet } from 'react-native'

const Restaurants = ({ name, restaurant }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: '16px', fontWeight: '400' }}>
        {name}'s Favorite Restaurants
      </Text>
      <View>
        <Text style={styles.restaurantTitle}>{restaurant}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantTitle: {
    color: '#EF6E62',
    fontSize: '16px',
    fontWeight: '700',
    paddingTop: '10px',
  },
})

export default Restaurants
