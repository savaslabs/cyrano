import StarRating from 'react-native-star-rating-widget'
import { useState, useEffect } from 'react'

const RelationshipRating = ({ relationshipRating }) => {
  const [starRating, setStarRating] = useState('')

  useEffect(() => {
    if (relationshipRating) {
      setStarRating(relationshipRating)
    }
  }, [relationshipRating])

  return (
    <StarRating rating={starRating} onChange={setStarRating} color="#7B82A2" style={{pointerEvents: 'none'}}/>
  )
}

export default RelationshipRating
