import { View, Text, StyleSheet } from 'react-native'

const LifeEvents = ({ birthday, anniversary }) => {
  return (
    <View>
      <Text style={{ color: '#EF6E62', fontSize: 16, fontWeight: '700' }}>
        Important Life Events
      </Text>
      {/* <View style={styles.eventsContainer}>
        <View>
          <Text style={styles.title}>Birthday</Text>
          <Text style={styles.text}>{birthday}</Text>
        </View>
        <View>
          <Text style={styles.title}>Anniversary</Text>
          <Text style={styles.text}>{anniversary}</Text>
        </View>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  eventsContainer: {
  },
  text: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 10,
  },
  title: {
    color: '#EF6E62',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 10,
  },
})

export default LifeEvents
