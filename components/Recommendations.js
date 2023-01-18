import { View, Text, Image } from 'react-native'
import Hand from '../assets/hand.svg'

const Recommendations = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={Hand}
        style={{ width: '18px', height: '24px', marginRight: '15px' }}
      />
      <Text style={{ color: '#EF6E62', fontSize: '16px', fontWeight: '400' }}>
        Recommendations
      </Text>
    </View>
  )
}

export default Recommendations
