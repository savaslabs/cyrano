import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { RelationshipProvider } from './context/RelationshipContext'
import { StyleSheet } from 'react-native'

export default function App() {
  return (
    <RelationshipProvider style={styles.pageWrapper}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RelationshipProvider>
  )
}

const styles = StyleSheet.create({
  pageWrapper: {
    maxWidth: 700,
  },
})
