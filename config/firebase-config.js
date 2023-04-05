import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBvyd0CG2kZiSmV1eDaoEne0ofgslUZs3c',
  authDomain: 'cyrano-6ae46.firebaseapp.com',
  projectId: 'cyrano-6ae46',
  storageBucket: 'cyrano-6ae46.appspot.com',
  messagingSenderId: '516420786651',
  appId: '1:516420786651:web:67ddc0586f725a368d2ffe',
  measurementId: 'G-8M56PGRDTZ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
