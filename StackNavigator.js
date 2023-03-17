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
import LoginScreen from './screens/LoginScreen'
import GoogleCreate from './screens/GoogleCreate'
import AdminDashboard from './screens/AdminDashboard'
import AdminRelationshipsView from './screens/AdminRelationshipsView'
import FacebookCreate from './screens/FacebookCreate'
import EventHistory from './screens/EventHistory'
import EventRatingScreen from './screens/EventRatingScreen'
import RelationshipCheckIn from './screens/RelationshipCheckIn'

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
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Relationships"
            component={RelationshipsHomeScreen}
          />
          <Stack.Screen
            name="Add a Relationship"
            component={AddRelationShipScreen}
          />
          <Stack.Screen name="Relationship" component={RelationshipScreen} />
          {/* <Stack.Screen name="Send" component={SendMessageScreen} />
          <Stack.Screen name="Book" component={BookCyrano} />
          <Stack.Screen name="LoveStyle" component={LoveStylesScreen} />
          <Stack.Screen name="LifeEvents" component={LifeEventsScreen} /> */}
          <Stack.Screen name="Event History" component={EventHistory} />
          <Stack.Screen name="Event Rating" component={EventRatingScreen} />
          <Stack.Screen
            name="Relationship Check-In"
            component={RelationshipCheckIn}
          />
          <Stack.Screen name="Admin" component={AdminDashboard} />
          <Stack.Screen name="AdminRel" component={AdminRelationshipsView} />
        </>
      ) : (
        <>
          <Stack.Screen name="Create Account" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Google" component={GoogleCreate} />
          <Stack.Screen name="Facebook" component={FacebookCreate} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default StackNavigator
