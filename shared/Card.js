import { View, StyleSheet } from 'react-native'
import React from 'react'

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: 'rgba(237, 99, 88, 0.4)',
    padding: '20px',
  },
})

export default Card
