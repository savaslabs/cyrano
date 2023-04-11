import { View, Text, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'
import { styles } from '../../styles'
import StarRating from 'react-native-star-rating-widget'
import DatePicker from './DatePicker'

const Fourth = ({
  dateDate,
  setLastTimeDate,
  datePlace,
  setDatePlace,
  name,
  dateRating,
  setDateRating,
  eventName,
  setEventName,
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
        <Text style={[styles.p, styles.alignLeft]}>
          When was the last time you went on a date with {name}?
        </Text>
        <DatePicker
          style={styles.form__date}
          onChange={(e) => setLastTimeDate(e.target.value)}
          onBlur={(e) => setLastTimeDate(e.target.value)}
          value={dateDate}
        />
      </View>
      <View style={styles.form__twoCol}>
        <View style={styles.form__col}>
          <Text style={[styles.p, styles.alignLeft]}>What did you do?</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Short event name"
            placeholderTextColor="#c7cbd9"
            value={eventName}
            onChangeText={(newEvent) => setEventName(newEvent)}
          />
        </View>
        <View style={styles.form__col}>
          <Text style={[styles.p, styles.alignLeft]}>Where did you go?</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Location"
            placeholderTextColor="#c7cbd9"
            value={datePlace}
            onChangeText={(newDatePlace) => setDatePlace(newDatePlace)}
          />
        </View>
      </View>
      <View>
        <Text style={[styles.p, styles.alignLeft]}>
          How would you rate the date?
        </Text>
        <View>
          <StarRating
            rating={dateRating}
            onChange={setDateRating}
            color="#7B82A2"
            starSize="52"
            style={styles.starRating}
          />
        </View>
      </View>
    </Animated.View>
  )
}

export default Fourth
