import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../assets/cyrano-logo.svg'
import HomeIcon from '../assets/home-icon.svg'
import EventsIcon from '../assets/events-icon.svg'
import SettingsIcon from '../assets/settings-icon.svg'
import SignOutIcon from '../assets/sign-out.svg'
import { auth } from '../config/firebase-config'
import { signOut } from 'firebase/auth'
import useAuth from '../hooks/useAuth'
import { useContext, useState, useEffect } from 'react'
import RelationshipContext from '../context/RelationshipContext'

const TabNavigator = () => {
  const [imgDisplay, setImgDisplay] = useState('')
  const [fullNameDisplay, setFullNameDisplay] = useState('')
  const navigation = useNavigation()
  const { setUser } = useAuth()
  const { relationships } = useContext(RelationshipContext)

  const handleSignOut = () => {
    signOut(auth).then(() =>
      setUser({
        user: auth.currentUser,
        isLoggedIn: false,
      })
    )
  }

  useEffect(() => {
    if (relationships) {
      setImgDisplay(relationships?.profileImage)
      setFullNameDisplay(`${relationships?.name} ${relationships?.lastName}`)
    }
  }, [relationships])

  return (
    <View style={styles.nav}>
      <View style={styles.nav__row}>
        <View style={styles.nav__logo}>
          <Image
            source={Logo}
            style={{ maxWidth: 32, minWidth: 32, height: 23 }}
          />
        </View>
        {auth.currentUser.uid === 'KgJLUBI6d9QIpR0tnGKPERyF0S03' ||
        auth.currentUser.uid === 'LkdoS9fnSDNwhH22mfrmzh7DLG83' ? (
          <>
            <Pressable
              style={[styles.nav__link, { minWidth: 92, maxWidth: 92 }]}
              onPress={() => navigation.navigate('Admin')}
            >
              <Image source={HomeIcon} style={styles.nav__icon} />
              <Text style={styles.nav__text}>Home</Text>
            </Pressable>
            <Pressable
              style={[styles.nav__link, { minWidth: 121, maxWidth: 121 }]}
              onPress={() => navigation.navigate('User Panel')}
            >
              <Image source={SettingsIcon} style={styles.nav__icon} />
              <Text style={styles.nav__text}>Settings</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              style={[styles.nav__link, { minWidth: 92, maxWidth: 92 }]}
              onPress={() => navigation.navigate('Relationships')}
            >
              <Image source={HomeIcon} style={styles.nav__icon} />
              <Text style={styles.nav__text}>Home</Text>
            </Pressable>
            {/* <Pressable
              style={[styles.nav__link, { minWidth: 106, maxWidth: 106 }]}
              onPress={() =>
                navigation.navigate('Event History', {
                  imgDisplay,
                  fullNameDisplay,
                })
              }
            >
              <Image source={EventsIcon} style={styles.nav__icon} />
              <Text style={styles.nav__text}>Events</Text>
            </Pressable> */}
            <Pressable
              style={[styles.nav__link, { minWidth: 121, maxWidth: 121 }]}
              onPress={() => navigation.navigate('User Panel')}
            >
              <Image source={SettingsIcon} style={styles.nav__icon} />
              <Text style={styles.nav__text}>Settings</Text>
            </Pressable>
          </>
        )}
        <Pressable
          style={[styles.nav__link, { minWidth: 121, maxWidth: 121 }]}
          onPress={handleSignOut}
        >
          <Image source={SignOutIcon} style={styles.nav__icon} />
          <Text style={styles.nav__text}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: -24,
    marginLeft: -8,
  },
  nav__row: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  nav__logo: {
    maxWidth: 48,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#F59784',
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav__link: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#F59784',
    borderRadius: 4,
    paddingVertical: 4,
    paddingRight: 12,
    paddingLeft: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  nav__icon: {
    width: 24,
    height: 24,
  },
  nav__text: {
    textTransform: 'uppercase',
    fontSize: 14,
    letterSpacing: '5%',
    color: '#33374B',
  },
  nav__space: {
    flexGrow: 1,
  },
})

export default TabNavigator
