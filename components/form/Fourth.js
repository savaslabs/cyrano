import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect, createElement } from 'react'
import { RadioButton } from 'react-native-paper'
import { styles } from '../../styles'
import Stars from '../../shared/Stars'

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

  const DatePicker = () => {
    return createElement('input', {
      type: 'date',
      value: lastTimeDate,
      onChange: (event) => {
        setLastTimeDate(new Date(event.target.value))
      },
      placeholder: 'Select a date',
      style: {
        height: 56,
        marginBottom: 16,
        fontSize: 17,
        border: '1px solid rgb(199, 203, 217)',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 4,
        color: 'rgba(51, 55, 75, 1)',
        marginTop: -8,
        flexGrow: 1,
        fontFamily: 'sans-serif',
      },
    })
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View>
        <Text style={[styles.p, styles.alignLeft]}>
          When was the last time you went on a date with {name}?
        </Text>
        <DatePicker style={styles.form__date} />
      </View>
      <View>
        <Text style={[styles.p, styles.alignLeft]}>
          Where did you go? / What did you do?
        </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.form__textArea}
          placeholder="Describe where your date took place and what kind of activities you did"
          placeholderTextColor="#c7cbd9"
          value={datePlace}
          onChangeText={(newDatePlace) => setDatePlace(newDatePlace)}
        />
      </View>
      <View>
        <Text style={[styles.p, styles.alignLeft]}>
          How would you rate the date?
        </Text>
        <Stars />
        {/* <RadioButton.Group
          onValueChange={(newDateRating) => setDateRating(newDateRating)}
          value={dateRating}
        >
          <View style={styles.row}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>1</Text>
              <RadioButton value="1" color="#33374B" uncheckedColor="#33374B" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>2</Text>
              <RadioButton value="2" color="#33374B" uncheckedColor="#33374B" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>3</Text>
              <RadioButton value="3" color="#33374B" uncheckedColor="#33374B" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>4</Text>
              <RadioButton value="4" color="#33374B" uncheckedColor="#33374B" />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.text}>5</Text>
              <RadioButton value="5" color="#33374B" uncheckedColor="#33374B" />
            </View>
          </View>
        </RadioButton.Group> */}
      </View>
    </Animated.View>
  )
}

export default Fourth
