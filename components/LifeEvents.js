import { View, Text, StyleSheet } from 'react-native'

const LifeEvents = ({ birthday }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text style={{ color: '#EF6E62', fontSize: '16px', fontWeight: '400' }}>
        Important Life Events
      </Text>
      <View style={styles.eventsContainer}>
        <View>
          <Text style={styles.title}>Birthday</Text>
          <Text style={styles.text}>{birthday}</Text>
        </View>
        <View>
          <Text style={styles.title}>Anniversary</Text>
          <Text style={styles.text}>8-19-1967</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  text: {
    color: '#EF6E62',
    fontSize: '16px',
    fontWeight: '700',
    paddingTop: '10px',
  },
  title: {
    color: '#EF6E62',
    fontSize: '16px',
    fontWeight: '400',
    paddingTop: '10px',
  },
})

export default LifeEvents
