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

const Third = ({
  openTruty,
  setOpenTruty,
  trutyValue,
  setTrutyValue,
  trutyItems,
  setTrutyItems,
  openLoveStyle,
  setOpenLoveStyle,
  loveStyleValue,
  setloveStyleValues,
  loveStyleItems,
  setloveStyleItems,
  phone,
  setPhone,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isDisabled, setIsDisabled] = useState(true)
  const [showLoveStyles, setShowLoveStyles] = useState('none')

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  useEffect(() => {
    if (phone) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
    //eslint-disable-next-line
  })

  const handlePress = () => {
    setShowLoveStyles('flex')
    setPhone('')
    setIsDisabled(true)
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <>
        <Text style={styles.label}>Have you taken the truty love test?</Text>
        <DropDownPicker
          open={openTruty}
          value={trutyValue}
          items={trutyItems}
          setOpen={setOpenTruty}
          setValue={setTrutyValue}
          setItems={setTrutyItems}
          style={styles.dropdown}
          placeholder="Rate your relationship"
          placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
          dropDownContainerStyle={{
            top: 52,
            left: 12,
            margin: 'auto',
            color: '#EF6E62',
            borderColor: '#ED5244',
            zIndex: '2000',
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

      {trutyValue === 'Yes' && (
        <>
          <Text style={styles.label}>Select your Love Styles</Text>
          <DropDownPicker
            open={openLoveStyle}
            value={loveStyleValue}
            items={loveStyleItems}
            setOpen={setOpenLoveStyle}
            setValue={setloveStyleValues}
            setItems={setloveStyleItems}
            style={styles.dropdown}
            placeholder="Choose up to three"
            placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
            dropDownContainerStyle={{
              top: 52,
              left: 12,
              margin: 'auto',
              color: '#EF6E62',
              borderColor: '#ED5244',
              zIndex: '100000',
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
            multiple={true}
            mode="BADGE"
            badgeDotColors="#ED5244"
            max={3}
          />
        </>
      )}
      {trutyValue === 'No' && (
        <>
    
            <Text style={styles.label}>Enter phone Number</Text>
            <View style={{position:'relative'}}>
              <TextInput
                style={styles.input}
                placeholder="1 (555) 123-4567"
                value={phone}
                onChangeText={(newPhone) => setPhone(newPhone)}
                placeholderTextColor="rgba(255,255,255, 0.5)"
              />
              <Pressable
                style={[styles.button, isDisabled ? styles.disabled : '']}
                onPress={handlePress}
                disabled={isDisabled}
              >
                <Text style={styles.text}>Text the link</Text>
              </Pressable>
            </View>


          <View style={{ display: showLoveStyles }}>
            <Text style={styles.label}>Select your Love Styles</Text>
            <DropDownPicker
              open={openLoveStyle}
              value={loveStyleValue}
              items={loveStyleItems}
              setOpen={setOpenLoveStyle}
              setValue={setloveStyleValues}
              setItems={setloveStyleItems}
              style={styles.dropdown}
              placeholder="Choose up to three"
              placeholderStyle={{ color: 'rgba(237,82,68,0.5)' }}
              dropDownContainerStyle={{
                top: 61,
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
              multiple={true}
              mode="BADGE"
              badgeDotColors="#ED5244"
              max={3}
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
    marginTop: 30,
    marginBottom:20,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    padding: 15,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
    width: '100%'
  },
  dropdown: {
    height: 0,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ED5244',
    borderRadius: 5,
    color: '#ED5244',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 65,
    opacity: '1',
    width: '35%',
    position: 'absolute',
    right: 0,
    bottom:25
  },
  disabled: {
    opacity: '0.5',
  },
})

export default Third
