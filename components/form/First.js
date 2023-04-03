import { View, Text, StyleSheet, TextInput, Animated } from 'react-native'
import { useRef, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from '../../styles'

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
      <View style={styles.form__twoCol}>
        <View style={styles.form__col}>
          <Text style={styles.form__label}>First Name</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Their first name"
            placeholderTextColor="#c7cbd9"
            value={name}
            onChangeText={(newName) => setName(newName)}
          />
        </View>
        <View style={styles.form__col}>
          <Text style={styles.form__label}>Last Name</Text>
          <TextInput
            style={styles.form__input}
            placeholder="Their last name"
            placeholderTextColor="#c7cbd9"
            value={lastName}
            onChangeText={(newLastName) => setLastName(newLastName)}
          />
        </View>
      </View>
      <View style={{ zIndex: 2 }}>
        <Text style={styles.form__label}>Relationship Type</Text>
        <DropDownPicker
          open={openRelationship}
          value={relationshipValue}
          items={relationshipItems}
          setOpen={setOpenRelationship}
          setValue={setRelationshipValue}
          setItems={setRelationshipItems}
          style={styles.form__select}
          placeholder="Select a relationship type"
          placeholderStyle={{ color: '#c7cbd9', paddingLeft: 4, fontSize: 17 }}
          selectedTextStyle={{ color: 'rgba(51, 55, 75, 1)', paddingLeft: 4, fontSize: 17 }}
          dropDownContainerStyle={{
            margin: 'auto',
            color: '#33374B',
            zIndex: '10000',
            height: 160,
            bottom: -135,
            borderColor: 'rgba(199, 203, 217, 1)',
            paddingLeft: 4,
            fontSize: 17
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
        <Text style={styles.form__label}>Partner Pronouns</Text>
        <DropDownPicker
          open={openPronouns}
          value={pronounsValue}
          items={pronounsItem}
          setOpen={setOpenPronouns}
          setValue={setPronounsValue}
          setItems={setPronounsItem}
          style={styles.form__select}
          placeholder="Select pronouns"
          placeholderStyle={{ color: '#c7cbd9', paddingLeft: 4, fontSize: 17 }}
          dropdownStyle={{
            paddingLeft: 30
          }}
          dropDownContainerStyle={{
            margin: 'auto',
            color: '#33374B',
            zIndex: '10000',
            borderColor: 'rgba(199, 203, 217, 1)',
            height: 120,
            bottom: -95,
            paddingLeft: 8,
            fontSize: 17
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
        <Text style={styles.form__label}>Location</Text>
        <TextInput
          style={styles.form__input}
          placeholder="Miami, FL"
          placeholderTextColor="#c7cbd9"
          value={location}
          onChangeText={(newLocation) => setLocation(newLocation)}
        />
      </View>
    </Animated.View>
  )
}

export default First
