import { SvgXml } from 'react-native-svg'

const Logo = () => {
  const cyrano = `<svg width="112" height="90" viewBox="0 0 112 90" fill="none" xmlns="http://www.w3.org/2000/svg">
 <g filter="url(#filter0_d_120_4263)">
 <path d="M88.2222 69.7777C86.8002 69.7777 85.3788 69.2352 84.2936 68.1506L74.8096 58.6666H39.3335C26.4672 58.6666 16 48.1997 16 35.3335C16 22.4672 26.4672 12 39.3335 12H90.4443C93.5126 12 96 14.4874 96 17.5557C96 20.6237 93.5126 23.1111 90.4443 23.1111H39.3335C32.5941 23.1111 27.1111 28.5941 27.1111 35.3335C27.1111 42.0728 32.5941 47.5555 39.3335 47.5555H77.1111C78.5845 47.5555 79.9974 48.141 81.0396 49.1826L92.1508 60.2938C94.3202 62.4632 94.3202 65.9812 92.1508 68.1506C91.0656 69.2352 89.6442 69.7777 88.2222 69.7777Z" fill="white"/>
 <path d="M50.4444 35.3312C50.4444 37.7857 48.4548 39.7758 45.9999 39.7758C43.5454 39.7758 41.5554 37.7857 41.5554 35.3312C41.5554 32.8767 43.5454 30.8867 45.9999 30.8867C48.4548 30.8867 50.4444 32.8767 50.4444 35.3312Z" fill="white"/>
 <path d="M65.9999 35.3312C65.9999 37.7857 64.0102 39.7758 61.5554 39.7758C59.1009 39.7758 57.1108 37.7857 57.1108 35.3312C57.1108 32.8767 59.1009 30.8867 61.5554 30.8867C64.0102 30.8867 65.9999 32.8767 65.9999 35.3312Z" fill="white"/>
 <path d="M81.5558 35.3312C81.5558 37.7857 79.5661 39.7758 77.111 39.7758C74.6568 39.7758 72.6667 37.7857 72.6667 35.3312C72.6667 32.8767 74.6568 30.8867 77.111 30.8867C79.5661 30.8867 81.5558 32.8767 81.5558 35.3312Z" fill="white"/>
 </g>
 <defs>
 <filter id="filter0_d_120_4263" x="0" y="0" width="112" height="89.7778" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
 <feFlood flood-opacity="0" result="BackgroundImageFix"/>
 <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
 <feOffset dy="4"/>
 <feGaussianBlur stdDeviation="8"/>
 <feComposite in2="hardAlpha" operator="out"/>
 <feColorMatrix type="matrix" values="0 0 0 0 0.929412 0 0 0 0 0.388235 0 0 0 0 0.345098 0 0 0 0.25 0"/>
 <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_120_4263"/>
 <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_120_4263" result="shape"/>
 </filter>
 </defs>
 </svg>
 `

  const CyranoLogo = () => <SvgXml xml={cyrano} width={100} height={80} />

  return <CyranoLogo />
}

export default Logo
