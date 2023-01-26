import { createContext, useState, useEffect } from 'react'

const RelationshipContext = createContext()

export const RelationshipProvider = ({ children }) => {
  const [relationship, setRelationship] = useState([])
  const [user, setUser] = useState({
    user: null,
    isLoggedIn: false,
  })

  //Log in user
  const logInUser = (userData) => {
    if (userData) {
      setUser({
        user: userData,
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

  //Update Relationship
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
      }}
    >
      {children}
    </RelationshipContext.Provider>
  )
}

export default RelationshipContext
