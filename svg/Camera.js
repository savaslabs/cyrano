import { SvgXml } from 'react-native-svg'
import { StyleSheet } from 'react-native'

const Camera = () => {
  const camera = `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.65625 1.03125L4.3125 2H2C0.875 2 0 2.90625 0 4V12C0 13.125 0.875 14 2 14H14C15.0938 14 16 13.125 16 12V4C16 2.90625 15.0938 2 14 2H11.6562L11.3125 1.03125C11.125 0.4375 10.5625 0 9.90625 0H6.0625C5.40625 0 4.84375 0.4375 4.65625 1.03125ZM8 11C6.34375 11 5 9.65625 5 8C5 6.34375 6.34375 5 8 5C9.65625 5 11 6.34375 11 8C11 9.65625 9.65625 11 8 11Z" fill="#EF6E62"/>
  </svg>  
 `

  const CyranoCam = () => <SvgXml xml={camera} style={styles.shape} />

  return <CyranoCam />
}

const styles = StyleSheet.create({
  shape: {
    width: 15,
    height: 15,
    color: '#EF6E62',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Camera
