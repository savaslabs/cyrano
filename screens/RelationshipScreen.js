import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import Shape from '../assets/shape.svg'
import Birthday from '../assets/birthday.svg'
import Arrow from '../assets/arrow-back.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import WhiteStar from '../components/WhiteStar'
import BorderStar from '../components/BorderStar'
import Card from '../shared/Card'
import Recommendations from '../components/Recommendations'
import LoveLanguages from '../components/LoveLanguages'
import Restaurants from '../components/Restaurants'
import LifeEvents from '../components/LifeEvents'
import RelationshipContext from '../context/RelationshipContext'
import Gifts from '../components/Gifts'
import RelationshipRating from '../components/RelationshipRating'

const Relationship = () => {
  const [singleRelationship, setSingleRelationship] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship } = useContext(RelationshipContext)
  const { itemId } = route.params

  useEffect(() => {
    const getRelationship = relationship.find((item) => item.id === itemId)

    if (getRelationship) {
      setSingleRelationship(getRelationship)
    }
  }, [])

  const {
    name,
    lastName,
    birthday,
    anniversary,
    value,
    profileImage,
    relRatingValue
  } = singleRelationship

  return (
    <View style={styles.container}>
      <Image source={Shape} style={styles.img} />
      <View style={styles.heading}>
        {profileImage ? (
          <Image source={profileImage} style={styles.profileImg} />
        ) : (
          <Image
            source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
            style={styles.profileImg}
          />
        )}

        <View style={styles.personInfo}>
          <View>
            <Text style={styles.name}>
              {name} {lastName}
            </Text>
            <View style={styles.birthday}>
              <Image
                source={Birthday}
                style={{ width: 18, height: 18, marginRight: 7 }}
              />
              <Text style={styles.birthdayDate}>{birthday}</Text>
            </View>
          </View>
          <View style={styles.rankingContainer}>
             <RelationshipRating relRatingValue={relRatingValue} />
            <Text style={styles.relationshipText}>Relationship Strength</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {/* <Card>
          <Recommendations />
        </Card> */}
        <Card>
          <LoveLanguages name={name} value={value} />
        </Card>
        <Card>
          <LifeEvents birthday={birthday} anniversary={anniversary}/>
        </Card>
        <Card>
          <Text>DATE LOG</Text>
        </Card>
      </View>

      {/* <View style={styles.navigation}>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Relationships')}
        >
          <Text style={styles.next}>Back</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          // onPress={() => navigation.navigate('Add')}
        >
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate('Send')}
        >
          <Text style={styles.next}>Next</Text>
        </Pressable>
      </View> */}



      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.text}>Schedule Your Next Date</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    aspectRatio: '10/3',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    top: -335,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    marginRight: 20,
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  birthday: {
    flex: 1,
    flexDirection: 'row',
  },
  birthdayDate: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
  },
  relationshipText: {
    color: '#FFFFFF',
    fontSize: 12,
    paddingTop: 10,
    paddingLeft: 10,
  },
  rankingContainer: {
    paddingTop: 20,
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
    alignContent: 'center',
  },
  next: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '400',
  },
  edit: {
    color: '#EF6E62',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 65,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
    opacity: '1',
  },
})

export default Relationship
