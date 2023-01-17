import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native'
import React from 'react'
import Shape from '../assets/shape.svg'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Relationship = () => {
  const [relationship, setRelationships] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const getItem = async () => {
      try {
        const json = await AsyncStorage.getItem('relationship')
        setRelationships(JSON.parse(json))
      } catch (error) {
        console.log(error)
      }
    }

    getItem()
  }, [])

  const { name, lastName, birthday, restaurant } = relationship

  return (
    <View style={styles.container}>
      <Image source={Shape} style={styles.img} />
      <View style={styles.heading}>
        <View>
          <Text style={styles.name}>
            {name} {lastName}
          </Text>
          <Text style={styles.birthday}>{birthday}</Text>
          <Text style={styles.birthday}>{restaurant}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingTop: '120px',
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    top: '-635px',
  },
})

export default Relationship
