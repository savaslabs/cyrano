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
import { auth, db } from '../config/firebase-config'
import { setDoc, doc, serverTimestamp, arrayUnion } from 'firebase/firestore'
import { styles } from '../styles'
import Page from '../shared/Page'

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

      setDoc(doc(db, 'relationships', docID), {
        profileImage,
        name,
        lastName,
        relationshipValue,
        pronounsValue,
        location,
        birthday,
        anniversary,
        relationshipRating,
        email,
        phone,
        dateRating,
        lastTimeDate,
        datePlace,
        otherDetails: [],
        createdAt: serverTimestamp(),
        author: {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
        },
        nextEvents: [],
        prevEvents: arrayUnion({
          name: name,
          lastName: lastName,
          fullName: `${name} ${lastName}`,
          img: profileImage,
          loveStyleTag: [],
          datePlace,
          dateRating,
        }),
        totalEvents: arrayUnion({
          name: name,
          lastName: lastName,
          fullName: `${name} ${lastName}`,
          img: profileImage,
          loveStyleTag: [],
          datePlace,
          dateRating,
        }),
      })

      navigation.navigate('Relationship', {
        itemId: docID,
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
    <Page>
      <View style={[styles.page__content, styles.pageTopPadding]}>
        <View style={[styles.page__upper, styles.relationshipHeading]}>
          <View style={styles.relationshipHeading__text}>
            <Text style={[styles.h2, styles.alignLeft]}>Add Relationship</Text>
            {pageCounter === 1 && (
              <Text style={[styles.p, styles.alignLeft]}>
                Tell us about your partner.
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
                contact information to send them the Truity Love Styles test.
              </Text>
            )}
            {pageCounter === 4 && (
              <Text style={[styles.p, styles.alignLeft]}>
                Tell us about your most recent date with {name}.
              </Text>
            )}
          </View>
          <Pressable onPress={pickImage}>
            <View
              style={profileImage ? styles.cameraRemoveBorder : styles.camera}
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
              birthday={birthday}
              anniversary={anniversary}
            />
          )}
        </View>
        {pageCounter === 1 && (
          <>
            <View style={styles.dots}>
              <View style={[styles.dots__dot, styles.dots__active]}></View>
              <View style={styles.dots__dot}></View>
              <View style={styles.dots__dot}></View>
              <View style={styles.dots__dot}></View>
            </View>
            <View style={styles.page__lower}>
              <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.button__text}>CONTINUE</Text>
              </Pressable>
            </View>
          </>
        )}
        {pageCounter === 2 && (
          <>
            <View style={styles.dots}>
              <View style={styles.dots__dot}></View>
              <View style={[styles.dots__dot, styles.dots__active]}></View>
              <View style={styles.dots__dot}></View>
              <View style={styles.dots__dot}></View>
            </View>
            <View style={styles.page__lower}>
              <View style={styles.paginationBtns}>
                <Pressable onPress={handleBack} style={[styles.button, styles.buttonGrey]}>
                  <Text style={[styles.button__text, styles.buttonGrey__text]}>BACK</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonNext]} onPress={handleNext}>
                  <Text style={styles.button__text}>CONTINUE</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
        {pageCounter === 3 && !email && !phone && (
          <>
            <Pressable
              style={[
                styles.button,
                loveStyleIsDisabled ? styles.disabled : '',
              ]}
              onPress={sendLoveTest}
              disabled={loveStyleIsDisabled}
            >
              <Text
                style={[
                  styles.button__text,
                  loveStyleIsDisabled ? styles.disabled__text : '',
                ]}
              >
                SEND LOVE STYLES TEST
              </Text>
            </Pressable>
            <View style={styles.dots}>
              <View style={styles.dots__dot}></View>
              <View style={styles.dots__dot}></View>
              <View style={[styles.dots__dot, styles.dots__active]}></View>
              <View style={styles.dots__dot}></View>
            </View>
            <View style={styles.page__lower}>
              <View style={styles.paginationBtns}>
                <Pressable onPress={handleBack} style={[styles.button, styles.buttonGrey]}>
                  <Text style={[styles.button__text, styles.buttonGrey__text]}>BACK</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonNext,
                    nextIsDisabled ? styles.disabled : '',
                  ]}
                  onPress={handleNext}
                  disabled={nextIsDisabled}
                >
                  <Text
                    style={[
                      styles.button__text,
                      nextIsDisabled ? styles.disabled__text : '',
                    ]}
                  >
                    CONTINUE
                  </Text>
                </Pressable>
              </View>
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
                <Text
                  style={[
                    styles.button__text,
                    loveStyleIsDisabled ? styles.disabled__text : '',
                  ]}
                >
                  SEND LOVE STYLES TEST
                </Text>
              </Pressable>
              <View style={styles.dots}>
                <View style={styles.dots__dot}></View>
                <View style={styles.dots__dot}></View>
                <View style={[styles.dots__dot, styles.dots__active]}></View>
                <View style={styles.dots__dot}></View>
              </View>
              <View style={styles.page__lower}>
                <View style={styles.paginationBtns}>
                  <Pressable onPress={handleBack} style={[styles.button, styles.buttonGrey]}>
                    <Text style={[styles.button__text, styles.buttonGrey__text]}>BACK</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      styles.buttonNext,
                      nextIsDisabled ? styles.disabled : '',
                    ]}
                    onPress={handleNext}
                    disabled={nextIsDisabled}
                  >
                    <Text
                      style={[
                        styles.button__text,
                        nextIsDisabled ? styles.disabled__text : '',
                      ]}
                    >
                      CONTINUE
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          ))}

        {pageCounter === 3 && email && phone && (
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
                <Text style={styles.button__text}>SEND LOVE STYLES TEST</Text>
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
                <Pressable onPress={handleBack} style={[styles.button, styles.buttonGrey]}>
                  <Text style={[styles.button__text, styles.buttonGrey__text]}>BACK</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonNext]}
                  onPress={handleNext}
                  disabled={!nextIsDisabled}
                >
                  <Text style={styles.button__text}>CONTINUE</Text>
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
                <Pressable onPress={handleBack} style={[styles.button, styles.buttonGrey]}>
                  <Text style={[styles.button__text, styles.buttonGrey__text]}>BACK</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonNext, isDisabled ? styles.disabled : '']}
                  onPress={handlePress}
                  disabled={isDisabled}
                >
                  <Text
                    style={[
                      styles.button__text,
                      isDisabled ? styles.disabled__text : '',
                    ]}
                  >
                    Save
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </View>
    </Page>
  )
}

export default AddRelationship
