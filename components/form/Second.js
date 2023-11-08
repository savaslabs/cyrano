import { View, Text, Animated } from 'react-native'
import { useRef, useEffect, useState, createElement } from 'react'
import StarRating from 'react-native-star-rating-widget'
import { styles } from '../../styles'
import DatePicker from './DatePicker'

const Second = ({
  birthday,
  setBirthday,
  anniversary,
  setAnniversary,
  relationshipValue,
  relationshipRating,
  setRelationshipRating,
  name,
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
          <View style={styles.form__twoCol}>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Birthday</Text>
              <DatePicker
                style={styles.form__date}
                onChange={(e) => setBirthday(e.target.value)}
                onBlur={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
            </View>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Anniversary</Text>
              <DatePicker
                style={styles.form__date}
                onChange={(e) => setAnniversary(e.target.value)}
                onBlur={(e) => setAnniversary(e.target.value)}
                value={anniversary}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.p, styles.alignLeft, { marginTop: 16 }]}>
              How would you rate your relationship?
            </Text>
            <Text style={[styles.smallerText, styles.alignLeft]}>
              On a scale of 1-5, where 1 is bad and 5 is perfect.
            </Text>
            <View>
              <StarRating
                rating={relationshipRating}
                onChange={setRelationshipRating}
                starSize="52"
                color="#7B82A2"
                style={styles.starRating}
              />
            </View>
          </View>
        </>
      )}
      {relationshipValue === 'Friend' && (
        <>
          <View style={styles.form__twoCol}>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Birthday</Text>
              <DatePicker
                style={styles.form__date}
                onChange={(e) => setBirthday(e.target.value)}
                onBlur={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.p, styles.alignLeft, { marginTop: 16 }]}>
              How would you rate your relationship?
            </Text>
            <Text style={[styles.smallerText, styles.alignLeft]}>
              On a scale of 1-5, where 1 is bad and 5 is perfect.
            </Text>
            <View>
              <StarRating
                rating={relationshipRating}
                onChange={setRelationshipRating}
                starSize="52"
                color="#7B82A2"
                style={styles.starRating}
              />
            </View>
          </View>
        </>
      )}
      {relationshipValue === 'Family' && (
        <>
          <View style={styles.form__twoCol}>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Birthday</Text>
              <DatePicker
                style={styles.form__date}
                onChange={(e) => setBirthday(e.target.value)}
                onBlur={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.p, styles.alignLeft, { marginTop: 16 }]}>
              How would you rate your relationship?
            </Text>
            <Text style={[styles.smallerText, styles.alignLeft]}>
              On a scale of 1-5, where 1 is bad and 5 is perfect.
            </Text>
            <View>
              <StarRating
                rating={relationshipRating}
                onChange={setRelationshipRating}
                starSize="52"
                color="#7B82A2"
                style={styles.starRating}
              />
            </View>
          </View>
        </>
      )}
      {relationshipValue === 'Business' && (
        <>
          <View style={styles.form__twoCol}>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Birthday</Text>
              <DatePicker
                style={styles.form__date}
                onChange={(e) => setBirthday(e.target.value)}
                onBlur={(e) => setBirthday(e.target.value)}
                value={birthday}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.p, styles.alignLeft, { marginTop: 16 }]}>
              How would you rate your relationship?
            </Text>
            <Text style={[styles.smallerText, styles.alignLeft]}>
              On a scale of 1-5, where 1 is bad and 5 is perfect.
            </Text>
            <View>
              <StarRating
                rating={relationshipRating}
                onChange={setRelationshipRating}
                starSize="52"
                color="#7B82A2"
                style={styles.starRating}
              />
            </View>
          </View>
        </>
      )}
    </Animated.View>
  )
}

export default Second
