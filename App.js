import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { RelationshipProvider } from './context/RelationshipContext'

export default function App() {
  return (
    <RelationshipProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </RelationshipProvider>
  )
}
