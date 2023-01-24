import { View, StyleSheet } from 'react-native'
import WhiteStar from './WhiteStar'
import BorderStar from './BorderStar'

const RelationshipRating = ({ relRatingValue }) => {
  console.log(relRatingValue)
  return (
    <>
      {relRatingValue && relRatingValue === 1 && (
        <View style={styles.ranking}>
          <WhiteStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relRatingValue && relRatingValue === 2 && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relRatingValue && relRatingValue === 3 && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relRatingValue && relRatingValue === 4 && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
        </View>
      )}
      {relRatingValue && relRatingValue === 5 && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  ranking: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default RelationshipRating
