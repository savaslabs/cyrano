import { SvgXml } from 'react-native-svg'
import { StyleSheet } from 'react-native'

const BorderStar = () => {
  const borderstar = `<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3958 2L9.76261 9.36234L1.63788 10.5427L7.51702 16.2733L6.12911 24.3654L13.3958 20.5447L20.6628 24.3654L19.2749 16.2733L25.154 10.5427L17.0293 9.36234L13.3958 2Z" stroke="white"/>
  </svg>  
 `

  const CyranoBorderStar = () => <SvgXml xml={borderstar} style={styles.shape} />

  return <CyranoBorderStar />
}

const styles = StyleSheet.create({
  shape: {
    width: 22,
    height: 22,
    marginRight: 7,
  },
})

export default BorderStar
