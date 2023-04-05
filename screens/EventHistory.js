import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import DropDownPicker from 'react-native-dropdown-picker'
import EventItemHistory from '../components/EventItemHistory'
import EventItem from '../components/EventItem'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import LoveStyleFilter from '../components/LoveStyleFilter'
import { styles } from '../styles'
import Spinner from '../shared/Spinner'
import Page from '../shared/Page'

const EventHistory = () => {
  const [loading, setLoading] = useState(true)
  const [relationships, setRelationships] = useState('')
  const [filteredRel, setFilteredRel] = useState('')
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
  const navigation = useNavigation()
  const relationshipRef = collection(db, 'relationships')

  const getRelationships = async () => {
    const data = await getDocs(relationshipRef)
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const finalRel = newData.filter(
      (item) => item.author.id === auth.currentUser.uid
    )
    setRelationships(finalRel)
  }

  useEffect(() => {
    getRelationships()
  }, [])

  useEffect(() => {
    if (relationships) {
      const eventList = relationships?.reduce(
        (acc, item) => [...acc, ...item.totalEvents],
        []
      )
      setRelationshipEvents(eventList)

      const newArr = relationships.map((item) => ({
        label: `${item.name} ${item.lastName}`,
        value: `${item.name} ${item.lastName}`,
      }))

      setRelItem((prevState) => [...prevState, ...newArr])
      setLoading(false)
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
            <View style={{zIndex: 2}}>
              <Text style={styles.h4}>Relationships</Text>
              <DropDownPicker
                open={openRel}
                value={relValue}
                items={relItem}
                setOpen={setOpenRel}
                setValue={setRelValue}
                setItems={setRelItem}
                style={[styles.form__select, {marginTop: 0}]}
                placeholder="Select a relationship"
                placeholderStyle={{ color: '#c7cbd9', paddingLeft: 4, fontSize: 17 }}
                dropdownStyle={{
                  paddingLeft: 30
                }}
                dropDownContainerStyle={{
                  margin: 'auto',
                  color: '#33374B',
                  zIndex: '10000',
                  borderColor: 'rgba(199, 203, 217, 1)',
                  height: 120,
                  bottom: -95,
                  paddingLeft: 8,
                  fontSize: 17
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
            <View style={styles.loveStyleTags}>
              {tagsFilter.map((tag, index) => (
                <LoveStyleFilter
                  key={index}
                  tag={tag}
                  setFilteredRel={setFilteredRel}
                  relationshipEvents={relationshipEvents}
                />
              ))}
              <Pressable style={styles.loveStyleTags__tag} onPress={showAll}>
                All
              </Pressable>
            </View>
            {filteredRel
              ? filteredRel?.map((item, index) => (
                <EventItemHistory key={index} item={item} />
              ))
              : relationshipEvents?.map((item, index) => (
                <EventItemHistory key={index} item={item} />
              ))}

            {relationshipEvents.length === 0 && (
              <Text>
                You don’t have any relationships yet. Get started by adding
                one
              </Text>
            )}
          </View>
        </Page>
      )}
    </>
  )
}

export default EventHistory
