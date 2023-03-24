import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Dimensions,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const isSmallDevice = Dimensions.get('window').width < 800

const Page = ({ children }) => {
  const navigation = useNavigation()

  return (
    <View style={styles.body}>
      <ImageBackground
        source={isSmallDevice ? '' : require('../assets/cyrano-background.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.container}>
          <View style={[styles.page, isSmallDevice && styles.mobilePage]}>
            {children}
          </View>
          <View style={[styles.footer, isSmallDevice && styles.mobileFooter]}>
            <Text style={styles.footer__text}>
              ©2023 Cyrano App LLC. All rights reserved.
            </Text>
            <View
              style={[
                styles.footer__links,
                isSmallDevice && styles.mobileFooter__links,
              ]}
            >
              <Pressable
                style={styles.footer__link}
                onPress={() => navigation.navigate('Login')}
              >
                <Text>Terms of Use</Text>
              </Pressable>
              <Pressable
                style={styles.footer__link}
                onPress={() => navigation.navigate('Login')}
              >
                <Text>Privacy Policy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    height: '100vh',
  },
  container: {
    width: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  page: {
    flex: 1,
    width: '100%',
    maxWidth: 680,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
    height: 'auto',
    padding: 16,
    paddingTop: 0,
    paddingBottom: 64,
    border: '1px solid rgba(245, 151, 132, 1)',
    borderRadius: 4,
  },
  mobilePage: {
    border: 'none',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 'auto',
    width: '100%',
    maxWidth: 680,
    gap: 12,
    paddingTop: 12,
    flexWrap: 'wrap',
  },
  mobileFooter: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  footer__text: {},
  footer__links: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    textDecorationLine: 'underline',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  mobileFooter__links: {
    justifyContent: 'center',
  },
})

export default Page
