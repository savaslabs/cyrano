import { View, StyleSheet } from 'react-native'
import React from 'react'

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(237, 99, 88, 0.4);',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 7,
  },
})

export default Card
