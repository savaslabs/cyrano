import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import RelationshipsHomeScreen from './screens/RelationshipsHomeScreen'
import AddRelationShipScreen from './screens/AddRelationshipScreen'
import RelationshipScreen from './screens/RelationshipScreen'
import ScheduleEvent from './screens/ScheduleEvent'
import LoginScreen from './screens/LoginScreen'
import GoogleCreate from './screens/GoogleCreate'
import AdminDashboard from './screens/AdminDashboard'
import AdminRelationshipsView from './screens/AdminRelationshipsView'
import FacebookCreate from './screens/FacebookCreate'
import EventHistory from './screens/EventHistory'
import EventRatingScreen from './screens/EventRatingScreen'
import RelationshipCheckIn from './screens/RelationshipCheckIn'
import UserPanelScreen from './screens/UserPanelScreen'
import useAuth from './hooks/useAuth'
import EventDetails from './screens/EventDetails'
import OtherDetailsForm from './screens/OtherDetailsForm'
import RelationshipsHomeAdminScreen from './screens/RelationshipsHomeAdminScreen'
import EditRelationshipScreen from './screens/EditRelationshipScreen'
import RelationshipStatusScreen from './screens/RelationshipStatusScreen'
import EditEventScreen from './screens/EditEventScreen'
import EditDetailsScreen from './screens/EditDetailsScreen'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } = useAuth()

  const { isLoggedIn } = user

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Create Account" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Google" component={GoogleCreate} />
          <Stack.Screen name="Facebook" component={FacebookCreate} />
          <Stack.Screen
            name="Relationships"
            component={RelationshipsHomeScreen}
          />
          <Stack.Screen
            name="Add a Relationship"
            component={AddRelationShipScreen}
          />
          <Stack.Screen name="Relationship" component={RelationshipScreen} />
          <Stack.Screen name="Schedule Event" component={ScheduleEvent} />
          <Stack.Screen name="Event History" component={EventHistory} />
          <Stack.Screen name="Event Rating" component={EventRatingScreen} />
          <Stack.Screen name="Event Details" component={EventDetails} />
          <Stack.Screen name="Other Details" component={OtherDetailsForm} />
          <Stack.Screen
            name="Relationship Check-In"
            component={RelationshipCheckIn}
          />
          <Stack.Screen name="Admin" component={AdminDashboard} />
          <Stack.Screen name="AdminRel" component={AdminRelationshipsView} />
          <Stack.Screen name="User Panel" component={UserPanelScreen} />
          <Stack.Screen
            name="Relationships Admin"
            component={RelationshipsHomeAdminScreen}
          />
          <Stack.Screen
            name="Edit Relationship"
            component={EditRelationshipScreen}
          />
          <Stack.Screen
            name="Relationship Status"
            component={RelationshipStatusScreen}
          />
          <Stack.Screen name="Edit Event" component={EditEventScreen} />
          <Stack.Screen name="Edit Details" component={EditDetailsScreen} />
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
