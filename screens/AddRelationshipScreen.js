import { View, Text, Image, Pressable } from 'react-native'
import CameraSVG from '../assets/camera.svg'
import PaperPlane from '../assets/paper-plane.svg'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import * as ImagePicker from 'expo-image-picker'
import First from '../components/form/First'
import Second from '../components/form/Second'
import Third from '../components/form/Third'
import Fourth from '../components/form/Fourth'
import emailjs from '@emailjs/browser'
import { auth, db } from '../config/firebase-config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { styles } from '../styles'
import Page from '../shared/Page'
import Toast from 'react-native-toast-message'
import Spinner from '../shared/Spinner'

const AddRelationship = () => {
  const [profileImage, setProfileImage] = useState(null)
  const [pageCounter, setPageCounter] = useState(1)
  const [isDisabled, setIsDisabled] = useState(true)
  const [skip, setSkip] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [docID, setDocID] = useState('')
  const [prevID, setPrevID] = useState('')

  // First form states
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [openRelationship, setOpenRelationship] = useState(false)
  const [relationshipValue, setRelationshipValue] = useState(null)
  const [relationshipItems, setRelationshipItems] = useState([
    { label: 'Romantic', value: 'Romantic' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Family', value: 'Family' },
    { label: 'Business', value: 'Business' },
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
  const [birthday, setBirthday] = useState('')
  const [anniversary, setAnniversary] = useState('')
  const [relationshipRating, setRelationshipRating] = useState('')

  // Third form states
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Fourth form states
  const [dateRating, setDateRating] = useState('')
  const [dateDate, setLastTimeDate] = useState('')
  const [eventName, setEventName] = useState('')
  const [datePlace, setDatePlace] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    setDocID(uuid.v4())
    setPrevID(uuid.v4())
  }, [])

  const handleNext = () => {
    setPageCounter((count) => count + 1)
  }

  const handleBack = () => {
    setPageCounter((count) => count - 1)
  }

  const handlePress = async () => {
    if (name && lastName) {
      setLoading(true)
      if (
        (relationshipValue === 'Romantic' && dateDate) ||
        datePlace ||
        eventName ||
        dateRating
      ) {
        setDoc(doc(db, 'events', prevID), {
          id: prevID,
          name: name,
          lastName: lastName,
          fullName: `${name} ${lastName}`,
          img: profileImage,
          loveStyleTag: [],
          datePlace,
          eventName,
          dateDate,
          dateRating,
          relID: docID,
          createdAt: serverTimestamp(),
          author: {
            id: auth.currentUser.uid,
            email: auth.currentUser.email,
          },
          state: 'past',
        })
      }

      setDoc(doc(db, 'relationships', docID), {
        profileImage,
        name,
        lastName,
        fullName: `${name} ${lastName}`,
        relationshipValue,
        pronounsValue,
        location,
        birthday,
        anniversary,
        relationshipRating,
        email,
        phone,
        dateRating,
        dateDate,
        datePlace,
        eventName,
        createdAt: serverTimestamp(),
        author: {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
        },
      })
        .then(() =>
          navigation.navigate('Relationship', {
            itemId: docID,
          })
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Relationship created! 🤝',
            visibilityTime: 2000,
          })
        })
        .then(() => {
          setProfileImage('')
          setName('')
          setLastName('')
          setRelationshipValue('')
          setPronounsValue('')
          setLocation('')
          setBirthday('')
          setAnniversary('')
          setRelationshipRating('')
          setEmail('')
          setPhone('')
          setDateRating('')
          setLastTimeDate('')
          setDatePlace('')
        })
        .then(() => setLoading(false))
        .catch((err) =>
          Toast.show({
            type: 'error',
            text1: err.code,
            visibilityTime: 2000,
          })
        )
    }
  }

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
    emailjs
      .send(
        'service_mluy78d',
        'template_dlzx6tm',
        {
          from_email: email,
        },
        '7RtlMLsc_bIlK-F46'
      )
      .then(() => {
        setShowMessage(true)
        setSkip(true)
      })
      .catch((err) =>
        Toast.show({
          type: 'error',
          text1: err.code,
          visibilityTime: 2000,
        })
      )
  }

  useEffect(() => {
    if (name && lastName && relationshipValue) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [name, lastName, relationshipValue, pronounsValue, location])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={[styles.page__upper, styles.relationshipHeading]}>
              <View style={styles.relationshipHeading__text}>
                <Text style={[styles.h2, styles.alignLeft]}>
                  Add Relationship
                </Text>
                {pageCounter === 1 && (
                  <Text style={[styles.p, styles.alignLeft]}>
                    Tell us about who you'd like to work on your relationship
                    with.
                  </Text>
                )}
                {pageCounter === 2 && (
                  <Text style={[styles.p, styles.alignLeft]}>
                    More details about your relationship with{' '}
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>.
                  </Text>
                )}
                {pageCounter === 3 && (
                  <Text style={[styles.p, styles.alignLeft]}>
                    Enter <Text style={{ fontWeight: 'bold' }}>{name}</Text>'s
                    contact information to send them the Truity Love Styles
                    test.
                  </Text>
                )}
                {pageCounter === 4 && (
                  <Text style={[styles.p, styles.alignLeft]}>
                    Tell us about your most recent date with {name}.
                  </Text>
                )}
              </View>
              {/* <Pressable onPress={pickImage}>
                <View
                  style={
                    profileImage ? styles.cameraRemoveBorder : styles.camera
                  }
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Image source={CameraSVG} style={styles.camera__img} />
                  )}
                </View>
              </Pressable> */}
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
                  dateDate={dateDate}
                  setLastTimeDate={setLastTimeDate}
                  datePlace={datePlace}
                  setDatePlace={setDatePlace}
                  dateRating={dateRating}
                  setDateRating={setDateRating}
                  name={name}
                  birthday={birthday}
                  anniversary={anniversary}
                  eventName={eventName}
                  setEventName={setEventName}
                />
              )}
            </View>
            {pageCounter === 1 && (
              <>
                {relationshipValue ? (
                  <View style={styles.dots}>
                    <View
                      style={[styles.dots__dot, styles.dots__active]}
                    ></View>
                    <View style={styles.dots__dot}></View>
                    {relationshipValue && relationshipValue === 'Romantic' ? (
                      <>
                        <View style={styles.dots__dot}></View>
                        <View style={styles.dots__dot}></View>
                      </>
                    ) : (
                      ''
                    )}
                  </View>
                ) : (
                  ''
                )}

                <View style={styles.page__lower}>
                  <Pressable
                    style={[styles.button, isDisabled ? styles.disabled : '']}
                    onPress={handleNext}
                    disabled={isDisabled}
                  >
                    <Text
                      style={[
                        styles.button__text,
                        isDisabled ? styles.disabled__text : '',
                      ]}
                    >
                      CONTINUE
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
            {pageCounter === 2 && (
              <>
                <View style={styles.dots}>
                  <View style={styles.dots__dot}></View>
                  <View style={[styles.dots__dot, styles.dots__active]}></View>
                  {relationshipValue === 'Romantic' ? (
                    <>
                      <View style={styles.dots__dot}></View>
                      <View style={styles.dots__dot}></View>
                    </>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.page__lower}>
                  <View style={styles.paginationBtns}>
                    <Pressable
                      onPress={handleBack}
                      style={[styles.button, styles.buttonGrey]}
                    >
                      <Text
                        style={[styles.button__text, styles.buttonGrey__text]}
                      >
                        BACK
                      </Text>
                    </Pressable>
                    {relationshipValue === 'Romantic' ? (
                      <Pressable
                        style={[styles.button, styles.buttonNext]}
                        onPress={handleNext}
                      >
                        <Text style={[styles.button__text]}>
                          {birthday || anniversary || relationshipRating
                            ? 'CONTINUE'
                            : 'SKIP'}
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={[styles.button, styles.buttonNext]}
                        onPress={handlePress}
                      >
                        <Text style={[styles.button__text]}>SAVE</Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </>
            )}
            {pageCounter === 3 && (
              <>
                {showMessage ? (
                  <View style={styles.confirmation}>
                    <Image
                      source={{ uri: PaperPlane }}
                      style={styles.confirmation__icon}
                    />
                    <Text
                      style={[
                        styles.p,
                        styles.alignLeft,
                        styles.confirmation__text,
                      ]}
                    >
                      The test has been sent to {name}. We'll alert you once we
                      have uploaded their results
                    </Text>
                  </View>
                ) : (
                  <Pressable
                    style={[styles.button, !email ? styles.disabled : '']}
                    onPress={sendLoveTest}
                    disabled={email ? false : true}
                  >
                    <Text
                      style={[
                        styles.button__text,
                        !email ? styles.disabled__text : '',
                      ]}
                    >
                      SEND LOVE STYLES TEST
                    </Text>
                  </Pressable>
                )}

                <View style={styles.dots}>
                  <View style={styles.dots__dot}></View>
                  <View style={styles.dots__dot}></View>
                  <View style={[styles.dots__dot, styles.dots__active]}></View>
                  <View style={styles.dots__dot}></View>
                </View>
                <View style={styles.page__lower}>
                  <View style={styles.paginationBtns}>
                    <Pressable
                      onPress={handleBack}
                      style={[styles.button, styles.buttonGrey]}
                    >
                      <Text
                        style={[styles.button__text, styles.buttonGrey__text]}
                      >
                        BACK
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonNext]}
                      onPress={handleNext}
                    >
                      <Text style={[styles.button__text]}>
                        {skip ? 'CONTINUE' : 'SKIP'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            {pageCounter === 4 && (
              <>
                <View style={styles.dots}>
                  <View style={styles.dots__dot}></View>
                  <View style={styles.dots__dot}></View>
                  <View style={styles.dots__dot}></View>
                  <View style={[styles.dots__dot, styles.dots__active]}></View>
                </View>
                <View style={styles.page__lower}>
                  <View style={styles.paginationBtns}>
                    <Pressable
                      onPress={handleBack}
                      style={[styles.button, styles.buttonGrey]}
                    >
                      <Text
                        style={[styles.button__text, styles.buttonGrey__text]}
                      >
                        BACK
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonNext]}
                      onPress={handlePress}
                    >
                      <Text style={[styles.button__text]}>SAVE</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </View>
        </Page>
      )}
    </>
  )
}

export default AddRelationship
