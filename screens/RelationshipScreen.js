import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import ShapeSVG from '../assets/shape.svg'
import Birthday from '../assets/birthday.svg'
import Arrow from '../assets/arrow-back.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import LoveLanguages from '../components/LoveLanguages'
import LifeEvents from '../components/LifeEvents'
import RelationshipContext from '../context/RelationshipContext'
import RelationshipRating from '../components/RelationshipRating'
import Shape from '../svg/Shape'

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

  const { id, name, lastName, birthday, profileImage, relRatingValue } =
    singleRelationship

  return (
    <View style={styles.container}>
      {/* <Shape /> */}
      <Image source={ShapeSVG} style={styles.img} />
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
        <Pressable
          onPress={() =>
            navigation.navigate('LoveStyle', {
              itemId: id,
            })
          }
        >
          <Card>
            <Text style={styles.title}>{name}'s Love Styles</Text>
          </Card>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('LifeEvents', {
              itemId: id,
            })
          }
        >
          <Card>
            <Text style={styles.title}>{name}'s Life Events</Text>
          </Card>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('DateLog', {
              itemId: id,
            })
          }
        >
          <Card>
            <Text style={styles.title}>DATE LOG</Text>
          </Card>
        </Pressable>
      </View>

      <Text style={styles.message}>
        It's been over two weeks since your last date with {name}, it's time to
        schedule another one.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Book', {
            itemId: id,
          })
        }
      >
        <Text style={styles.text}>Schedule Your Next Date</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
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
    flex: 0,
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
  message: {
    color: '#EF6E62',
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'center',
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
  title: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '700',
  },
})

export default Relationship
