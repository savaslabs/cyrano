import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
} from 'react-native'
import { useRef, useEffect, useState } from 'react'
import StarRating from 'react-native-star-rating-widget'
import Page from '../shared/Page'

const RelationshipCheckIn = () => {
  const [dateRating, setDateRating] = useState('')
  const [relationshipRating, setRelationshipRating] = useState('')
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Page>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.container}>
          <Text>Relationship Check-in</Text>

          <View>
            <Text style={styles.label}>
              How would you say your relationship with Amber is going?
            </Text>
            <StarRating
              rating={dateRating}
              onChange={setDateRating}
              color="#7B82A2"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Are there any details you want to remember about this rating?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              placeholderTextColor="rgba(51,55,75,0.5)"
            />
          </View>

          <Pressable style={styles.button}>
            <Text>SUBMIT</Text>
          </Pressable>
        </View>
      </Animated.View>
    </Page>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#33374B',
    fontWeight: '700',
    fontSize: 16,
    paddingLeft: 10,
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#33374B',
    paddingTop: 5,
  },
  button: {
    backgroundColor: '#EF6E62',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 65,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    opacity: '1',
    width: '70%',
    alignSelf: 'center',
  },
  disabled: {
    opacity: '0.5',
  },
})

export default RelationshipCheckIn
