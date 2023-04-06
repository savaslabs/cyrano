import { Pressable, Text } from 'react-native'
import { styles } from '../styles'

const LoveStyleFilter = ({ tag, setFilteredRel, relationshipEvents }) => {
  const handleFilter = (tag) => {
    const newData = relationshipEvents.filter((item) => {
      return item.loveStyleTag.some((i) => i === tag)
    })

    setFilteredRel(newData)
  }

  return (
    <Pressable
      style={styles.loveStyleTags__tag}
      onPress={() => handleFilter(tag)}
    >
      <Text>{tag}</Text>
    </Pressable>
  )
}

export default LoveStyleFilter
