import { View, Text, Image, StyleSheet } from 'react-native'
import Loader from '../assets/spinner.gif'

const Spinner = () => {
  return (
    <View style={styles.imgContainer}>
      <Image source={Loader} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 64,
    height: 64,
  },
})

export default Spinner
