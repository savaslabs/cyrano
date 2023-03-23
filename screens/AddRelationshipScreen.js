import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native'
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
import { auth, db } from '../config/firebase-config'
import { setDoc, collection, doc } from 'firebase/firestore'

const AddRelationship = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [pageCounter, setPageCounter] = useState(1)
  const [isDisabled, setIsDisabled] = useState(true)
  const [loveStyleIsDisabled] = useState(true)
  const [nextIsDisabled] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [docID, setDocID] = useState('')

  // First form states
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [openRelationship, setOpenRelationship] = useState(false)
  const [relationshipValue, setRelationshipValue] = useState(null)
  const [relationshipItems, setRelationshipItems] = useState([
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Friend', value: 'Friend', disabled: true },
    { label: 'Family', value: 'Family', disabled: true },
    { label: 'Business', value: 'Business', disabled: true },
  ])
  const [openPronouns, setOpenPronouns] = useState(false)
  const [pronounsValue, setPronounsValue] = useState(null)
  const [pronounsItem, setPronounsItem] = useState([
    { label: 'She/her', value: 'She/her' },
    { label: 'He/him', value: 'He/him' },
    { label: 'They/them', value: 'They/them' },
  ])
  const [location, setLocation] = useState('')

  // Second form states
  const [birthday, setBirthday] = useState(new Date(Date.now()))
  const [anniversary, setAnniversary] = useState(new Date(Date.now()))
  const [relationshipRating, setRelationshipRating] = useState('')

  // Third form states
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Fourth form states
  const [dateRating, setDateRating] = useState('')
  const [lastTimeDate, setLastTimeDate] = useState(new Date(Date.now()))
  const [datePlace, setDatePlace] = useState('')

  const navigation = useNavigation()
  const { addRelationship } = useContext(RelationshipContext)
  // const relationshipRef = collection(db, 'relationships')

  useEffect(() => {
    setDocID(uuid.v4())
  }, [])

  const handleNext = () => {
    setPageCounter((count) => count + 1)
  }

  const handleBack = () => {
    setPageCounter((count) => count - 1)
  }

  const handlePress = async () => {
    if (name && lastName && birthday) {
      const newRelationship = {
        id: docID,
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

      setDoc(doc(db, 'relationships', docID), {
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
        author: {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
        },
      })
    }
  }

  useEffect(() => {
    if (
      name &&
      lastName &&
      birthday &&
      relationshipValue &&
      lastTimeDate &&
      datePlace &&
      dateRating
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [
    name,
    lastName,
    birthday,
    relationshipValue,
    lastTimeDate,
    datePlace,
    dateRating,
  ])

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
      <View style={styles.row}>
        <View style={styles.block}>
          <Text style={styles.h1}>Add Relationship</Text>
          {pageCounter === 1 && <Text>Tell us about your partner</Text>}
          {pageCounter === 2 && (
            <Text>
              More details about your relationship with{' '}
              <Text style={{ fontWeight: 'bold' }}>{name}</Text>
            </Text>
          )}
          {pageCounter === 3 && (
            <Text>
              Enter {name}'s contact information to send them the Truity Love
              Styles test.
            </Text>
          )}
          {pageCounter === 4 && (
            <Text>Tell us about your most recent date with {name}.</Text>
          )}
        </View>

        <Pressable onPress={pickImage}>
          <View
            style={
              profileImage ? styles.cameraWithoutBorder : styles.cameraContainer
            }
          >
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
            pronounsValue={pronounsValue}
            setPronounsValue={setPronounsValue}
            openPronouns={openPronouns}
            setOpenPronouns={setOpenPronouns}
            pronounsItem={pronounsItem}
            setPronounsItem={setPronounsItem}
            location={location}
            setLocation={setLocation}
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
      </View>

      {pageCounter === 1 && (
        <>
          <View style={styles.row}>
            <View style={[styles.dot, styles.active]}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </View>
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.text}>CONTINUE</Text>
          </Pressable>
        </>
      )}

      {pageCounter === 2 && (
        <>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <View style={[styles.dot, styles.active]}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
          </View>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleBack}>
              <Text style={styles.text}>BACK</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleNext}>
              <Text style={styles.text}>CONTINUE</Text>
            </Pressable>
          </View>
        </>
      )}

      {pageCounter === 3 && !email && !phone && (
        <>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={[styles.dot, styles.active]}></View>
            <View style={styles.dot}></View>
          </View>
          <Pressable
            style={[styles.button, loveStyleIsDisabled ? styles.disabled : '']}
            onPress={sendLoveTest}
            disabled={loveStyleIsDisabled}
          >
            <Text style={styles.text}>SEND LOVE STYLES TEST</Text>
          </Pressable>
          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleBack}>
              <Text style={styles.text}>BACK</Text>
            </Pressable>
            <Pressable
              style={[styles.button, nextIsDisabled ? styles.disabled : '']}
              onPress={handleNext}
              disabled={nextIsDisabled}
            >
              <Text style={styles.text}>CONTINUE</Text>
            </Pressable>
          </View>
        </>
      )}

      {(pageCounter === 3 && email && !phone) ||
        (pageCounter === 3 && !email && phone && (
          <>
            <View style={styles.row}>
              <View style={styles.dot}></View>
              <View style={styles.dot}></View>
              <View style={[styles.dot, styles.active]}></View>
              <View style={styles.dot}></View>
            </View>
            <Pressable
              style={[
                styles.button,
                loveStyleIsDisabled ? styles.disabled : '',
              ]}
              onPress={sendLoveTest}
              disabled={loveStyleIsDisabled}
            >
              <Text style={styles.text}>SEND LOVE STYLES TEST</Text>
            </Pressable>

            <View style={styles.row}>
              <Pressable style={styles.button} onPress={handleBack}>
                <Text style={styles.text}>BACK</Text>
              </Pressable>
              <Pressable
                style={[styles.button, nextIsDisabled ? styles.disabled : '']}
                onPress={handleNext}
                disabled={nextIsDisabled}
              >
                <Text style={styles.text}>CONTINUE</Text>
              </Pressable>
            </View>
          </>
        ))}

      {pageCounter === 3 && email && phone && (
        <>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={[styles.dot, styles.active]}></View>
            <View style={styles.dot}></View>
          </View>
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
              <Text style={styles.text}>SEND LOVE STYLES TEST</Text>
            </Pressable>
          )}

          <View style={styles.row}>
            <Pressable style={styles.button} onPress={handleBack}>
              <Text style={styles.text}>BACK</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={handleNext}
              disabled={!nextIsDisabled}
            >
              <Text style={styles.text}>CONTINUE</Text>
            </Pressable>
          </View>
        </>
      )}

      {pageCounter === 4 && (
        <>
          <View style={styles.row}>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={styles.dot}></View>
            <View style={[styles.dot, styles.active]}></View>
          </View>
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
        </>
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
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    top: 100,
    zIndex: '0',
    width: '100%',
    height: '100%',
  },
  cameraContainer: {
    width: 68,
    height: 68,
    borderWidth: 1,
    position: 'relative',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  cameraWithoutBorder: {
    borderWidth: 'none',
  },
  camera: {
    width: 15,
    height: 15,
    color: '#000000',
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
    color: '#000000',
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
    backgroundColor: '#586187',
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
  dot: {
    borderWidth: 1,
    borderColor: '#586187',
    borderRadius: '100%',
    width: 10,
    height: 10,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#586187',
  },
})

export default AddRelationship
