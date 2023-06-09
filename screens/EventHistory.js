import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import EventItemHistory from '../components/EventItemHistory'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import { styles } from '../styles'
import Spinner from '../shared/Spinner'
import Page from '../shared/Page'

const EventHistory = () => {
  const [loading, setLoading] = useState(true)
  const [relationships, setRelationships] = useState('')
  const [filteredRel, setFilteredRel] = useState(undefined)
  const [eventArr, setEventArr] = useState([])
  const [openRel, setOpenRel] = useState(false)
  const [relValue, setRelValue] = useState(null)
  const [relItem, setRelItem] = useState([
    {
      label: 'All',
      value: 'All',
    },
  ])
  const [relationshipEvents, setRelationshipEvents] = useState([])
  const [tagsFilter] = useState([
    'Activity',
    'Financial',
    'Physical',
    'Appreciation',
    'Emotional',
    'Intellectual',
    'Practical',
  ])
  const [showError, setShowError] = useState(false)
  const [resetFilterColor, setResetFilterColor] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const { imgDisplay, fullNameDisplay, itemId } = route.params
  const relationshipRef = collection(db, 'relationships')
  const eventsRef = collection(db, 'events')

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter(
      (item) => item.author.id === itemId
    )
    setRelationships(finalRel)
  }

  const getEvents = async () => {
    const data = await getDocs(eventsRef)
    const newData = data.docs.map((doc) => doc.data())

    setEventArr(newData)
  }

  useEffect(() => {
    getRelationships()
    getEvents()
  }, [])

  useEffect(() => {
    if (relationships) {
      relationships.map((item) => {
        const newArr = eventArr.filter((i) => i.relID === item.id)
        setRelationshipEvents(newArr)
      })
      setLoading(false)
    }
  }, [relationships, eventArr])

  useEffect(() => {
    if (relationships) {
      const newArr = relationships.map((item) => ({
        label: `${item.name} ${item.lastName}`,
        value: `${item.name} ${item.lastName}`,
      }))

      setRelItem((prevState) => [...prevState, ...newArr])
    }
  }, [relationships])

  useEffect(() => {
    if (relationships) {
      if (relValue) {
        const newData = relationshipEvents.filter((item) => {
          const fullName = `${item.name} ${item.lastName}`
          return fullName.toLowerCase().includes(relValue.toLowerCase())
        })
        setFilteredRel(newData)
      } else {
        setFilteredRel(relationshipEvents)
      }

      if (relValue === 'All') {
        setFilteredRel(relationshipEvents)
      }
    }
  }, [relValue])

  const showAll = () => {
    setFilteredRel(relationshipEvents)
    setResetFilterColor(true)
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={styles.page__content}>
            <View style={[styles.page__upper, styles.pageTopPadding]}>
              <Text style={[styles.h2, styles.alignLeft]}>Event History</Text>
            </View>
            <View style={{ zIndex: 2 }}>
              <Text style={styles.h4}>Relationships</Text>
              <DropDownPicker
                open={openRel}
                value={relValue}
                items={relItem}
                setOpen={setOpenRel}
                setValue={setRelValue}
                setItems={setRelItem}
                style={[styles.form__select, { marginTop: 0 }]}
                placeholder="Select a relationship"
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
            </View>
            <Text style={[styles.h4, styles.medGap]}>Event Breakdown</Text>
            {filteredRel
              ? filteredRel?.map((item, index) => (
                  <EventItemHistory
                    key={index}
                    item={item}
                    imgDisplay={imgDisplay}
                    fullNameDisplay={fullNameDisplay}
                  />
                ))
              : relationshipEvents?.map((item, index) => (
                  <EventItemHistory
                    key={index}
                    item={item}
                    imgDisplay={imgDisplay}
                    fullNameDisplay={fullNameDisplay}
                  />
                ))}

            {relationshipEvents.length === 0 && (
              <Text>
                You don’t have any relationships yet. Get started by adding one
              </Text>
            )}

            {showError ? <Text>No events matching this filter</Text> : ''}
          </View>
        </Page>
      )}
    </>
  )
}

export default EventHistory
