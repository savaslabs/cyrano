import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const OtherDetails = ({ item }) => {
  const { detailHeading, detailText } = item

  return (
    <View style={styles.details}>
      <Text style={styles.details__heading}>{detailHeading}</Text>
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
    marginBottom: 16
  },
  details__text: {
    paddingLeft: 16,
    paddingVertical: 8,
    borderLeftColor: '#414762',
    borderLeftWidth: 2
  }
})

export default OtherDetails
