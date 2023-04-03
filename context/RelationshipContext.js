import { createContext, useState, useEffect } from 'react'

const RelationshipContext = createContext()

export const RelationshipProvider = ({ children }) => {
  const [relationship, setRelationship] = useState([])

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
