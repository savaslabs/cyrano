import { View, Text, StyleSheet, TextInput, Animated, Image } from 'react-native'
import { useRef, useEffect } from 'react'
import PhoneIcon from '../../assets/phone.png'
import EmailIcon from '../../assets/email.png'

const Third = ({ name, phone, setPhone, email, setEmail }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View>
        <Text style={styles.label}>Phone</Text>
        <Image source={PhoneIcon} width={30} height={30} />
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(51,55,75,0.5)"
          placeholder="(555) 123-4567"
          value={phone}
          onChangeText={(newPhone) => setPhone(newPhone)}
        />
      </View>
      <View>
        <Text style={styles.label}>Email</Text>
        <Image source={EmailIcon} width={30} height={30} />
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(51,55,75,0.5)"
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#33374B',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 10,
  },
  labelWithMargin: {
    marginTop: 31,
  },
  input: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
    width: '100%',
  },
  dropdown: {
    height: 0,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 65,
    opacity: '1',
    width: '35%',
    position: 'absolute',
    right: 0,
    bottom: 25,
  },
  disabled: {
    opacity: '0.5',
  },
})

export default Third
