import { View, Image, StyleSheet } from 'react-native'
import Spin from '../assets/spinner.gif'

const Spinner = () => {
  return (
    <View style={styles.spinner}>
      <Image source={Spin} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {marginTop: 30},
  img: {
    width: 60,
    height: 60,
  },
})

export default Spinner
