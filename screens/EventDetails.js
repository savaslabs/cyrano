import { View, Text, Pressable, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { styles } from '../styles'
import { useState, useEffect } from 'react'

const EventDetails = () => {
  const [finalDate, setFinalDate] = useState('')
  const route = useRoute()
  const { item } = route.params

  useEffect(() => {
    if (item) {
      setFinalDate(
        `${new Date(item?.nextDateDate.seconds * 1000).getMonth()} - ${new Date(
          item?.nextDateDate.seconds * 1000
        ).getDate()} - ${new Date(
          item?.nextDateDate.seconds * 1000
        ).getFullYear()}`
      )
    }
  }, [item])

  return (
    <View>
      <Text>{item?.eventName}</Text>
      <View>
        {item?.loveStyleTag.map((i, index) => (
          <Text key={index}>{i}</Text>
        ))}
      </View>
      <Text>
        With:
        {item?.img ? (
          <Image
            source={item?.img}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              marginRight: 10,
            }}
          />
        ) : (
          <Image
            source="https://cedicdiagnostico.com.ar/wp-content/uploads/2020/08/generic-avatar.jpg"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              marginRight: 10,
            }}
          />
        )}
        {item?.fullName}
      </Text>
      <View>
        <Text>DATE AND TIME</Text>
        <Text>
          {finalDate} @ {item?.nextDateTime}
        </Text>
      </View>
      <View>
        <Text>LOCATION</Text>
        <Text>{item?.nextDatePlace}</Text>
        <Text>Get Directions</Text>
      </View>
      <View>
        <Text>ADDITIONAL NOTES</Text>
        <Text>{item?.additionalComments}</Text>
      </View>

      <Pressable>
        <Text>EDIT EVENT DETAILS</Text>
      </Pressable>
    </View>
  )
}

export default EventDetails