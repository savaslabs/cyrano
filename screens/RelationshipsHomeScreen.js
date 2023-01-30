import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import RelationshipItem from '../components/RelationshipItem'
// import Navbar from '../components/Navbar'
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
      <View style={{paddingLeft: 20}}>
        <Text style={styles.heading}>Relationships</Text>
        {relationship.length !== 0 ? (
          relationship.map((item) => (
            <RelationshipItem item={item} key={item.id} />
          ))
        ) : (
          <Text style={{ color: '#F17369' }}>
            There are no relationships yet. Start by adding one!
          </Text>
        )}
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.text} onPress={handlePress}>
          Add Relationship
        </Text>
      </Pressable>

      {/* <Navbar style={{ height: '10%' }} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,
    width: '100%',
    maxWidth:700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  data: {
    height: '90%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  heading: {
    color: '#F17369',
    fontSize: 20,
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F17369',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 65,
    width: '50%',
    alignSelf: 'center'
  },
  hover: {
    backgroundColor: 'green',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
})

export default RelationshipsHomeScreen
