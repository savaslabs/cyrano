import { View, Text, Image, StyleSheet } from 'react-native'
import Clock from '../assets/clock.svg'
import Gift from '../assets/gift.svg'

const LoveLanguages = ({ item }) => {
  return (
    <View>
      {item === 'Activities' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{item}</Text>
          </View>
        </View>
      )}
      {item === 'Emotional' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Gift} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{item}</Text>
          </View>
        </View>
      )}
      {item === 'Financial' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{item}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#EF6E62',
    fontSize: 12,
    fontWeight: '400',
    paddingTop: 10,
  },
  iconData: {
    alignItems: 'center',
  },
  iconDataTwo: {
    alignItems: 'center',
  },
})

export default LoveLanguages
