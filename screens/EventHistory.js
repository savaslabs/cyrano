import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Birthday from '../assets/birthday.svg'
import { useState, useEffect, useContext, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import RelationshipContext from '../context/RelationshipContext'
import DropDownPicker from 'react-native-dropdown-picker'
import RelationshipRating from '../components/RelationshipRating'
import EventItemHistory from '../components/EventItemHistory'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'
import LoveStyleFilter from '../components/LoveStyleFilter'

const EventHistory = () => {
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
  const route = useRoute()
  const { relationship } = useContext(RelationshipContext)
  const { itemId } = route.params
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
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.h1}>Event History</Text>
        <Text style={styles.title}>Relationships</Text>

        <DropDownPicker
          open={openRel}
          value={relValue}
          items={relItem}
          setOpen={setOpenRel}
          setValue={setRelValue}
          setItems={setRelItem}
          style={styles.dropdown}
          placeholder="Select a relationship"
          placeholderStyle={{ color: 'rgba(51,55,75,0.5)' }}
          dropDownContainerStyle={{
            margin: 'auto',
            color: '#33374B',
            borderColor: '#33374B',
            zIndex: '10000',
            width: '90%',
            height: 160,
            bottom: -147,
            left: 13,
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

        <View>
          {tagsFilter.map((tag, index) => (
            <LoveStyleFilter
              key={index}
              tag={tag}
              setFilteredRel={setFilteredRel}
              relationshipEvents={relationshipEvents}
            />
          ))}
          <Pressable onPress={showAll}>
            <Card>All</Card>
          </Pressable>
        </View>
      </View>

      <View>
        <View style={styles.row}>
          <Text>RESULTS</Text>
          <Text>All Events</Text>
        </View>
        <Card>
          <View style={styles.row}>
            <Text>Percentage of Events In Categories</Text>
            <Text>100%</Text>
          </View>
        </Card>

        {filteredRel
          ? filteredRel?.map((item, index) => (
              <EventItemHistory key={index} item={item} />
            ))
          : relationshipEvents?.map((item, index) => (
              <EventItemHistory key={index} item={item} />
            ))}

        {relationshipEvents.length === 0 && (
          <Text>
            You don’t have any relationships yet. Get started by adding one
          </Text>
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() =>
          navigation.navigate('Relationship', {
            itemId,
          })
        }
      >
        <Text style={styles.text}>Back</Text>
      </Pressable>
    </View>
  )
}

export default EventHistory
