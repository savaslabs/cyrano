import { createContext, useState, useEffect } from 'react'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection, where, query } from 'firebase/firestore'

const RelationshipContext = createContext()

export const RelationshipProvider = ({ children }) => {
  const [relationship, setRelationship] = useState([])
  const [user, setUser] = useState({
    user: null,
    isLoggedIn: false,
  })
  const [userData, setUserData] = useState('')
  const userRef = collection(db, 'users')

  // Get user from Firebase
  const getUser = async () => {
    const q = query(userRef, where('userId', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUserData(doc.data())
    })
  }

  //Log in user
  const logInUser = (userData) => {
    if (userData) {
      setUser({
        user: {
          id: userData?.user?.uid,
          email: userData?.user?.email,
        },
        isLoggedIn: true,
      })
    }
  }

  //Add Relationship
  const addRelationship = (data) => {
    if (data) {
      setRelationship([data, ...relationship])
    }
  }

  //Upcoming date update
  const updateRelationship = (id, upcomingDate) => {
    setRelationship(
      relationship.map((item) => {
        if (item.id === id) {
          return { ...item, upcomingDate }
        } else {
          return item
        }
      })
    )
  }

  return (
    <RelationshipContext.Provider
      value={{
        logInUser,
        user,
        addRelationship,
        relationship,
        updateRelationship,
        getUser,
        userData
      }}
    >
      {children}
    </RelationshipContext.Provider>
  )
}

export default RelationshipContext
