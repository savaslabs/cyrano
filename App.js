import StackNavigator from './StackNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { RelationshipProvider } from './context/RelationshipContext'
import { AuthProvider } from './hooks/useAuth'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <AuthProvider>
      <RelationshipProvider>
        <NavigationContainer>
          <StackNavigator />
          <Toast />
        </NavigationContainer>
      </RelationshipProvider>
    </AuthProvider>
  )
}
