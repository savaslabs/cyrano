import { View, Text, StyleSheet, TextInput, Animated, Image } from 'react-native'
import { useRef, useEffect } from 'react'
import PhoneIcon from '../../assets/phone.png'
import EmailIcon from '../../assets/email.png'
import { styles } from '../../styles'

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
    <Animated.View style={{ opacity: fadeAnim, marginBottom: 16 }}>
      <View>
        <Text style={styles.form__label}>Phone</Text>
        {/* <Image source={PhoneIcon} width={30} height={30} /> */}
        <TextInput
          style={styles.form__input}
          placeholderTextColor="#c7cbd9"
          placeholder="(555) 123-4567"
          value={phone}
          onChangeText={(newPhone) => setPhone(newPhone)}
        />
      </View>
      <View>
        <Text style={styles.form__label}>Email</Text>
        {/* <Image source={EmailIcon} width={30} height={30} /> */}
        <TextInput
          style={styles.form__input}
          placeholderTextColor="#c7cbd9"
          placeholder="Enter email address"
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
        />
      </View>
    </Animated.View>
  )
}

export default Third
