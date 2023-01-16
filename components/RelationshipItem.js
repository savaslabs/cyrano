import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const RelationshipItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Image source={item.img} style={styles.img} />
        <Text style={styles.heading}>{item.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  heading: {
    color: '#F1776C',
    fontWeight: 800,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
})

export default RelationshipItem
