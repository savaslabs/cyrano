import { View, Text, Image, StyleSheet } from 'react-native'
import Clock from '../assets/clock.svg'
import Gift from '../assets/gift.svg'

const LoveLanguages = ({ name }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: '16px', fontWeight: '400' }}>
        {name}'s Love Languages
      </Text>
      <View style={styles.iconContainer}>
        <View style={styles.iconData}>
          <Image source={Clock} style={{ width: '32px', height: '32px' }} />
          <Text style={styles.text}>Quality Time</Text>
        </View>
        <View style={styles.iconData}>
          <Image source={Gift} style={{ width: '32px', height: '32px' }} />
          <Text style={styles.text}>Receiving Gifts</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  text: {
    color: '#EF6E62',
    fontSize: '12px',
    fontWeight: '400',
    paddingTop: '10px',
  },
  iconData: {
    alignItems: 'center',
    marginRight: '40px',
  },
})

export default LoveLanguages
