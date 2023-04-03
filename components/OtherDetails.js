import { View, Text } from 'react-native'
import React from 'react'

const OtherDetails = ({ item }) => {
  const { detailHeading, detailText } = item

  return (
    <View>
      <Text>{detailHeading}</Text>
      <Text>{detailText}</Text>
    </View>
  )
}

export default OtherDetails
