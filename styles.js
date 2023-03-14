import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 80,
    alignSelf: 'center',
  },
  h1: {
    color: '#33374B',
    fontSize: 32,
    fontWeight: '600',
    paddingBottom: 10,
    alignSelf: 'center',
  },
  h2: {
    color: '#33374B',
    fontSize: 16,
    fontWeight: '400',
    paddingBottom: 20,
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  label: {
    color: '#33374B',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  imgContainer: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
  },
  button: {
    backgroundColor: '#33374B',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 65,
    textAlign: 'center',
    margin: 'auto',
    marginTop: 20,
    shadowColor: '#ed6358',
    shadowOffset: {
      width: '0',
      height: '4',
    },
    shadowOpacity: '0.19',
    shadowRadius: '5.62',
    elevation: '6',
    opacity: '1',
    width: '50%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
  text: {
    color: '#EF6E62',
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  loginContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
    marginRight: 8,
    borderWidth: 1,
  },
  loginImg: {
    width: 32,
    height: 32,
  },
  imgSize: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
})

export { styles }
