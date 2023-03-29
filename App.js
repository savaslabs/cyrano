import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { RelationshipProvider } from './context/RelationshipContext'
import { AuthProvider } from './hooks/useAuth'

export default function App() {
  return (
    <AuthProvider>
      <RelationshipProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </RelationshipProvider>
    </AuthProvider>
  )
}
