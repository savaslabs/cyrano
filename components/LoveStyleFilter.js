import { Pressable, Text } from 'react-native'
import { styles } from '../styles'
import { useEffect, useState } from 'react'

const LoveStyleFilter = ({
  tag,
  setFilteredRel,
  relationshipEvents,
  setShowError,
  filteredRel,
  resetFilterColor,
  setResetFilterColor
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleFilter = (tag) => {
    const newData = relationshipEvents.filter((item) => {
      return item.loveStyleTag.some((i) => i === tag)
    })

    setFilteredRel(newData)
    setIsActive(true)
    setResetFilterColor(false)

    if (isActive) {
      setIsActive(false)
      setFilteredRel(relationshipEvents)
    }
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
      style={[
        styles.loveStyleTags__tag,
        isActive ? { backgroundColor: '#33374B' } : '',
        resetFilterColor && { backgroundColor: '' },
      ]}
      onPress={() => handleFilter(tag)}
    >
      <Text
        style={[
          isActive ? { color: 'white' } : '',
          resetFilterColor && { color: '' },
        ]}
      >
        {tag}
      </Text>
    </Pressable>
  )
}

export default LoveStyleFilter
