import StarRating from 'react-native-star-rating-widget'
import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'


const RelationshipCardRating = ({ relationshipRating }) => {
  const [starRating, setStarRating] = useState('')

  useEffect(() => {
    if (relationshipRating) {
      setStarRating(relationshipRating)
    }
  }, [relationshipRating])

  return (
    <View style={styles.cardRating}> 
        <StarRating rating={starRating} onChange={setStarRating} color="#7B82A2" starSize="20" starStyle={styles.cardRating__star} />
    </View>
  )
}

const styles = StyleSheet.create({
    cardRating: {
        backgroundColor: '#ffffff',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 76,
        pointerEvents: 'none'
    },
    cardRating__star: {
        marginLeft: 0,
        marginRight: 0
    }
})

export default RelationshipCardRating
