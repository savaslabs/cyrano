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
            top: '52px',
            left: '12px',
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
              top: '52px',
              left: '12px',
              margin: 'auto',
              color: '#EF6E62',
              borderColor: '#ED5244',
              zIndex: '1000',
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
          <View>
            <Text style={styles.label}>Enter phone Number</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TextInput
                style={styles.input}
                placeholder="1 (555) 123-4567"
                value={phone}
                onChangeText={(newPhone) => setPhone(newPhone)}
                keyboardType="numeric"
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
                top: '52px',
                left: '12px',
                margin: 'auto',
                color: '#EF6E62',
                borderColor: '#ED5244',
                zIndex: '1000',
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
    width: '70%'
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
    width: '30%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default Third
