import { View, Text, Image, StyleSheet } from 'react-native'
import Clock from '../assets/clock.svg'
import Gift from '../assets/gift.svg'

const LoveLanguages = ({ name, value }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: 16, fontWeight: '400' }}>
        {name}'s Love Languages
      </Text>
      {value === 'Acts of Service' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{value}</Text>
          </View>
        </View>
      )}
      {value === 'Receiving Gifts' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Gift} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{value}</Text>
          </View>
        </View>
      )}
      {value === 'Quality Time' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{value}</Text>
          </View>
        </View>
      )}
      {value === 'Words of Affirmation' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{value}</Text>
          </View>
        </View>
      )}
      {value === 'Physical Touch' && (
        <View style={styles.iconContainer}>
          <View style={styles.iconData}>
            <Image source={Clock} style={{ width: 32, height: 32 }} />
            <Text style={styles.text}>{value}</Text>
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
    paddingTop: 30,
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
