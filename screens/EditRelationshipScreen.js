import { View, Text, TextInput, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db, auth } from '../config/firebase-config'
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
import CloseIcon from '../assets/close.svg'
import TrashIcon from '../assets/trash-bold.svg'
import RelationshipRating from '../components/RelationshipRating'
import DropDownPicker from 'react-native-dropdown-picker'
import DatePicker from '../components/form/DatePicker'

const EditRelationshipScreen = () => {
  const route = useRoute()
  const [isLoading, setIsLoading] = useState(true)
  const [singleRelationship, setSingleRelationship] = useState('')
  const [newProfileImage, setNewProfileImage] = useState('')
  const [editName, setEditName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editBirthday, setEditBirthday] = useState('')
  const [blankBirthday, setBlankBirthday] = useState(false)
  const [editAnniversary, setEditAnniversary] = useState('')
  const [blankAnniversary, setBlankAnniversary] = useState(false)
  const [editLocation, setEditLocation] = useState('')
  const [editPronouns, setEditPronouns] = useState('')
  const [blankPronouns, setBlankPronouns] = useState(false)
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [openPronouns, setOpenPronouns] = useState(false)
  const [pronounsVal, setPronounsValue] = useState(null)
  const [pronounsItem, setPronounsItem] = useState([
    { label: 'She/her', value: 'She/her' },
    { label: 'He/him', value: 'He/him' },
    { label: 'They/them', value: 'They/them' },
  ])
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)
  const [showAnniversaryPicker, setShowAnniversaryPicker] = useState(false)
  const [showPronounsDropdown, setShowPronounsDropdown] = useState(false)
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
        .then(() =>
          auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
          auth.currentUser.uid !== 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
            ? navigation.navigate('Relationships')
            : navigation.navigate('Admin')
        )
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
    relationshipValue,
  } = singleRelationship

  const handleChangeImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200,
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
    setEditBirthday(birthday)
    setEditAnniversary(anniversary)
  }, [
    name,
    lastName,
    location,
    pronounsValue,
    email,
    phone,
    birthday,
    anniversary,
  ])

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
      editPhone
    ) {
      if (editName === '' || editLastName === '') {
        Toast.show({
          type: 'error',
          text1: 'Name and last name are required',
          visibilityTime: 2000,
        })
      } else {
        setIsLoading(true)
        await updateDoc(
          relRef,
          {
            profileImage: newProfileImage
              ? newProfileImage
              : newProfileImage === ''
              ? ''
              : profileImage,
            name: editName ? editName : editName === '' ? '' : name,
            lastName: editLastName
              ? editLastName
              : editLastName === ''
              ? ''
              : lastName,
            birthday: editBirthday
              ? editBirthday
              : editBirthday === ''
              ? ''
              : birthday,
            anniversary: editAnniversary
              ? editAnniversary
              : editAnniversary === ''
              ? ''
              : anniversary,
            location: editLocation
              ? editLocation
              : editLocation === ''
              ? ''
              : location,
            pronounsValue: pronounsVal
              ? pronounsVal
              : pronounsVal === ''
              ? ''
              : pronounsValue,
            email: editEmail ? editEmail : editEmail === '' ? '' : email,
            phone: editPhone ? editPhone : editPhone === '' ? '' : phone,
          },
          {
            merge: true,
          }
        )
          .then(() =>
            auth.currentUser.uid !== 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
            auth.currentUser.uid !== 'LkdoS9fnSDNwhH22mfrmzh7DLG83'
              ? navigation.navigate('Relationships')
              : navigation.navigate('Admin')
          )
          .then(() =>
            Toast.show({
              type: 'success',
              text1: 'Relationship updated ✅',
              visibilityTime: 2000,
            })
          )
      }
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
            {/* <View style={styles.vertCenter}>
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
            </View> */}
            <View style={styles.form}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Relationship Check-In', {
                    itemId: savedId,
                    rating: relationshipRating,
                    name: name,
                  })
                }
              >
                {relationshipRating ? (
                  <View style={[styles.greybox, styles.mb16]}>
                    <View style={styles.ratingCard}>
                      <View style={styles.ratingCard__text}>
                        <Text style={styles.h5}>RELATIONSHIP RATING</Text>
                        <RelationshipRating
                          relationshipRating={relationshipRating}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={[styles.greybox, styles.mb16]}>
                    <View style={styles.ratingCard}>
                      <View style={styles.ratingCard__text}>
                        <Text style={styles.h5}>RATE THIS RELATIONSHIP</Text>
                      </View>
                    </View>
                  </View>
                )}
              </Pressable>
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
                      <DatePicker
                        style={styles.form__date}
                        onChange={(e) => setEditBirthday(e.target.value)}
                        onBlur={(e) => setEditBirthday(e.target.value)}
                        value={editBirthday}
                      />
                      <Pressable onPress={() => setShowBirthdayPicker(false)}>
                        <Image
                          source={CloseIcon}
                          style={{ width: 24, height: 24 }}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setShowBirthdayPicker(false),
                            setBlankBirthday(true),
                            setEditBirthday('')
                        }}
                      >
                        <Image
                          source={TrashIcon}
                          style={{ width: 20, height: 20 }}
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setShowBirthdayPicker(true)}>
                      {!blankBirthday && (
                        <TextInput
                          style={styles.form__input}
                          placeholderTextColor="#c7cbd9"
                          placeholder={birthday ? '' : 'Edit their birthday'}
                          value={
                            birthday
                              ? new Date(birthday).toLocaleDateString()
                              : ''
                          }
                        />
                      )}
                      {blankBirthday && (
                        <TextInput
                          style={styles.form__input}
                          placeholderTextColor="#c7cbd9"
                          placeholder="Edit their birthday"
                          value=""
                        />
                      )}
                    </Pressable>
                  )}
                </View>
                {relationshipValue === 'Romantic' ? (
                  <View style={styles.form__col}>
                    <Text style={styles.form__label}>Anniversary</Text>
                    {showAnniversaryPicker ? (
                      <View style={styles.form__twoCol}>
                        <DatePicker
                          style={styles.form__date}
                          onChange={(e) => setEditAnniversary(e.target.value)}
                          onBlur={(e) => setEditAnniversary(e.target.value)}
                          value={editAnniversary}
                        />
                        <Pressable
                          onPress={() => setShowAnniversaryPicker(false)}
                        >
                          <Image
                            source={CloseIcon}
                            style={{ width: 24, height: 24 }}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setShowAnniversaryPicker(false),
                              setBlankAnniversary(true),
                              setEditAnniversary('')
                          }}
                        >
                          <Image
                            source={TrashIcon}
                            style={{ width: 20, height: 20 }}
                          />
                        </Pressable>
                      </View>
                    ) : (
                      <Pressable onPress={() => setShowAnniversaryPicker(true)}>
                        {!blankAnniversary && (
                          <TextInput
                            style={styles.form__input}
                            placeholderTextColor="#c7cbd9"
                            placeholder={
                              anniversary ? '' : 'Edit their anniversary'
                            }
                            value={
                              anniversary
                                ? new Date(anniversary).toLocaleDateString()
                                : ''
                            }
                          />
                        )}
                        {blankAnniversary && (
                          <TextInput
                            style={styles.form__input}
                            placeholderTextColor="#c7cbd9"
                            placeholder="Edit their anniversary"
                            value=""
                          />
                        )}
                      </Pressable>
                    )}
                  </View>
                ) : (
                  ''
                )}
              </View>
              <View style={styles.form__twoCol}>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Location</Text>
                  <TextInput
                    style={styles.form__input}
                    placeholderTextColor="#c7cbd9"
                    placeholder={editLocation ? '' : 'Edit their location'}
                    value={editLocation}
                    onChangeText={(newEditLocation) =>
                      setEditLocation(newEditLocation)
                    }
                  />
                </View>
                <View style={styles.form__col}>
                  <Text style={styles.form__label}>Pronouns</Text>
                  {showPronounsDropdown ? (
                    <View style={styles.form__twoCol}>
                      <DropDownPicker
                        open={openPronouns}
                        value={pronounsVal}
                        items={pronounsItem}
                        setOpen={setOpenPronouns}
                        setValue={setPronounsValue}
                        setItems={setPronounsItem}
                        style={styles.form__select}
                        placeholder={pronounsVal ? '' : 'Edit their pronouns'}
                        placeholderStyle={{
                          color: '#c7cbd9',
                          paddingLeft: 4,
                          fontSize: 17,
                        }}
                        dropdownStyle={{
                          paddingLeft: 30,
                        }}
                        dropDownContainerStyle={{
                          margin: 'auto',
                          color: '#33374B',
                          zIndex: '10000',
                          borderColor: 'rgba(199, 203, 217, 1)',
                          height: 120,
                          bottom: -95,
                          paddingLeft: 8,
                          fontSize: 17,
                        }}
                        labelStyle={{
                          color: '#33374B',
                        }}
                        listItemLabelStyle={{
                          color: '#33374B',
                        }}
                        disabledItemLabelStyle={{
                          color: 'rgba(51,55,75,0.5)',
                        }}
                      />
                      <Pressable onPress={() => setShowPronounsDropdown(false)}>
                        <Image
                          source={CloseIcon}
                          style={{ width: 24, height: 24 }}
                        />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setShowPronounsDropdown(false),
                            setBlankPronouns(true),
                            setPronounsValue('')
                        }}
                      >
                        <Image
                          source={TrashIcon}
                          style={{ width: 20, height: 20 }}
                        />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable onPress={() => setShowPronounsDropdown(true)}>
                      {!blankPronouns && (
                        <TextInput
                          style={styles.form__input}
                          placeholderTextColor="#c7cbd9"
                          placeholder="Edit their pronouns"
                          value={editPronouns}
                        />
                      )}
                      {blankPronouns && (
                        <TextInput
                          style={styles.form__input}
                          placeholderTextColor="#c7cbd9"
                          placeholder="Edit their pronouns"
                          value=""
                        />
                      )}
                    </Pressable>
                  )}
                </View>
              </View>
              <Text style={styles.form__label}>Email</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                placeholder={editEmail ? '' : 'Add their email'}
                value={editEmail}
                onChangeText={(newEditEmail) => setEditEmail(newEditEmail)}
              />
              <Text style={styles.form__label}>Phone</Text>
              <TextInput
                style={styles.form__input}
                placeholderTextColor="#c7cbd9"
                placeholder={editPhone ? '' : 'Add their phone'}
                value={editPhone}
                onChangeText={(newEditPhone) => setEditPhone(newEditPhone)}
              />
            </View>
            {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
            auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={styles.delete}
                onPress={handleDeleteDoc}
                // disabled={isDisabled}
              >
                <Text style={styles.delete__text}>Delete Relationship</Text>
              </Pressable>
            ) : (
              ''
            )}
            <View style={[styles.page__lower, styles.paginationBtns]}>
              <Pressable
                style={[styles.button, styles.buttonGrey]}
                onPress={() => navigation.navigate('Relationships')}
              >
                <Text style={[styles.button__text, styles.buttonGrey__text]}>
                  CANCEL
                </Text>
              </Pressable>
              <Pressable
                // style={[styles.button, isDisabled ? styles.disabled : '']}
                style={[styles.button, styles.buttonNext]}
                onPress={handleSave}
                // disabled={isDisabled}
              >
                <Text style={styles.button__text}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default EditRelationshipScreen
