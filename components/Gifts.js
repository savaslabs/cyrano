import { View, Text, StyleSheet } from 'react-native'

const Gifts = ({ name, valueGifts }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: '16px', fontWeight: '400' }}>
        Gift ideas for {name}
      </Text>
      <View>
        <Text style={styles.restaurantTitle}>{valueGifts}</Text>
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

export default Gifts
