import { Pressable, Text } from 'react-native'
import { styles } from '../styles'
import { useState } from 'react'

const LoveStyleFilter = ({
  tag,
  resetFilterColor,
  setFilterPast,
  setFilterUpcoming,
}) => {
  const [isActive, setIsActive] = useState(false)

  const handleFilter = (tag) => {
    if (tag === 'Past') {
      setFilterPast(tag)
      setFilterUpcoming('')
      setIsActive(true)

      if (isActive) {
        setIsActive(false)
        setFilterPast(undefined)
        setFilterUpcoming(undefined)
      }
    } else if (tag === 'Upcoming') {
      setFilterUpcoming(tag)
      setFilterPast('')
      setIsActive(true)

      if (isActive) {
        setIsActive(false)
        setFilterUpcoming(undefined)
        setFilterPast(undefined)
      }
    }
  }

  return (
    <Pressable
      style={[
        styles.loveStyleTags__tag,
        isActive ? { backgroundColor: '#33374B' } : '',
        resetFilterColor && { backgroundColor: '' },
        { marginRight: '10px' },
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
