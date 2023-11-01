import { createContext, useState, useEffect } from 'react'
import { db, auth } from '../config/firebase-config'
import { getDocs, collection } from 'firebase/firestore'

const RelationshipContext = createContext()

export const RelationshipProvider = ({ children }) => {
  const [relationships, setRelationships] = useState([])
  const [upcomingArr, setUpcomingArr] = useState([])
  const relationshipRef = collection(db, 'relationships')
  const upcomingEventsRef = collection(db, 'upcomingEvents')
  const prevEventsRef = collection(db, 'prevEvents')

  // Set Relationships
  // useEffect(() => {
  //   const getRelationships = async () => {
  //     const data = await getDocs(relationshipRef)
  //     const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     const finalRel = newData.filter(
  //       (item) => item.author.id === auth.currentUser.uid
  //     )
  //     setRelationships(finalRel)
  //   }

  //   getRelationships()
  // }, [])

  //Get upcoming events
  useEffect(() => {
    const getUpcomingEvents = async () => {
      const data = await getDocs(upcomingEventsRef)
      const newData = data.docs.map((doc) => doc.data())

      setUpcomingArr(newData)
    }
    getUpcomingEvents()
  }, [])

  return (
    <RelationshipContext.Provider
      value={{
        relationships,
        upcomingArr,
      }}
    >
      {children}
    </RelationshipContext.Provider>
  )
}

export default RelationshipContext
