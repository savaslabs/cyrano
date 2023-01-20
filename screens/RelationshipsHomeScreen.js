import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import RelationshipItem from '../components/RelationshipItem'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'

const RelationshipsHomeScreen = () => {
  const navigation = useNavigation()
  const { relationship } = useContext(RelationshipContext)

  const handlePress = () => {
    navigation.navigate('Add')
  }

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.heading}>Relationships</Text>
        <View style={{ alignSelf: 'flex-start' }}>
          {relationship.length !== 0 ? (
            relationship.map((item) => (
              <RelationshipItem item={item} key={item.id} />
            ))
          ) : (
            <Text style={{ color: '#F17369' }}>
              There's no relationships. Start by adding one!
            </Text>
          )}
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={handlePress}>
            Add Relationship
          </Text>
        </Pressable>
      </View>

      <Navbar style={{ height: '10%' }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    width: '100%',
    aspectRatio: '10/3',
  },
  data: {
    height: '90%',
    paddingLeft: '2em',
    paddingRight: '2rem',
  },
  heading: {
    color: '#F17369',
    fontSize: '20px',
    paddingTop: '40px',
    paddingBottom: '40px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F17369',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '65px',
    textAlign: 'center',
    margin: 'auto',
  },
  hover: {
    backgroundColor: 'green',
  },
  text: {
    color: '#FFFFFF',
  },
})

export default RelationshipsHomeScreen
