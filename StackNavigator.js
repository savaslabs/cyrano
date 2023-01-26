import { useState, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import RelationshipsHomeScreen from './screens/RelationshipsHomeScreen'
import AddRelationShipScreen from './screens/AddRelationshipScreen'
import RelationshipScreen from './screens/RelationshipScreen'
import SendMessageScreen from './screens/SendMessageScreen'
import RelationshipContext from './context/RelationshipContext'
import BookCyrano from './screens/BookCyrano'
import LoveStylesScreen from './screens/LoveStylesScreen'
import LifeEventsScreen from './screens/LifeEventsScreen'
import DateLogScreen from './screens/DateLogScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } = useContext(RelationshipContext)

  const { isLoggedIn } = user

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Add" component={AddRelationShipScreen} />
          <Stack.Screen
            name="Relationships"
            component={RelationshipsHomeScreen}
          />

          <Stack.Screen name="Relationship" component={RelationshipScreen} />
          <Stack.Screen name="Send" component={SendMessageScreen} />
          <Stack.Screen name="Book" component={BookCyrano} />
          <Stack.Screen name="LoveStyle" component={LoveStylesScreen} />
          <Stack.Screen name="LifeEvents" component={LifeEventsScreen} />
          <Stack.Screen name="DateLog" component={DateLogScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
