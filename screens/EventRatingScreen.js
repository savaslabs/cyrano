import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Pressable,
} from 'react-native'
import { useRef, useEffect, useState } from 'react'
import Card from '../shared/Card'
import StarRating from 'react-native-star-rating-widget'
import Page from '../shared/Page'

const EventRatingScreen = () => {
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
          <Text>Event Rating</Text>
          <Card>
            <Text>Dinner Date with Amber</Text>
            <Card>
              <Text>Activity</Text>
            </Card>
            <Card>
              <Text>Financial</Text>
            </Card>
            <Text>Friday, Jan 26, 2023 @ 8 pm</Text>
          </Card>

          <View>
            <Text style={styles.label}>
              How would you rate your dinner date with Amber?
            </Text>
            <View>
              <StarRating
                rating={dateRating}
                onChange={setDateRating}
                color="#7B82A2"
              />
            </View>
          </View>

          <View>
            <Text style={styles.label}>What was a highlight?</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.input}
              placeholderTextColor="rgba(51,55,75,0.5)"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Were there any lowlights or challenges?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.input}
              placeholderTextColor="rgba(51,55,75,0.5)"
            />
          </View>

          <View>
            <Text style={styles.label}>
              Any other notes regarding the recommendation?
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.input}
              placeholderTextColor="rgba(51,55,75,0.5)"
            />
          </View>

          <View>
            <Text style={styles.label}>
              How would you rate your overall relationship with Amber after this
              event?
            </Text>
            <StarRating
              rating={relationshipRating}
              onChange={setRelationshipRating}
              color="#7B82A2"
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

export default EventRatingScreen
