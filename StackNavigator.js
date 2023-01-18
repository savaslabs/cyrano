import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import RelationshipsHomeScreen from './screens/RelationshipsHomeScreen'
import AddRelationShipScreen from './screens/AddRelationshipScreen'
import Relationship from './screens/Relationship'
import SendMessageScreen from './screens/SendMessageScreen'

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
                  <Stack.Screen name="Relationship" component={Relationship} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Relationships"
            component={RelationshipsHomeScreen}
          />
          <Stack.Screen name="Add" component={AddRelationShipScreen} />

          <Stack.Screen name="Send" component={SendMessageScreen} />
        </>
      ) : (
        ''
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
