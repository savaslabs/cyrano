import { useRoute, useNavigation } from '@react-navigation/native'
import Page from '../shared/Page'
import Spinner from '../shared/Spinner'
import { useState } from 'react'
import { useEffect } from 'react'
import { View, Text, Pressable, Image } from 'react-native-web'
import { styles } from '../styles'
import StarRating from 'react-native-star-rating-widget'
import Back from '../assets/arrow-back.svg'

const RelationshipStatusScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const {
    rating,
    comments,
    commentsTwo,
    id,
    upcomingEvents,
    imgDisplay,
    fullNameDisplay,
  } = route.params
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (rating || comments || commentsTwo) {
      setIsLoading(false)
    }
  }, [rating, comments, commentsTwo])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Page>
          <View style={[styles.page__content, styles.pageTopPadding]}>
            <View style={styles.page__upper}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Relationship', {
                    id,
                    upcomingEvents,
                    imgDisplay,
                    fullNameDisplay,
                  })
                }

                style={{marginBottom: 16}}
              >
                <Image source={Back} style={{ width: 20, height: 20 }} />
              </Pressable>
              <Text style={[styles.h1, styles.alignLeft]}>
                Relationship Rating
              </Text>
              <Text style={{ fontSize: 17 }}>
                From your most recent check in
              </Text>
              <StarRating
                rating={rating}
                color="#7B82A2"
                starStyle={{ marginLeft: 0, marginRight: 0, marginTop: 32 }}
                starSize="52"
                style={{ pointerEvents: 'none', marginHorizontal: 'auto' }}
              />
            </View>
            <View>
              <Text style={[styles.h4, { fontSize: 17 }]}>
                What is going well in the relationship
              </Text>
              <Text style={{ fontSize: 17, marginBottom: 34 }}>{comments}</Text>
            </View>
            <View>
              <Text style={[styles.h4, { fontSize: 17 }]}>
                What do you want to focus on{' '}
              </Text>
              <Text style={{ fontSize: 17, marginBottom: 17 }}>{commentsTwo}</Text>
            </View>
          </View>
        </Page>
      )}
    </>
  )
}

export default RelationshipStatusScreen
