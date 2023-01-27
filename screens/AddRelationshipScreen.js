import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native'
import React from 'react'
import ShapeSVG from '../assets/shape.svg'
import Shape from '../svg/Shape'
import CameraSVG from '../assets/camera.svg'
import Camera from '../svg/Camera'
import { useState, useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import RelationshipContext from '../context/RelationshipContext'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import First from '../components/form/First'
import Second from '../components/form/Second'
import Third from '../components/form/Third'
import Fourth from '../components/form/Fourth'

const AddRelationship = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [anniversary, setAnniversary] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [openRelationship, setOpenRelationship] = useState(false)
  const [relationshipValue, setRelationshipValue] = useState(null)
  const [relationshipItems, setRelationshipItems] = useState([
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Friend', value: 'Friend', disabled: true },
    { label: 'Family', value: 'Family', disabled: true },
    { label: 'Business', value: 'Business', disabled: true },
  ])
  const [relationshipRating, setRelationshipRating] = useState('')
  const [dateRating, setDateRating] = useState('')
  const [lastTimeDate, setLastTimeDate] = useState('')
  const [datePlace, setDatePlace] = useState('')
  const [pageCounter, setPageCounter] = useState(1)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loveStyleIsDisabled] = useState(true)
  const [nextIsDisabled] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const navigation = useNavigation()
  const { addRelationship } = useContext(RelationshipContext)

  const handleNext = () => {
    setPageCounter((count) => count + 1)
  }

  const handleBack = () => {
    setPageCounter((count) => count - 1)
  }

  const handlePress = async () => {
    if (name && lastName && birthday) {
      const newRelationship = {
        id: uuid.v4(),
        profileImage,
        name,
        lastName,
        birthday,
        anniversary,
        phone,
        email,
        relationshipValue,
        relationshipRating,
        dateRating,
        lastTimeDate,
        datePlace,
      }

      await addRelationship(newRelationship)

      navigation.navigate('Relationship', {
        itemId: newRelationship.id,
      })
      setProfileImage('')
      setName('')
      setLastName('')
      setBirthday('')
      setAnniversary('')
      setPhone('')
      setEmail('')
      setRelationshipValue('')
      setRelationshipRating('')
      setDateRating('')
      setLastTimeDate('')
      setDatePlace('')
    }
  }

  useEffect(() => {
    if (
      name &&
      lastName &&
      birthday &&
      relationshipValue &&
      lastTimeDate &&
      datePlace
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

  const sendLoveTest = () => {
    setShowMessage(true)
  }

  return (
    <View style={styles.container}>
      <Image source={ShapeSVG} style={styles.img} />
      {/* <Shape/> */}
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
              <Image source={CameraSVG} style={styles.camera} />
            )}
          </View>
        </Pressable>
      </View>
      <View style={styles.form}>
        {pageCounter === 1 && (
          <First
            name={name}
            setName={setName}
            lastName={lastName}
            setLastName={setLastName}
            openRelationship={openRelationship}
            setOpenRelationship={setOpenRelationship}
            relationshipItems={relationshipItems}
            setRelationshipItems={setRelationshipItems}
            relationshipValue={relationshipValue}
            setRelationshipValue={setRelationshipValue}
          />
        )}
        {pageCounter === 2 && (
          <Second
            birthday={birthday}
            setBirthday={setBirthday}
            anniversary={anniversary}
            setAnniversary={setAnniversary}
            relationshipValue={relationshipValue}
            relationshipRating={relationshipRating}
            setRelationshipRating={setRelationshipRating}
          />
        )}
        {pageCounter === 3 && (
          <Third
            name={name}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        )}
        {pageCounter === 4 && (
          <Fourth
            lastTimeDate={lastTimeDate}
            setLastTimeDate={setLastTimeDate}
            datePlace={datePlace}
            setDatePlace={setDatePlace}
            dateRating={dateRating}
            setDateRating={setDateRating}
            name={name}
          />
        )}

        {/* {showRestaurants && (
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
        )} */}
      </View>

      {pageCounter === 1 && relationshipValue && (
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.text}>Next</Text>
        </Pressable>
      )}

      {pageCounter === 3 && !email && !phone && (
        <>
          <Pressable
            style={[styles.button, loveStyleIsDisabled ? styles.disabled : '']}
            onPress={sendLoveTest}
            disabled={loveStyleIsDisabled}
          >
            <Text style={styles.text}>Send Love Styles Test</Text>
          </Pressable>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleBack}>
              <Text style={styles.text}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, nextIsDisabled ? styles.disabled : '']}
              onPress={handleNext}
              disabled={nextIsDisabled}
            >
              <Text style={styles.text}>Next</Text>
            </Pressable>
          </View>
        </>
      )}

      {(pageCounter === 3 && email && !phone) ||
        (pageCounter === 3 && !email && phone && (
          <>
            <Pressable
              style={[
                styles.button,
                loveStyleIsDisabled ? styles.disabled : '',
              ]}
              onPress={sendLoveTest}
              disabled={loveStyleIsDisabled}
            >
              <Text style={styles.text}>Send Love Styles Test</Text>
            </Pressable>

            <View style={styles.row}>
              <Pressable style={styles.button} onPress={handleBack}>
                <Text style={styles.text}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.button, nextIsDisabled ? styles.disabled : '']}
                onPress={handleNext}
                disabled={nextIsDisabled}
              >
                <Text style={styles.text}>Next</Text>
              </Pressable>
            </View>
          </>
        ))}

      {pageCounter === 3 && email && phone && (
        <>
          {showMessage ? (
            <View>
              <Text style={styles.restaurantItem}>
                The test has been sent to {name}. We'll alert you once we have
                uploaded their results
              </Text>
            </View>
          ) : (
            <Pressable
              style={styles.button}
              onPress={sendLoveTest}
              disabled={!loveStyleIsDisabled}
            >
              <Text style={styles.text}>Send Love Styles Test</Text>
            </Pressable>
          )}

          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleBack}>
              <Text style={styles.text}>Back</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleNext}
              disabled={!nextIsDisabled}
            >
              <Text style={styles.text}>Next</Text>
            </Pressable>
          </View>
        </>
      )}

      {pageCounter !== 4 && pageCounter !== 1 && pageCounter !== 3 && (
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleBack}>
            <Text style={styles.text}>Back</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.text}>Next</Text>
          </Pressable>
        </View>
      )}

      {pageCounter === 4 && (
        <View style={styles.row}>
          <Pressable style={styles.button} onPress={handleBack}>
            <Text style={styles.text}>Back</Text>
          </Pressable>
          <Pressable
            style={[styles.button, isDisabled ? styles.disabled : '']}
            onPress={handlePress}
            disabled={isDisabled}
          >
            <Text style={styles.text}>Save</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  block: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
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
    top: -500,
  },
  cameraContainer: {
    width: 68,
    height: 68,
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
    width: 15,
    height: 15,
    color: '#EF6E62',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  profileImage: {
    width: 68,
    height: 68,
    borderRadius: '50%',
  },
  h1: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
    zIndex: 2,
    alignSelf: 'center',
  },
  label: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  form: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 65,
    textAlign: 'center',
    // margin: 'auto',
    marginTop: 20,
    opacity: '1',
    marginRight: 10,
    zIndex: 0,
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
    fontSize: 24,
    color: '#EF6E62',
    fontWeight: '700',
    cursor: 'pointer',
  },
  delete: {
    fontSize: 24,
    color: '#EF6E62',
    fontWeight: '700',
    cursor: 'pointer',
    marginLeft: 15,
  },
  restaurantItem: {
    color: '#EF6E62',
    fontSize: 14,
    textAlign: 'center',
    width: 300,
  },
  deleteRestaurant: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginBottom: 5,
  },
  hideButton: {
    display: 'none',
  },
  showButton: {
    display: 'block',
  },
})

export default AddRelationship
