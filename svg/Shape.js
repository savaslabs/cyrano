import { SvgXml } from 'react-native-svg'
import { StyleSheet } from 'react-native'

const Shape = () => {
  const shape = `<svg width="375" height="204" viewBox="0 0 375 204" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#filter0_d_89_7585)">
  <path d="M0.703613 191.332C75.9945 197.957 248.551 195.386 375 58.0017V0.00100708C375 -8.83556 367.837 -15.999 359 -15.999L16.7036 -15.9981C7.86702 -15.9981 0.703613 -8.83463 0.703613 0.00191307V191.332Z" fill="url(#paint0_linear_89_7585)"/>
  </g>
  <defs>
  <filter id="filter0_d_89_7585" x="-15.2964" y="-37.999" width="406.296" height="241.296" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  <feOffset dy="-6"/>
  <feGaussianBlur stdDeviation="8"/>
  <feComposite in2="hardAlpha" operator="out"/>
  <feColorMatrix type="matrix" values="0 0 0 0 0.929412 0 0 0 0 0.388235 0 0 0 0 0.345098 0 0 0 0.25 0"/>
  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_89_7585"/>
  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_89_7585" result="shape"/>
  </filter>
  <linearGradient id="paint0_linear_89_7585" x1="-109.895" y1="8.87769" x2="467.162" y2="8.87769" gradientUnits="userSpaceOnUse">
  <stop stop-color="#FED9B7"/>
  <stop offset="1" stop-color="#F07167"/>
  </linearGradient>
  </defs>
  </svg>
  
 `

  const CyranoShape = () => <SvgXml xml={shape} style={styles.shape} />

  return <CyranoShape />
}

const styles = StyleSheet.create({
  shape: {
    position:'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default Shape
