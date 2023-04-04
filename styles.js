import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  pageTopPadding: {
    paddingTop: 56
  },  
  page__logo: {
    width: 128,
    minHeight: 128,
    flex: 1,
    justifyContent: 'center',
    top: -24,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '1px solid rgba(245, 151, 132, 1)',
    borderRadius: 4,
    backgroundColor: '#ffffff'
  },
  page__content: {
    width: '100%',
    maxWidth: 440,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  page__upper: {
    paddingBottom: 26
  },
  page__lower: {
    flex: 1,
    gap: 32,
    textAlign: 'center',
    paddingTop: 42,
  },
  logo: {
    width: 85,
    height: 62,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  xl: {
    color: '#33374B',
    fontSize: 40,
    fontWeight: '700',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 6
  },
  h1: {
    color: '#33374B',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  h1Gap: {
    marginTop: 64
  },
  h2: {
    color: '#33374B',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  h5: {
    color: '#586187',
    fontSize: 11,
    fontWeight: 900,
    marginBottom: 4
  },
  p: {
    color: '#33374B',
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 17
  },
  smallerText: {
    color: 'rgba(51, 55, 75, .75)',
    fontSize: 15,
    flex: 1,
    flexWrap: 'wrap',
    marginBottom: 15
  },
  starRating: {
    marginHorizontal: 'auto',
    paddingVertical: 8
  },
  form__twoCol: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
  },
  form__col: {
    flex: 1
  },
  form__label: {
    color: 'rgba(88, 97, 135, 1)',
    fontSize: 13,
    top: 8,
    left: 8,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    zIndex: 9999,
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 12
  },
  form__input: {
    height: 56,
    marginBottom: 16,
    border: '1px solid rgba(199, 203, 217, 1)',
    padding: 16,
    borderRadius: 4,
    color: 'rgba(51, 55, 75, 1)',
    marginTop: -8,
    flexGrow: 1,
    fontSize: 17
  },
  form__textArea: {
    height: 76,
    marginBottom: 16,
    border: '1px solid rgba(199, 203, 217, 1)',
    padding: 16,
    borderRadius: 4,
    color: 'rgba(51, 55, 75, 1)',
    marginTop: -8,
    flexGrow: 1,
    fontSize: 17
  },
  form__select: {
    height: 56,
    marginBottom: 16,
    borderColor: 'rgba(199, 203, 217, 1)',
    paddingLeft: 8,
    paddingRight: 16,
    borderRadius: 4,
    color: 'rgba(51, 55, 75, 1)',
    marginTop: -8,
    flexGrow: 1,
    fontSize: 17
  },
  imgContainer: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
  paginationBtns: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgba(88, 97, 135, 1)',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 36,
    paddingLeft: 36,
    borderRadius: 60,
    textAlign: 'center',
    margin: 'auto',
  },
  button__text: {
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 24.5
  },
  buttonGrey: {
    backgroundColor: 'rgba(241, 242, 246, 1)',
    marginLeft: 0
  },
  buttonGrey__text: {
    color: 'rgba(51, 55, 75, 1)'
  },
  textLink: {
    fontSize: 15,
    color: 'rgba(51,55,75,0.75)',
    textAlign: 'center',
    paddingTop: 16,
    textDecorationLine: 'underline'
  },
  buttonNext: {
    marginRight: 0
  },
  disabled: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(199, 203, 217, 1)',
  },
  disabled__text: {
    color: 'rgba(199, 203, 217, 1)'
  },
  fixedWidth: {
    width: 235
  },
  googleButton: {
    textAlign: 'center',
    margin: 'auto',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16
  },
  googleButton__logo: {
    height: 18,
    width: 18
  },
  googleButton__text: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
    maxWidth: 145,
    margin: 'auto',
    paddingLeft: 16,
    fontWeight: 500
  },
  relationshipHeading:  {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'space-between'
  },
  relationshipHeading__text: {
    maxWidth: 'calc(100% - 128px)'
  },
  camera: {
    width: 104,
    height: 104,
    border: '1px solid rgba(199, 203, 217, 1)',
    position: 'relative',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  cameraRemoveBorder: {
    borderWidth: 'none',
  },
  camera__img: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: '50%',
  },
  dots: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    paddingTop: 36,
    paddingBottom: 18,
    zIndex: -1,
    justifyContent: 'center'
  },
  dots__dot: {
    borderWidth: 1,
    borderColor: '#586187',
    borderRadius: '100%',
    width: 10,
    height: 10,
    marginRight: 10,
  },
  dots__active: {
    backgroundColor: '#586187',
  },
  confirmation: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  confirmation__icon: {
    width: 32,
    height: 32
  },
  confirmation__text: {
    color: 'rgba(88, 97, 135, 1)'
  },
  greybox: {
    borderColor: '#C7CBD9',
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    alignItems: 'center',
    padding: 16
  },
  greyboxLarge: {
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  greybox__pair: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap'
  },
  ratingCard: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center'
  },
  ratingCard__text: {
    flexGrow: 1,
    textAlign: 'center'
  },
  ratingCard__button: {
    padding: 16,
    fontSize: 15,
    fontFamily: 'sans-serif',
    borderSize: 1,
    borderColor: '#C7CBD9',
    backgroundColor: '#F1F2F6',
    color: '#33374B',
    maxWidth: 214,
    textAlign: 'center',
    borderRadius: 60
  },
  location: {
    flexGrow: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center'
  },
  location__icon: {
    width: 15,
    height: 22
  },
  location__text: {
    color: 'rgba(51,55,75,0.75)',
    fontSize: 13
  },
  headingPlusBtn: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  addBtn: {
    backgroundColor: '#F1F2F6',
    maxWidth: 48,
    height: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%'
  },
  addBtn__icon: {
    width: 32,
    height: 32
  },
  underline: {
    textDecorationLine: 'underline'
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  alignLeft: {
    alignSelf: 'flex-start',
    textAlign: 'left'
  },
  vertCenter: {
    alignItems: 'center'
  },
  superBold: {
    fontWeight: 800
  },
  mb0: {
    marginBottom: 0
  },
  mb16: {
    marginBottom: 16
  }
})

export { styles }
