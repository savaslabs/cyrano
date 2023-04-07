import { Pressable, Text } from 'react-native'
import { styles } from '../styles'
import { useEffect } from 'react'

const LoveStyleFilter = ({
  tag,
  setFilteredRel,
  relationshipEvents,
  setShowError,
  filteredRel,
}) => {
  const handleFilter = (tag) => {
    const newData = relationshipEvents.filter((item) => {
      return item.loveStyleTag.some((i) => i === tag)
    })

    setFilteredRel(newData)
  }

  useEffect(() => {
    if (filteredRel === undefined) {
      setShowError(false)
    } else if (filteredRel.length > 0) {
      setShowError(false)
    } else if (filteredRel.length === 0) {
      setShowError(true)
    }
  }, [filteredRel])

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
