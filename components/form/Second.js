import { View, Text, StyleSheet, TextInput, Animated, Platform } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const Second = ({
  openRelationship,
  setOpenRelationship,
  relationshipItems,
  setRelationshipItems,
  relationshipValue,
  setRelationshipValue,
  anniversary,
  setAnniversary,
  openRelRating,
  setOpenRelRating,
  relRatingItems,
  setRelRatingItems,
  relRatingValue,
  setRelRatingValue,
  
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
      <Text style={styles.label}>Relationship Type</Text>
      <DropDownPicker
        open={openRelationship}
        value={relationshipValue}
        items={relationshipItems}
        setOpen={setOpenRelationship}
        setValue={setRelationshipValue}
        setItems={setRelationshipItems}
        style={styles.dropdown}
        placeholder="Select a relationship type"
        placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
        dropDownContainerStyle={{
          top: 52,
          left: 12,
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
      {relationshipValue === 'Romantic' && (
        <>
          <View>
            <Text style={styles.label}>Anniversary</Text>
            <TextInput
              style={styles.input}
              placeholder="4 - 26 - 1933"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={anniversary}
              onChangeText={(newAnniversary) => setAnniversary(newAnniversary)}
            />
          </View>
          <View  style={{

// The solution: Apply zIndex to any device except Android
...(Platform.OS !== 'android' && {
  zIndex: 100000
})

}}>
            <Text style={styles.label}>
              How would you rate your relationship?
            </Text>
            <DropDownPicker
              open={openRelRating}
              value={relRatingValue}
              items={relRatingItems}
              setOpen={setOpenRelRating}
              setValue={setRelRatingValue}
              setItems={setRelRatingItems}
              style={styles.dropdown}
              placeholder="Rate your relationship"
              placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
              dropDownContainerStyle={{
                top: 160,
                left: 12,
                margin: 'auto',
                color: '#EF6E62',
                borderColor: '#ED5244',
                zIndex: '10000',
                width: '94%',
                height: 200
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
})

export default Second
