import { View, Text, Pressable, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { styles } from '../styles'
import { useState, useEffect } from 'react'
import Page from '../shared/Page'
import Avatar from '../assets/avatar.png'
import Back from '../assets/arrow-back.svg'

const EventDetails = () => {
  const [finalDate, setFinalDate] = useState('')
  const navigation = useNavigation()
  const route = useRoute()
  const { item, imgDisplay, fullNameDisplay } = route.params

  useEffect(() => {
    if (item) {
      setFinalDate(
        `${new Date(item?.dateDate.seconds * 1000).getMonth()} - ${new Date(
          item?.dateDate.seconds * 1000
        ).getDate()} - ${new Date(item?.dateDate.seconds * 1000).getFullYear()}`
      )
    }
  }, [item])

  return (
    <Page>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('Event History', {
              item,
              imgDisplay,
              fullNameDisplay,
            })
          }
        >
          <Image source={Back} style={{ width: 20, height: 20 }} />
        </Pressable>
        <Text>{item?.eventName}</Text>
        <View>
          {item?.loveStyleTag.map((i, index) => (
            <Text key={index}>{i}</Text>
          ))}
        </View>
        <Text>
          With:
          {imgDisplay ? (
            <Image
              source={imgDisplay}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                marginRight: 10,
              }}
            />
          ) : (
            <Image
              source={Avatar}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                marginRight: 10,
              }}
            />
          )}
          {fullNameDisplay}
        </Text>
        <View>
          <Text>DATE AND TIME</Text>
          <Text>
            {finalDate} @ {item?.dateTime}
          </Text>
        </View>
        <View>
          <Text>LOCATION</Text>
          <Text>{item?.datePlace}</Text>
          <Text>Get Directions</Text>
        </View>
        <View>
          <Text>ADDITIONAL NOTES</Text>
          <Text>{item?.additionalComments}</Text>
        </View>

        <View style={[styles.headingPlusBtn, styles.h1Gap, styles.mb16]}>
          <Pressable
            style={[styles.button, styles.buttonGrey, styles.center]}
            onPress={() =>
              navigation.navigate('Edit Event', {
                item,
                imgDisplay,
                fullNameDisplay,
              })
            }
          >
            <Text
              style={[
                styles.button__text,
                styles.buttonGrey__text,
                styles.superBold,
              ]}
            >
              EDIT EVENT DETAILS
            </Text>
          </Pressable>
        </View>
      </View>
    </Page>
  )
}

export default EventDetails
