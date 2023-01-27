import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'
import { RadioButton } from 'react-native-paper'

const Second = ({
  birthday,
  setBirthday,
  anniversary,
  setAnniversary,
  relationshipValue,
  relationshipRating,
  setRelationshipRating,
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
      {relationshipValue === 'Romantic' && (
        <>
          <View>
            <Text style={styles.label}>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="4 - 26 - 1933"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={birthday}
              onChangeText={(newBirthday) => setBirthday(newBirthday)}
            />
          </View>
          <View>
            <Text style={styles.label}>Anniversary</Text>
            <TextInput
              style={styles.input}
              placeholder="10 - 26 - 1988"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={anniversary}
              onChangeText={(newAnniversary) => setAnniversary(newAnniversary)}
            />
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
                  <RadioButton value="1" color="#ED5244" uncheckedColor='#ED5244'/>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>2</Text>
                  <RadioButton value="2" color="#ED5244" uncheckedColor='#ED5244' />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>3</Text>
                  <RadioButton value="3" color="#ED5244" uncheckedColor='#ED5244' />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>4</Text>
                  <RadioButton value="4" color="#ED5244" uncheckedColor='#ED5244' />
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>5</Text>
                  <RadioButton value="5" color="#ED5244" uncheckedColor='#ED5244' />
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
})

export default Second
