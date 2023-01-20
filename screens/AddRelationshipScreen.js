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
import DropDownPicker from 'react-native-dropdown-picker'
import * as ImagePicker from 'expo-image-picker'

const AddRelationship = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [restaurantArray, setRestaurantArray] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)
  const [profileImage, setProfileImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'Receiving Gifts', value: 'Receiving Gifts' },
    { label: 'Quality Time', value: 'Quality Time' },
  ])
  const [openGifts, setOpenGifts] = useState(false)
  const [valueGifts, setValueGifts] = useState(null)
  const [gifts, setGifts] = useState([
    { label: 'Chocolates', value: 'Chocolates' },
    { label: 'Flowers', value: 'Flowers' },
    { label: 'Cinema Tickets', value: 'Cinema Tickets' },
  ])
  const [showRestaurants, setShowRestaurants] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const navigation = useNavigation()
  const { addRelationship } = useContext(RelationshipContext)

  const handlePress = async () => {
    if (
      (name && lastName && birthday && value && restaurantArray) ||
      (name && lastName && birthday && value && valueGifts)
    ) {
      const newRelationship = {
        id: uuid.v4(),
        name,
        lastName,
        birthday,
        restaurantArray,
        value,
        valueGifts,
        profileImage,
      }

      await addRelationship(newRelationship)

      navigation.navigate('Relationship', {
        itemId: newRelationship.id,
      })

      setName('')
      setLastName('')
      setBirthday('')
      setRestaurant('')
      setRestaurantArray([])
      setValue('')
      setProfileImage('')
      setValueGifts('')
    }
  }

  useEffect(() => {
    if (
      (name && lastName && birthday && restaurantArray && value) ||
      (name && lastName && birthday && valueGifts && value)
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  })

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const handleAddRestaurant = () => {
    const newRestaurantArr = {
      id: uuid.v4(),
      restaurant,
    }
    setRestaurantArray((prevState) => [...prevState, newRestaurantArr])

    setRestaurant('')
  }

  const handleDeleteRestaurant = (id) => {
    setRestaurantArray(restaurantArray.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (value === 'Receiving Gifts') {
      setShowGifts(true)
    } else {
      setShowGifts(false)
    }

    if (value === 'Quality Time') {
      setShowRestaurants(true)
    } else {
      setShowRestaurants(false)
    }
  }, [value])

  return (
    <View style={styles.container}>
      <Image source={Shape} style={styles.img} />
      <View style={styles.block}>
        <Text style={styles.h1}>Add Relationship</Text>
        <Pressable onPress={pickImage}>
          <View style={styles.cameraContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Image source={Camera} style={styles.camera} />
            )}
          </View>
        </Pressable>
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
        <>
          <Text style={styles.label}>Love Languages</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={styles.dropdown}
            placeholder="Select a love language"
            placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
            dropDownContainerStyle={{
              top: '52px',
              left: '12px',
              margin: 'auto',
              color: '#EF6E62',
              borderColor: '#ED5244',
              zIndex: '10000',
              width: '94%',
            }}
            labelStyle={{
              color: '#ED5244',
            }}
            listItemLabelStyle={{
              color: '#ED5244',
            }}
          />
        </>
        {showRestaurants && (
          <View>
            <Text style={styles.label}>Favorite Restaurant</Text>
            <View style={styles.addRestaurant}>
              <TextInput
                style={[styles.input, styles.restaurant]}
                placeholder="Search"
                keyboardType="numeric"
                placeholderTextColor="rgba(237,82,68,0.5)"
                value={restaurant}
                onChangeText={(newRestaurant) => setRestaurant(newRestaurant)}
              />
              <Pressable onPress={handleAddRestaurant}>
                <Text style={styles.add}>+</Text>
              </Pressable>
            </View>
            <View>
              {restaurantArray.map((item) => (
                <View key={item.id} style={styles.deleteRestaurant}>
                  <Text style={styles.restaurantItem}>{item.restaurant}</Text>
                  <Pressable onPress={() => handleDeleteRestaurant(item.id)}>
                    <Text style={styles.delete}>x</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}
        {showGifts && (
          <>
            <Text style={styles.label}>Gift's Ideas</Text>
            <DropDownPicker
              open={openGifts}
              value={valueGifts}
              items={gifts}
              setOpen={setOpenGifts}
              setValue={setValueGifts}
              setItems={setGifts}
              style={styles.dropdown}
              placeholder="Select a Gift"
              placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
              dropDownContainerStyle={{
                top: '52px',
                left: '12px',
                margin: 'auto',
                color: '#EF6E62',
                borderColor: '#ED5244',
                zIndex: '9000',
                width: '94%',
              }}
              labelStyle={{
                color: '#ED5244',
              }}
              listItemLabelStyle={{
                color: '#ED5244',
              }}
            />
          </>
        )}

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
    width: '100%',
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
    top: '-635px',
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
  profileImage: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
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
  dropdown: {
    height: '40px',
    margin: '12px',
    borderWidth: '1px',
    padding: '10px',
    borderColor: '#ED5244',
    borderRadius: '5px',
    color: '#ED5244',
    minHeight: 'initial',
    width: 'initial',
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
  addRestaurant: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurant: {
    width: '87%',
  },
  add: {
    fontSize: '24px',
    color: '#EF6E62',
    fontWeight: '700',
    cursor: 'pointer',
  },
  delete: {
    fontSize: '24px',
    color: '#EF6E62',
    fontWeight: '700',
    cursor: 'pointer',
    marginLeft: '15px',
  },
  restaurantItem: {
    color: '#EF6E62',
    fontSize: '14px',
  },
  deleteRestaurant: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '15px',
    marginBottom: '5px',
  },
})

export default AddRelationship
