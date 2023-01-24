import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
} from 'react-native'
import { useRef, useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const Fourth = ({
  openDateRating,
  setOpenDateRating,
  dateRatingValue,
  setDateRatingValue,
  dateRatingItems,
  setDateRatingItems,
  lastTimeDate,
  setLastTimeDate,
  datePlace,
  setDatePlace,
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
        <Text style={styles.label}>Where did you go?/What did you do?</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          placeholder="Tell us what you did or where you go"
          value={datePlace}
          onChangeText={(newDatePlace) => setDatePlace(newDatePlace)}
        />
      </View>
      <>
        <Text style={styles.label}>How would you rate that date?</Text>
        <DropDownPicker
          open={openDateRating}
          value={dateRatingValue}
          items={dateRatingItems}
          setOpen={setOpenDateRating}
          setValue={setDateRatingValue}
          setItems={setDateRatingItems}
          style={styles.dropdown}
          placeholder="Rate your date"
          placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
          dropDownContainerStyle={{
            top: '52px',
            left: '12px',
            margin: 'auto',
            color: '#EF6E62',
            borderColor: '#ED5244',
            zIndex: '10000',
            width: '94%',
          }}
          labelStyle={{
            color: '#ED5244',
          }}
          listItemLabelStyle={{
            color: '#ED5244',
          }}
          disabledItemLabelStyle={{
            color: 'rgba(237,82,68,0.5)',
          }}
        />
      </>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#ED5244',
    fontWeight: '700',
    fontSize: '16px',
    paddingLeft: '10px',
  },
  input: {
    height: '40px',
    margin: '12px',
    borderWidth: '1px',
    padding: '10px',
    borderColor: '#ED5244',
    borderRadius: '5px',
    color: '#ED5244',
  },
  dropdown: {
    height: '40px',
    margin: '12px',
    borderWidth: '1px',
    padding: '10px',
    borderColor: '#ED5244',
    borderRadius: '5px',
    color: '#ED5244',
    minHeight: 'initial',
    width: 'initial',
  },
  text: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: '10px',
    paddingBottom: '10px',
    borderRadius: '65px',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    opacity: '1',
    width: '70%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default Fourth
