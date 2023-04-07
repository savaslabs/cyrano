import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  Image,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Avatar from '../assets/avatar.png'
import MobileIcon from '../assets/mobile-device.svg'

const AdminRelItem = ({ user }) => {
  const navigation = useNavigation()

  const handlePress = (id) => {
    navigation.navigate('AdminRel', {
      itemId: id,
    })
  }

  return (
    <View style={styles.userCard} key={user?.userId}>
        <View style={styles.userCard__top}>
          {user?.profileImg ? (
            <Image
              source={user?.profileImg}
              style={{ width: 64, height: 64, borderRadius: '100%' }}
            />
          ) : (
            <Image
              source={Avatar}
              style={{ width: 64, height: 64, borderRadius: '100%' }}
            />
          )}
          <View>
            <Text style={styles.userCard__name}>
              {user?.name} {user?.lastName}
            </Text>
            <View style={styles.userCard__phone}>
              <Image
                source={MobileIcon}
                style={{ width: 24, height: 24}}
              />
              <Text style={styles.userCard__phoneText}>{user?.phone}</Text>
            </View>
          </View>
        </View>
        <View style={styles.userCard__bottom}>
          <Pressable
            style={styles.userCard__button}
            onPress={() =>
              navigation.navigate('Relationships Admin', {
                itemId: user?.userId,
              })
            }
          >
            Login As User
          </Pressable>
          <Pressable
            style={styles.userCard__button}
            onPress={() => handlePress(user?.userId)}
          >
            Create Event
          </Pressable>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: '#F1F2F6',
    borderRadius: 4,
    padding: 16,
  },
  userCard__top: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 16 
  },
  userCard__name: {
    color: '#33374B',
    fontWeight: 800,
    fontSize: 22,
    marginBottom: 11
  },
  userCard__phone: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  userCard__phoneText: {
    fontSize: 17,
    color: '#33374B',
  },
  userCard__bottom: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap'
  },
  userCard__button: {
    padding: 16,
    fontSize: 15,
    color: '#33374B',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#A0A5BD',
    borderRadius: 60,
    fontFamily: 'sans-serif',
    flexGrow: 1,
    textAlign: 'center'
  }
})

export default AdminRelItem
