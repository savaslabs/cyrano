import { Alert } from 'react-native'
import { createContext, useContext, useState } from 'react'
import { auth, provider, db } from '../config/firebase-config'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { getDocs, collection, where, query } from 'firebase/firestore'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [userData, setUserData] = useState('')
  const [userCred, setUserCred] = useState('')
  const [saveId, setSaveId] = useState('')
  const userRef = collection(db, 'users')

  // Create user with Email and Password
  const createUserWithEmail = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserCred(userCredential)
      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode)
      })

    await sendEmailVerification(auth.currentUser)
      .then(Alert.alert('An email has been sent to verify the account'))
      .then(() => alert('An email has been sent to verify the account'))
      .catch((err) => console.log(err))
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      setUser({
        user: {
          id: result.user.uid,
          email: result.user.email,
        },
        isLoggedIn: true,
      })
    })
  }

  // Sign in with Email and Password
  const signInWithEmail = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // if (auth.currentUser.emailVerified) {
        setUser({
          user: {
            id: userCredential.user.uid,
            email: userCredential.user.email,
          },
          isLoggedIn: true,
        })
        // } else {
        //   alert('The email is not verified. Please check your inbox')
        // }
      })
      .catch((error) => {
        const errorCode = error.code
        alert(errorCode)
      })
  }

  // Get user from Firebase
  const getUser = async () => {
    const q = query(userRef, where('userId', '==', auth.currentUser.uid))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUserData(doc.data())
      setSaveId(doc.id)
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        createUserWithEmail,
        signInWithGoogle,
        signInWithEmail,
        getUser,
        userData,
        userCred,
        saveId
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
