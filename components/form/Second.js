import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect, useState, createElement } from 'react'
import { RadioButton } from 'react-native-paper'

const Second = ({
  birthday,
  setBirthday,
  anniversary,
  setAnniversary,
  relationshipValue,
  relationshipRating,
  setRelationshipRating,
  name
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const BirthdayDatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: birthday.toISOString().split('T')[0],
      onChange: (event) => {
        setBirthday(new Date(event.target.value))
      },
      style: {
        height: 30,
        padding: 5,
        border: '2px solid #677788',
        borderRadius: 5,
        width: 250,
      },
    })
  }

  const AnniversaryDatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: anniversary.toISOString().split('T')[0],
      onChange: (event) => {
        setAnniversary(new Date(event.target.value))
      },
      style: {
        height: 30,
        padding: 5,
        border: '2px solid #677788',
        borderRadius: 5,
        width: 250,
      },
    })
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {relationshipValue === 'Romantic' && (
        <>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Birthday</Text>
              <BirthdayDatePicker />
            </View>
            <View>
              <Text style={styles.label}>Anniversary</Text>
              <AnniversaryDatePicker />
            </View>
          </View>
          <View>
            <Text style={styles.label}>
              How would you rate your relationship?
            </Text>
            <RadioButton.Group
              onValueChange={(value) => setRelationshipRating(value)}
              value={relationshipRating}
            >
              <View style={styles.row}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>1</Text>
                  <RadioButton
                    value="1"
                    color="#677788"
                    uncheckedColor="#677788"
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>2</Text>
                  <RadioButton
                    value="2"
                    color="#677788"
                    uncheckedColor="#677788"
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>3</Text>
                  <RadioButton
                    value="3"
                    color="#677788"
                    uncheckedColor="#677788"
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>4</Text>
                  <RadioButton
                    value="4"
                    color="#677788"
                    uncheckedColor="#677788"
                  />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>5</Text>
                  <RadioButton
                    value="5"
                    color="#677788"
                    uncheckedColor="#677788"
                  />
                </View>
              </View>
            </RadioButton.Group>
          </View>
        </>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#677788',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#677788',
    borderRadius: 5,
    color: '#677788',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#677788',
    borderRadius: 5,
    color: '#677788',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#677788',
    paddingTop: 5,
  },
})

export default Second
