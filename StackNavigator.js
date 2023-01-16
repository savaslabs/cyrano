import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import RelationshipsHomeScreen from './screens/RelationshipsHomeScreen'
import AddRelationship from './screens/AddRelationship'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const user = true

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Relationships"
            component={RelationshipsHomeScreen}
          />
          <Stack.Screen name="Add" component={AddRelationship} />
        </>
      ) : (
        ''
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
