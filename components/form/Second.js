import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
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
      {relationshipValue === 'Romantic' && (
        <>
          <View>
            <Text style={styles.label}>Anniversary</Text>
            <TextInput
              style={styles.input}
              placeholder="4 - 26 - 1933"
              keyboardType="numeric"
              placeholderTextColor="rgba(237,82,68,0.5)"
              value={anniversary}
              onChangeText={(newAnniversary) => setAnniversary(newAnniversary)}
            />
          </View>
          <>
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
        </>
      )}
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
})

export default Second
