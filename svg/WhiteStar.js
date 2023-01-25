import { SvgXml } from 'react-native-svg'
import { StyleSheet } from 'react-native'

const WhiteStar = () => {
  const whitestar = `<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.7583 0L8.12475 7.36234L0 8.54275L5.87913 14.2733L4.49124 22.3654L11.7583 18.5447L19.0249 22.3654L17.6374 14.2733L23.5161 8.54275L15.3918 7.36234L11.7583 0Z" fill="white"/>
  </svg>
 `

  const CyranoWhiteStar = () => <SvgXml xml={whitestar} style={styles.shape} />

  return <CyranoWhiteStar />
}

const styles = StyleSheet.create({
  shape: {
    width: 22,
    height: 22,
    marginRight: 7,
  },
})

export default WhiteStar
