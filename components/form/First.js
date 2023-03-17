import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const First = ({
  name,
  setName,
  lastName,
  setLastName,
  openRelationship,
  setOpenRelationship,
  relationshipItems,
  setRelationshipItems,
  relationshipValue,
  setRelationshipValue,
  pronounsValue,
  setPronounsValue,
  openPronouns,
  setOpenPronouns,
  pronounsItem,
  setPronounsItem,
  location,
  setLocation,
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
      <View style={styles.row}>
        <View style={{width: '50%'}}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Their first name"
            placeholderTextColor="rgba(51,55,75,0.5)"
            value={name}
            onChangeText={(newName) => setName(newName)}
          />
        </View>
        <View style={{width: '50%'}}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Their last name"
            placeholderTextColor="rgba(51,55,75,0.5)"
            value={lastName}
            onChangeText={(newLastName) => setLastName(newLastName)}
          />
        </View>
      </View>
      <View style={{ zIndex: 2 }}>
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
          placeholderStyle={{ color: 'rgba(51,55,75,0.5)' }}
          dropDownContainerStyle={{
            margin: 'auto',
            color: '#33374B',
            borderColor: '#33374B',
            zIndex: '10000',
            width: '90%',
            height: 160,
            bottom: -147,
            left: 13,
          }}
          labelStyle={{
            color: '#33374B',
          }}
          listItemLabelStyle={{
            color: '#33374B',
          }}
          disabledItemLabelStyle={{
            color: 'rgba(51,55,75,0.5)',
          }}
        />
      </View>
      <View style={{ zIndex: 1 }}>
        <Text style={styles.label}>Partner Pronouns</Text>
        <DropDownPicker
          open={openPronouns}
          value={pronounsValue}
          items={pronounsItem}
          setOpen={setOpenPronouns}
          setValue={setPronounsValue}
          setItems={setPronounsItem}
          style={styles.dropdown}
          placeholder="Select a pronouns"
          placeholderStyle={{ color: 'rgba(51,55,75,0.5)' }}
          dropDownContainerStyle={{
            margin: 'auto',
            color: '#33374B',
            borderColor: '#33374B',
            zIndex: '10000',
            width: '90%',
            height: 160,
            bottom: -147,
            left: 13,
          }}
          labelStyle={{
            color: '#33374B',
          }}
          listItemLabelStyle={{
            color: '#33374B',
          }}
          disabledItemLabelStyle={{
            color: 'rgba(51,55,75,0.5)',
          }}
        />
      </View>
      <View>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Miami, FL"
          placeholderTextColor="rgba(51,55,75,0.5)"
          value={location}
          onChangeText={(newLocation) => setLocation(newLocation)}
        />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#33374B',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
  },
  form: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
  },
  dropdown: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#33374B',
    borderRadius: 5,
    color: '#33374B',
    width: '94%',
    minHeight: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default First
