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
import Camera from '../assets/camera.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import uuid from 'react-native-uuid'

const AddRelationship = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const navigation = useNavigation()
  const { addRelationship } = useContext(RelationshipContext)

  const handlePress = async () => {
    if (name && lastName && birthday && restaurant) {
      const newRelationship = {
        id: uuid.v4(),
        name,
        lastName,
        birthday,
        restaurant,
      }

      await addRelationship(newRelationship)

      navigation.navigate('Relationship', {
        itemId: newRelationship.id,
      })

      setName('')
      setLastName('')
      setBirthday('')
      setRestaurant('')
    }
  }

  useEffect(() => {
    if (name && lastName && birthday && restaurant) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  })

  return (
    <View style={styles.container}>
      <Image source={Shape} style={styles.img} />
      <View style={styles.block}>
        <Text style={styles.h1}>Add Relationship</Text>
        <View style={styles.cameraContainer}>
          <Image source={Camera} style={styles.camera} />
        </View>
      </View>
      <SafeAreaView style={styles.form}>
        <View>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="rgba(237,82,68,0.5)"
            placeholder="Carol"
            value={name}
            onChangeText={(newName) => setName(newName)}
          />
        </View>
        <View>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="rgba(237,82,68,0.5)"
            placeholder="Burnett"
            value={lastName}
            onChangeText={(newLastName) => setLastName(newLastName)}
          />
        </View>
        <View>
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            placeholder="4 - 26 - 1933"
            keyboardType="numeric"
            placeholderTextColor="rgba(237,82,68,0.5)"
            value={birthday}
            onChangeText={(newBirthday) => setBirthday(newBirthday)}
          />
        </View>
        <View>
          <Text style={styles.label}>Favorite Restaurant</Text>
          <TextInput
            style={styles.input}
            placeholder="Search"
            keyboardType="numeric"
            placeholderTextColor="rgba(237,82,68,0.5)"
            value={restaurant}
            onChangeText={(newRestaurant) => setRestaurant(newRestaurant)}
          />
        </View>
        <Pressable
          style={[styles.button, isDisabled ? styles.disabled : '']}
          onPress={handlePress}
          disabled={isDisabled}
        >
          <Text style={styles.text}>Save</Text>
        </Pressable>
      </SafeAreaView>
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
  block: {
    textAlign: 'center',
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
    top: '-425px',
  },
  cameraContainer: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    position: 'relative',
    cursor: 'pointer',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(237, 99, 88, 0.4);',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 16,
    elevation: 7,
  },
  camera: {
    width: '15px',
    height: '15px',
    color: '#EF6E62',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '600',
    paddingBottom: '10px',
    zIndex: 2,
  },
  label: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: '16px',
    paddingLeft: '10px',
  },
  form: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: '40px',
  },
  input: {
    height: '40px',
    margin: '12px',
    borderWidth: '1px',
    padding: '10px',
    borderColor: '#ED5244',
    borderRadius: '5px',
    color: '#ED5244',
  },
  text: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '50px',
    paddingLeft: '50px',
    borderRadius: '65px',
    textAlign: 'center',
    margin: 'auto',
    marginTop: '20px',
    opacity: '1',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default AddRelationship
