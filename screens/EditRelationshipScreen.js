import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState, useEffect, createElement } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../config/firebase-config'
import {
  doc,
  getDoc,
  deleteDoc,
  collection,
  updateDoc,
} from 'firebase/firestore'
import Toast from 'react-native-toast-message'
import { styles } from '../styles'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import Avatar from '../assets/avatar.png'
import * as ImagePicker from 'expo-image-picker'
import TrashIcon from '../assets/trash-white.svg'
import CloseIcon from '../assets/close.svg'
import RelationshipRating from '../components/RelationshipRating'
import StarRating from 'react-native-star-rating-widget'

const EditRelationshipScreen = () => {
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(true)
  const [singleRelationship, setSingleRelationship] = useState('')
  const [newProfileImage, setNewProfileImage] = useState('')
  const [finalBirthday, setFinalBirthday] = useState('')
  const [finalAnniversary, setFinalAnniversary] = useState('')
  const [editRating, setEditRating] = useState('')
  const [editName, setEditName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editBirthday, setEditBirthday] = useState('')
  const [editAnniversary, setEditAnniversary] = useState('')
  const [editLocation, setEditLocation] = useState('')
  const [editPronouns, setEditPronouns] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false)
  const { savedId } = route.params
  const relRef = doc(db, 'relationships', savedId)
  const navigation = useNavigation()

  useEffect(() => {
    getSpecificDoc()
  }, [])

  const getSpecificDoc = async () => {
    try {
      const docSnap = await getDoc(relRef)
      if (docSnap.exists()) {
        setSingleRelationship(docSnap.data())
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
        visibilityTime: 2000,
      })
    }
  }

  const handleDeleteDoc = async () => {
    try {
      await deleteDoc(doc(collection(db, 'relationships'), savedId))
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Relationship deleted',
            visibilityTime: 2000,
          })
        )
        .then(() => navigation.navigate('Relationships'))
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.code,
        visibilityTime: 2000,
      })
    }
  }

  useEffect(() => {
    if (singleRelationship) {
      setIsLoading(false)
    }
  }, [singleRelationship])

  const {
    name,
    lastName,
    profileImage,
    birthday,
    anniversary,
    email,
    phone,
    pronounsValue,
    location,
    relationshipRating,
  } = singleRelationship

  useEffect(() => {
    if (singleRelationship) {
      setFinalBirthday(
        `${new Date(birthday.seconds * 1000).getMonth()} - ${new Date(
          birthday.seconds * 1000
        ).getDate()} - ${new Date(birthday.seconds * 1000).getFullYear()}`
      )
      setFinalAnniversary(
        `${new Date(anniversary.seconds * 1000).getMonth()} - ${new Date(
          anniversary.seconds * 1000
        ).getDate()} - ${new Date(anniversary.seconds * 1000).getFullYear()}`
      )
    }
  }, [singleRelationship])

  const handleChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri)
    }
  }

  useEffect(() => {
    setEditName(name)
    setEditLastName(lastName)
    setEditLocation(location)
    setEditPronouns(pronounsValue)
    setEditEmail(email)
    setEditPhone(phone)
    setEditRating(relationshipRating)
  }, [name, lastName, location, pronounsValue, email, phone])

  const BirthdayDatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: editBirthday,
      placeholder: 'Select a date',
      onChange: (event) => {
        setEditBirthday(new Date(event.target.value))
      },
      style: {
        height: 56,
        marginBottom: 16,
        fontSize: 17,
        border: '1px solid rgb(199, 203, 217)',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        color: 'rgba(51, 55, 75, 1)',
        marginTop: -8,
        flexGrow: 1,
        fontFamily: 'sans-serif',
      },
    })
  }

  const AnniversaryDatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: editAnniversary,
      placeholder: 'Select a date',
      onChange: (event) => {
        setEditAnniversary(new Date(event.target.value))
      },
      style: {
        height: 56,
        marginBottom: 16,
        fontSize: 17,
        border: '1px solid rgb(199, 203, 217)',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        color: 'rgba(51, 55, 75, 1)',
        marginTop: -8,
        flexGrow: 1,
        fontFamily: 'sans-serif',
      },
    })
  }

  const handleSave = async () => {
    if (
      newProfileImage ||
      editName ||
      editLastName ||
      editBirthday ||
      editAnniversary ||
      editLocation ||
      editPronouns ||
      editEmail ||
      editPhone ||
      editRating
    ) {
      setIsLoading(true)
      await updateDoc(
        relRef,
        {
          profileImage: newProfileImage ? newProfileImage : profileImage,
          name: editName ? editName : name,
          lastName: editLastName ? editLastName : lastName,
          birthday: editBirthday ? editBirthday : birthday,
          anniversary: editAnniversary ? editAnniversary : anniversary,
          location: editLocation ? editLocation : location,
          pronounsValue: editPronouns ? editPronouns : pronounsValue,
          email: editEmail ? editEmail : email,
          phone: editPhone ? editPhone : phone,
          relationshipRating: editRating ? editRating : relationshipRating,
        },
        {
          merge: true,
        }
      )
        .then(() => navigation.navigate('Relationships'))
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Relationship updated ✅',
            visibilityTime: 2000,
          })
        )
    } else {
      Toast.show({
        type: 'error',
        text1: 'You need to update some value first',
        visibilityTime: 2000,
      })
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={styles.page__upper}>
              <Text style={styles.h1}>Edit Relationship</Text>
            </View>
            <View style={styles.vertCenter}>
              {profileImage ? (
                <Image
                  source={profileImage}
                  style={[
                    styles.profileImage,
                    newProfileImage
                      ? { display: 'none' }
                      : { display: 'block' },
                  ]}
                />
              ) : (
                <Image
                  source={Avatar}
                  style={[
                    styles.profileImage,
                    newProfileImage
                      ? { display: 'none' }
                      : { display: 'block' },
                  ]}
                />
              )}
              {newProfileImage && (
                <Image source={newProfileImage} style={styles.profileImage} />
              )}
              <Pressable onPress={handleChangeImage}>
                <Text style={[styles.textLink, styles.mb16]}>Change photo</Text>
              </Pressable>
            </View>
            <View style={styles.form}>
              <View style={[styles.greybox, styles.mb16]}>
                <View style={styles.ratingCard}>
                  <View style={styles.ratingCard__text}>
                    <Text style={styles.h5}>RELATIONSHIP RATING</Text>
                    <StarRating
                      rating={editRating}
                      onChange={setEditRating}
                      color="#7B82A2"
                      starSize="52"
                      style={styles.starRating}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.form__twoCol}>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Name</Text>
                  <TextInput
                    style={styles.form__input}
                    placeholderTextColor="#c7cbd9"
                    value={editName}
                    onChangeText={(newEditName) => setEditName(newEditName)}
                  />
                </View>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Last Name</Text>
                  <TextInput
                    style={styles.form__input}
                    placeholderTextColor="#c7cbd9"
                    value={editLastName}
                    onChangeText={(newEditLastname) =>
                      setEditLastName(newEditLastname)
                    }
                  />
                </View>
              </View>
              <View style={styles.form__twoCol}>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Birthday</Text>
                  {showBirthdayPicker ? (
                    <View style={styles.form__twoCol}>
                      <BirthdayDatePicker style={styles.form__date} />
                      <Pressable onPress={() => setShowBirthdayPicker(false)}>
                        <Image
                          source={CloseIcon}
                          style={{ width: 24, height: 24 }}
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setShowBirthdayPicker(true)}>
                      <TextInput
                        style={styles.form__input}
                        placeholderTextColor="#c7cbd9"
                        value={finalBirthday}
                      />
                    </Pressable>
                  )}
                </View>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Anniversary</Text>
                  {showAnniversaryPicker ? (
                    <View style={styles.form__twoCol}>
                      <AnniversaryDatePicker style={styles.form__date} />
                      <Pressable
                        onPress={() => setShowAnniversaryPicker(false)}
                      >
                        <Image
                          source={CloseIcon}
                          style={{ width: 24, height: 24 }}
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setShowAnniversaryPicker(true)}>
                      <TextInput
                        style={styles.form__input}
                        placeholderTextColor="#c7cbd9"
                        value={finalAnniversary}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
              <View style={styles.form__twoCol}>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Location</Text>
                  <TextInput
                    style={styles.form__input}
                    placeholderTextColor="#c7cbd9"
                    value={editLocation}
                    onChangeText={(newEditLocation) =>
                      setEditLocation(newEditLocation)
                    }
                  />
                </View>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Pronouns</Text>
                  <TextInput
                    style={styles.form__input}
                    placeholderTextColor="#c7cbd9"
                    value={editPronouns}
                    onChangeText={(newEditPronouns) =>
                      setEditPronouns(newEditPronouns)
                    }
                  />
                </View>
              </View>
              <Text style={styles.form__label}>Email</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editEmail}
                onChangeText={(newEditEmail) => setEditEmail(newEditEmail)}
              />
              <Text style={styles.form__label}>Phone</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                value={editPhone}
                onChangeText={(newEditPhone) => setEditPhone(newEditPhone)}
              />
            </View>

            <View style={[styles.page__lower, styles.form__twoCol]}>
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={styles.button}
                onPress={handleSave}
                // disabled={isDisabled}
              >
                <Text style={styles.button__text}>SAVE</Text>
              </Pressable>
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={styles.button}
                onPress={handleDeleteDoc}
                // disabled={isDisabled}
              >
                <Text style={styles.button__text}>
                  <Image source={TrashIcon} style={{ width: 24, height: 24 }} />
                </Text>
              </Pressable>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default EditRelationshipScreen
