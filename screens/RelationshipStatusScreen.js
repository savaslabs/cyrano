import { useRoute, useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useState } from 'react'
import { useEffect } from 'react'
import RelationshipRating from '../components/RelationshipRating'
import { View, Text } from 'react-native-web'

const RelationshipStatusScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { rating, comments } = route.params
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (rating || comments) {
      setIsLoading(false)
    }
  }, [rating, comments])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <Text>Relationships Rating</Text>
          <RelationshipRating relationshipRating={rating} />
          <View>
            <Text>Comments: </Text>
            <Text>{comments}</Text>
          </View>
        </Page>
      )}
    </>
  )
}

export default RelationshipStatusScreen
