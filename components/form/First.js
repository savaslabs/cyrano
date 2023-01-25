import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'

const First = ({
  name,
  setName,
  lastName,
  setLastName,
  birthday,
  setBirthday,
}) => {
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
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          placeholder="Carol"
          value={name}
          onChangeText={(newName) => setName(newName)}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          placeholder="Burnett"
          value={lastName}
          onChangeText={(newLastName) => setLastName(newLastName)}
        />
      </View>
      <View>
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          placeholder="4 - 26 - 1933"
          keyboardType="numeric"
          placeholderTextColor="rgba(237,82,68,0.5)"
          value={birthday}
          onChangeText={(newBirthday) => setBirthday(newBirthday)}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  form: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
})

export default First
