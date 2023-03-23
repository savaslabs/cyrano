import { View, Text, Image, StyleSheet } from 'react-native'
import Activities from '../assets/activities.svg'
import Emotional from '../assets/emotional.svg'
import Financial from '../assets/financial.svg'

const LoveLanguages = ({ item }) => {
  return (
    // <View>
    //   {item === 'Activities' && (
    //     <View style={styles.iconData}>
    //       <Image source={Clock} style={{ width: 32, height: 32 }} />
    //       <Text style={styles.text}>{item}</Text>
    //     </View>
    //   )}
    //   {item === 'Emotional' && (
    //     <View style={styles.iconData}>
    //       <Image source={Gift} style={{ width: 32, height: 32 }} />
    //       <Text style={styles.text}>{item}</Text>
    //     </View>
    //   )}
    //   {item === 'Financial' && (
    //     <View style={styles.iconData}>
    //       <Image source={Clock} style={{ width: 32, height: 32 }} />
    //       <Text style={styles.text}>{item}</Text>
    //     </View>
    //   )}
    // </View>
    <View style={styles.iconContainer}>
      <View style={styles.iconData}>
        <Image source={Activities} style={{ width: 25, height: 34 }} />
        <Text style={styles.text}>Activities</Text>
      </View>

      <View style={styles.iconData}>
        <Image source={Emotional} style={{ width: 34, height: 34 }} />
        <Text style={styles.text}>Emotional</Text>
      </View>

      <View style={styles.iconData}>
        <Image source={Financial} style={{ width: 34, height: 34 }} />
        <Text style={styles.text}>Financial</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    color: '#677788',
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
