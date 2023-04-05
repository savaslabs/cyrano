import { Pressable } from 'react-native'
import Card from '../shared/Card'
import { styles } from '../styles'

const LoveStyleFilter = ({ tag, setFilteredRel, relationshipEvents }) => {
  const handleFilter = (tag) => {
    const newData = relationshipEvents.filter((item) => {
      return item.loveStyleTag.some((i) => i === tag)
    })

    setFilteredRel(newData)
  }

  return (
    <Pressable style={styles.loveStyleTags__tag} onPress={() => handleFilter(tag)}>
      {tag}
    </Pressable>
  )
}

export default LoveStyleFilter
