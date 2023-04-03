import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect, useState, createElement } from 'react'
import { RadioButton } from 'react-native-paper'
import { styles } from '../../styles'
import Stars from '../../shared/Stars'

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
      placeholder: 'Select a date',
      onChange: (event) => {
        setBirthday(new Date(event.target.value))
      },
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
        fontFamily: 'sans-serif'
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
        fontFamily: 'sans-serif'
      },
    })
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {relationshipValue === 'Romantic' && (
        <>
          <View style={styles.form__twoCol}>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Birthday</Text>
              <BirthdayDatePicker style={styles.form__date} />
            </View>
            <View style={styles.form__col}>
              <Text style={styles.form__label}>Anniversary</Text>
              <AnniversaryDatePicker style={styles.form__date} />
            </View>
          </View>
          <View>
            <Text style={[styles.p, styles.alignLeft]}>
              How would you rate your relationship?
            </Text>
            <Text style={[styles.smallerText, styles.alignLeft]}>
              On a scale of 1-5, where 1 is bad and 5 is perfect.
            </Text>
            <Stars />
            {/* <RadioButton.Group
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
            </RadioButton.Group>*/}
          </View>
        </>
      )}
    </Animated.View>
  )
}

export default Second
