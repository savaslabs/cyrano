import { Pressable } from 'react-native'
import Card from '../shared/Card'

const LoveStyleFilter = ({ tag, setFilteredRel, relationshipEvents }) => {
  const handleFilter = (tag) => {
    const newData = relationshipEvents.filter((item) => {
      return item.loveStyleTag.some((i) => i === tag)
    })

    setFilteredRel(newData)
  }

  return (
    <Pressable onPress={() => handleFilter(tag)}>
      <Card>{tag}</Card>
    </Pressable>
  )
}

export default LoveStyleFilter
