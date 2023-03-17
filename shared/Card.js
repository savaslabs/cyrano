import { View, StyleSheet } from 'react-native'
import React from 'react'

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#677788',
    textAlign: 'center'
  },
})

export default Card
