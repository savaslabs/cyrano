import { View, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import Home from '../assets/home.svg'
import Info from '../assets/info.svg'
import Config from '../assets/config.svg'

const Navbar = ({ name, lastName }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <View>
          <Image source={Home} style={styles.img} />
        </View>
        <View>
          <Image source={Info} style={styles.img} />
        </View>
        <View>
          <Image source={Config} style={styles.img} />
        </View>
      </View>
      {/* <Text style={styles.text}>
        Welcome back, {name} {lastName}!
      </Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F59784',
    paddingTop: '10px',
    paddingBottom: '20px',
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  img: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  text: {
    color: '#FFFFFF',
  },
})

export default Navbar
