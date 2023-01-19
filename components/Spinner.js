import { View, Image, StyleSheet } from 'react-native'
import Spin from '../assets/spinner.gif'

const Spinner = () => {
  return (
    <View>
      <Image source={Spin} style={styles.img} />
    </View>
  )
}

const styles = StyleSheet.create({
  spinner: {},
  img: {
    width: '60px',
    height: '60px',
  },
})

export default Spinner
