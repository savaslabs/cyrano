import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Birthday from '../assets/birthday.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Card from '../shared/Card'
import RelationshipContext from '../context/RelationshipContext'
import DropDownPicker from 'react-native-dropdown-picker'
import RelationshipRating from '../components/RelationshipRating'
import EventItemHistory from '../components/EventItemHistory'

const EventHistory = () => {
  const [openRel, setOpenRel] = useState(false)
  const [relValue, setRelValue] = useState(null)
  const [relItem, setRelItem] = useState([
    { label: 'Amber Barker', value: 'Amber Barker' },
    { label: 'Rachel Smith', value: 'Rachel Smith' },
  ])
  const [relationshipEvents, setRelationshipEvents] = useState([
    {
      id: 1,
      eventTitle: 'Dinner Date',
      loveStyleTag: ['Activity', 'Financial'],
      date: 'Friday, Jan 26, 2023 @ 8 pm',
      relationshipRating: null,
    },
    {
      id: 2,
      eventTitle: 'Buy New Pen',
      loveStyleTag: ['Financial'],
      date: 'Friday, Jan 19, 2023',
      relationshipRating: '4',
    },
    {
      id: 3,
      eventTitle: 'Lorem Ipsum Event',
      loveStyleTag: ['Appreciation'],
      date: 'Friday, Jan 19, 2023',
      relationshipRating: '3',
    },
  ])
  const navigation = useNavigation()
  const route = useRoute()
  const { relationship } = useContext(RelationshipContext)
  const { itemId } = route.params

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
          <Card>Activity</Card>
          <Card>Financial</Card>
          <Card>Physical</Card>
          <Card>Appreciation</Card>
          <Card>Emotional</Card>
          <Card>Intellectual</Card>
          <Card>Practical</Card>
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

        {relationshipEvents ? (
          relationshipEvents?.map((item) => (
            <EventItemHistory key={item.id} item={item} />
          ))
        ) : (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  h1: {
    color: '#677788',
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 10,
    zIndex: 2,
    alignSelf: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    position: 'absolute',
    top: '0',
    zIndex: '0',
    top: -335,
  },
  next: {
    color: '#677788',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5,
  },
  message: {
    color: '#677788',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#677788',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 65,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 20,
    opacity: '1',
  },
  title: {
    color: '#677788',
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

export default EventHistory
