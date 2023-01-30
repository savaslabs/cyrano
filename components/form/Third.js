import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'

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
      <View style={styles.body}>
        <Text style={styles.label}>
          Please enter {name}'s contact information below, and we will forward
          them the Truity Love Styles test
        </Text>
      </View>

      <View>
        <Text style={styles.label}>{name}'s Phone</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          placeholder='(555) 123-4567'
          value={phone}
          onChangeText={(newPhone) => setPhone(newPhone)}
        />
      </View>
      <View>
        <Text style={styles.label}>{name}'s Email</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
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
    color: '#ED5244',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 10,
  },
  input: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
    width: '100%',
  },
  dropdown: {
    height: 0,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
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
