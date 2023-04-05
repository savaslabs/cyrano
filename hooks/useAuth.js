import { createContext, useContext, useState } from 'react'
import { auth, provider, db } from '../config/firebase-config'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth'
import { getDocs, collection, where, query } from 'firebase/firestore'
import Toast from 'react-native-toast-message'

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
        Toast.show({
          type: 'error',
          text1: errorCode,
          visibilityTime: 2000,
        })
      })

    await sendEmailVerification(auth.currentUser)
      .then(() =>
        Toast.show({
          type: 'success',
          text1: 'Check your email to verify your account',
          visibilityTime: 2000,
        })
      )
      .catch((err) =>
        Toast.show({
          type: 'error',
          text1: err,
          visibilityTime: 2000,
        })
      )
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      setUser({
        user: {
          id: result.user.uid,
          email: result.user.email,
          img: result.user.photoURL,
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
        //   Toast.show({
        //     type: 'error',
        //     text1: 'The email is not verified. Check your inbox',
        //     visibilityTime: 2000
        //   })
        // }
      })
      .catch((error) => {
        const errorCode = error.code
        Toast.show({
          type: 'error',
          text1: errorCode,
          visibilityTime: 2000,
        })
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
        setUser,
        userData,
        userCred,
        saveId,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
