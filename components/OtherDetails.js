import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const OtherDetails = ({ item }) => {
  const { detailHeading, detailText } = item
  const navigation = useNavigation()

  return (
    <View style={styles.details}>
      <View style={styles.row}>
        <Text style={styles.details__heading}>{detailHeading}</Text>{' '}
        <Text onPress={() => navigation.navigate('Edit Details', { item })}>
          Edit
        </Text>
      </View>

      <Text style={styles.details__text}>{detailText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  details: {
    paddingTop: 16,
  },
  details__heading: {
    color: '#586187',
    fontSize: 11,
    fontWeight: 900,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  details__text: {
    paddingLeft: 16,
    paddingVertical: 8,
    borderLeftColor: '#414762',
    borderLeftWidth: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default OtherDetails
