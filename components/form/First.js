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
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          value={name}
          onChangeText={(newName) => setName(newName)}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="rgba(237,82,68,0.5)"
          value={lastName}
          onChangeText={(newLastName) => setLastName(newLastName)}
        />
      </View>
      <View style={{zIndex: 2}}>
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
            margin: 'auto',
            color: '#EF6E62',
            borderColor: '#ED5244',
            zIndex: '10000',
            width: 'calc(100% - 33px)',
            height: 160,
            top:51,
            left: 13
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
    width: '94%',
    minHeight: 0
  },
})

export default First
