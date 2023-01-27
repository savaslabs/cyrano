import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'

const Fourth = ({
  lastTimeDate,
  setLastTimeDate,
  datePlace,
  setDatePlace,
  name,
  dateRating,
  setDateRating,
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
        <Text style={styles.label}>
          When was the last time you went on a date with {name}?
        </Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          placeholder="2 - 23 - 2003"
          value={lastTimeDate}
          onChangeText={(newLastTimeDate) => setLastTimeDate(newLastTimeDate)}
        />
      </View>
      <View>
        <Text style={styles.label}>Where did you go? / What did you do?</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          value={datePlace}
          onChangeText={(newDatePlace) => setDatePlace(newDatePlace)}
        />
      </View>
      <View>
        <Text style={styles.label}>How would you rate the date?</Text>
        <RadioButton.Group
          onValueChange={(value) => setDateRating(value)}
          value={dateRating}
        >
          <View style={styles.row}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>1</Text>
              <RadioButton value="1" color="#ED5244" uncheckedColor="#ED5244" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>2</Text>
              <RadioButton value="2" color="#ED5244" uncheckedColor="#ED5244" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>3</Text>
              <RadioButton value="3" color="#ED5244" uncheckedColor="#ED5244" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>4</Text>
              <RadioButton value="4" color="#ED5244" uncheckedColor="#ED5244" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>5</Text>
              <RadioButton value="5" color="#ED5244" uncheckedColor="#ED5244" />
            </View>
          </View>
        </RadioButton.Group>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#ED5244',
    paddingTop: 5,
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 65,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    opacity: '1',
    width: '70%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default Fourth
