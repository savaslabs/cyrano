import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RelationshipRating from './RelationshipRating'
import { auth } from '../config/firebase-config'
import { useState, useEffect } from 'react'
import Avatar from '../assets/avatar.png'

const isSmallDevice = Dimensions.get('window').width < 800

const EventItem = ({ item, imgDisplay, fullNameDisplay }) => {
  const navigation = useNavigation()

  const handlePress = (e) => {
    navigation.navigate('Relationship', {
      itemId: e,
    })
  }

  const {
    dateDate,
    dateTime,
    pickRestaurantValue,
    datePlace,
    additionalComments,
    eventName,
    fullName,
  } = item

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventCard__top}>
        <Text style={styles.eventCard__heading}>
          {eventName ? eventName : ''}
        </Text>
      </View>
      <View style={styles.eventCard__data}>
        {datePlace ? (
          <Text style={styles.eventCard__dateTime}>{datePlace}</Text>
        ) : (
          ''
        )}
        {datePlace && dateDate ? (
          <Text style={styles.eventCard__dateTime}>, </Text>
        ) : (
          ''
        )}
        {dateTime && dateDate && (
          <Text style={styles.eventCard__dateTime}>
            {new Date(dateDate).toLocaleDateString()} @ {dateTime}
          </Text>
        )}
        {dateDate && !dateTime && (
          <Text style={styles.eventCard__dateTime}>
            {new Date(dateDate).toLocaleDateString()}
          </Text>
        )}
        {!dateDate && !dateTime && ''}
      </View>
      <View
        style={[
          styles.eventCard__bottom,
          isSmallDevice && styles.eventCard__bottomMobile,
        ]}
      >
        <View style={styles.eventCard__profile}>
          {imgDisplay ? (
            <Image source={imgDisplay} style={styles.eventCard__profileImg} />
          ) : (
            <Image source={Avatar} style={styles.eventCard__profileImg} />
          )}

          <Text style={styles.eventCard__profileName}>
            {fullNameDisplay}
          </Text>

          <View style={styles.eventCard__buttons}>
            {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
            auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
              <Pressable
                onPress={() =>
                  navigation.navigate('Edit Event', {
                    item,
                    imgDisplay,
                    fullNameDisplay,
                  })
                }
                style={[styles.eventCard__link, styles.eventCard__admin]}
              >
                <Text>Edit event</Text>
              </Pressable>
            ) : (
              ''
            )}
            <Pressable
              style={styles.eventCard__link}
              onPress={() =>
                navigation.navigate('Event Details', {
                  item,
                  imgDisplay,
                  fullNameDisplay,
                })
              }
            >
              <Text>View event details</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: 'rgba(241, 242, 246, 1)',
    padding: 16,
    marginBottom: 16,
    borderRadius: 4,
  },
  eventCard__top: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  eventCard__heading: {
    fontSize: 19,
    fontWeight: 700,
    marginRight: 8,
    color: '#33374B',
  },
  eventCard__tag: {
    backgroundColor: '#ffffff',
    fontSize: 11,
    fontWeight: 700,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 56,
    color: '#33374B',
  },
  eventCard__dateTime: {
    fontSize: 15,
    marginBottom: 16,
    color: '#33374B',
  },
  eventCard__bottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  eventCard__bottomMobile: {
    flexDirection: 'column',
  },
  eventCard__profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventCard__profileImg: {
    width: 40,
    height: 40,
    borderRadius: '100%',
  },
  eventCard__profileName: {
    fontSize: 17,
    fontWeight: 700,
    color: '#33374B',
  },
  eventCard__data: {
    flex: 1,
    flexDirection: 'row'
  },
  eventCard__buttons: {
    flex: 1,
    gap: 8,
    justifySelf: 'flex-end',
    textAlign: 'right',
  },
  eventCard__link: {
    color: 'rgba(51, 55, 75, .75)',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
})

export default EventItem
