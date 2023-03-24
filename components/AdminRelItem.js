import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Card from '../shared/Card'

const AdminRelItem = ({ user }) => {
  const navigation = useNavigation()

  const handlePress = (id) => {
    navigation.navigate('AdminRel', {
      itemId: id,
    })
  }

  return (
    <View style={styles.mb3} key={user?.userId}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.textSM}>
            Name: {user?.name} {user?.lastName}
          </Text>
          <Text style={styles.textSM}>Mobile: {user?.phone}</Text>
          <Text style={styles.textSM}>Email: {user?.email}</Text>
          <Pressable style={styles.button} onPress={() => console.log('ok')}>
            <Text style={styles.buttonText}>LOGIN AS USER</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePress(user?.userId)}
          >
            <Text style={styles.buttonText}>CREATE EVENT</Text>
          </Pressable>
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#EF6E62',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  textSM: {
    color: '#EF6E62',
    fontWeight: 'bold',
    fontSize: 10,
    paddingRight: 20,
  },
  mb3: {
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EF6E62',
    padding: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
})

export default AdminRelItem
