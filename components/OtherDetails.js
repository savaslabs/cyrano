import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const OtherDetails = ({ item }) => {
  const { detailHeading, detailText } = item
  const navigation = useNavigation()

  return (
    <View style={styles.details}>
      <View style={styles.details__row}>
        <Text style={styles.details__heading}>{detailHeading}</Text>{' '}
        <Text style={styles.details__edit} onPress={() => navigation.navigate('Edit Details', { item })}>
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
  details__row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'center'
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
  details__edit: {
    fontSize: 15,
    color: 'rgba(51,55,75,0.75)',
    textAlign: 'center',
    marginBottom: 16,
    textDecorationLine: 'underline'
  },
})

export default OtherDetails
