import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import Shape from '../assets/shape.svg'
import Birthday from '../assets/birthday.svg'
import Arrow from '../assets/arrow-back.svg'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import WhiteStar from '../components/WhiteStar'
import BorderStar from '../components/BorderStar'
import Card from '../shared/Card'
import Recommendations from '../components/Recommendations'
import LoveLanguages from '../components/LoveLanguages'
import Restaurants from '../components/Restaurants'
import LifeEvents from '../components/LifeEvents'

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
        <Image
          source="https://as2.ftcdn.net/v2/jpg/02/15/12/55/1000_F_215125569_htz8VQaSVCbf4LNBgmbUFPunYOQDwCSU.jpg"
          style={styles.profileImg}
        />
        <View style={styles.personInfo}>
          <View>
            <Text style={styles.name}>
              {name} {lastName}
            </Text>
            <View style={styles.birthday}>
              <Image
                source={Birthday}
                style={{ width: '18px', height: '18px', marginRight: '7px' }}
              />
              <Text style={styles.birthdayDate}>{birthday}</Text>
            </View>
          </View>
          <View style={styles.rankingContainer}>
            <View style={styles.ranking}>
              <WhiteStar />
              <WhiteStar />
              <WhiteStar />
              <WhiteStar />
              <BorderStar />
            </View>
            <Text style={styles.relationshipText}>Relationship Strength</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* <Card>
          <Recommendations />
        </Card> */}
        <Card>
          <LoveLanguages name={name} />
        </Card>
        <Card>
          <Restaurants name={name} restaurant={restaurant} />
        </Card>
        <Card>
          <LifeEvents birthday={birthday} />
        </Card>
      </View>

      <View style={styles.navigation}>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.next}>Back</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('Relationship')}>
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('Send')}>
          <Text style={styles.next}>Next</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: '20px',
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    top: '-400px',
  },
  profileImg: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '20px'
  },
  ranking: {
    flex: 1,
    flexDirection: 'row',
  },
  birthday: {
    flex: 1,
    flexDirection: 'row',
  },
  birthdayDate: {
    color: '#FFFFFF',
    fontSize: '16px',
  },
  name: {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '600',
    paddingBottom: '10px',
  },
  relationshipText: {
    color: '#FFFFFF',
    fontSize: '12px',
    paddingTop: '10px',
    paddingLeft: '10px',
  },
  rankingContainer: {
    paddingTop: '20px',
  },
  pressable: {
    alignItems: 'center',
    cursor: 'pointer',
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  next: {
    color: '#EF6E62',
    fontSize: '16px',
    fontWeight: '400',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginLeft: '10px'
  },
  edit: {
    color: '#EF6E62',
    fontSize: '18px',
    fontWeight: '700',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginLeft: '10px'
  },
})

export default Relationship
