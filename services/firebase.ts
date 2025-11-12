
// FIX: Using Firebase v8 compat syntax to resolve module errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// IMPORTANT: In a real production environment, these should be managed by environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyCpFi6YbexWcTg8t8PT3W-mPDEc3ZuCGLo",
  authDomain: "nzgst1510.firebaseapp.com",
  projectId: "nzgst1510",
  storageBucket: "nzgst1510.firebasestorage.app",
  messagingSenderId: "150680717927",
  appId: "1:150680717927:web:b17f8c7d243517797f62c2",
  measurementId: "G-7QVND6QX2Z"
};
// FIX: Initialize Firebase using the v8 compat syntax, checking if it's already initialized to prevent errors during hot-reloads.
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = app.auth();
const db = app.firestore();

// This is a placeholder for the appld used in the Firestore path.
// In a real multi-tenant app, this might be dynamic.
const appId = 'default-app-id';

export { auth, db, appId };