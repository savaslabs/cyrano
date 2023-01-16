import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RelationshipsData from '../relationships.json'
import RelationshipItem from '../components/RelationshipItem'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'

const RelationshipsHomeScreen = () => {
  const [user, setUser] = useState('')
  const [relationships, setRelationships] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const getItem = async () => {
      try {
        const json = await AsyncStorage.getItem('userData')
        setUser(JSON.parse(json))
      } catch (error) {
        console.log(error)
      }
    }

    getItem()
  }, [])

  useEffect(() => {
    setRelationships(RelationshipsData)
  }, [relationships])

  const { name, lastName, phone } = user

  const handlePress = () => {
    navigation.navigate('Add')
  }

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.heading}>Relationships</Text>
        <View style={{ alignSelf: 'flex-start' }}>
          {relationships
            ? relationships.map((item) => (
                <RelationshipItem item={item} key={item.id} />
              ))
            : <Text style={{color: '#F17369'}}>There's no relationships. Start by adding one!</Text>}
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.text} onPress={handlePress}>Add Relationship</Text>
        </Pressable>
      </View>

      <Navbar style={{ height: '10%' }} name={name} lastName={lastName} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
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
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#F17369',
    padding: '10px',
    borderRadius: '65px',
    textAlign: 'center',
    margin: 'auto',
  },
  text: {
    color: '#FFFFFF',
  },
})

export default RelationshipsHomeScreen
