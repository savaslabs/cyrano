import { View, StyleSheet } from 'react-native'
import WhiteStar from './WhiteStar'
import BorderStar from './BorderStar'
// import WhiteStar from '../svg/WhiteStar'
// import BorderStar from '../svg/BorderStar'

const RelationshipRating = ({ relationshipRating }) => {
  return (
    <>
      {relationshipRating && relationshipRating === '1' && (
        <View style={styles.ranking}>
          <WhiteStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relationshipRating && relationshipRating === '2' && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relationshipRating && relationshipRating === '3' && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
          <BorderStar />
        </View>
      )}
      {relationshipRating && relationshipRating === '4' && (
        <View style={styles.ranking}>
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <WhiteStar />
          <BorderStar />
        </View>
      )}
      {relationshipRating && relationshipRating === '5' && (
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
