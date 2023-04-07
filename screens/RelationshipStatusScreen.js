import { useRoute, useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useState } from 'react'
import { useEffect } from 'react'
import RelationshipRating from '../components/RelationshipRating'
import { View, Text } from 'react-native-web'
import { styles } from '../styles'
import StarRating from 'react-native-star-rating-widget'


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
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={styles.page__upper}>
              <Text style={[styles.h1, styles.alignLeft]}>Relationship Rating</Text>
              <Text style={{fontSize: 17}}>From your most recent check in</Text>
              <StarRating rating={rating}
                color="#7B82A2" 
                starStyle={{marginLeft: 0, marginRight: 0, marginTop: 32}}
                starSize="52"
                style={{pointerEvents: 'none', marginHorizontal: 'auto'}}/>
            </View>
            <View>
              <Text style={[styles.h4, {fontSize: 17}]}>Comments: </Text>
              <Text style={{fontSize: 17}}>{comments}</Text>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default RelationshipStatusScreen
