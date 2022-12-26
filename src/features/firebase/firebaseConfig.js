// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAw99FjL23cbID_FEOjw0nrHW40iM99XM",
  authDomain: "quizzy-ee12c.firebaseapp.com",
  projectId: "quizzy-ee12c",
  storageBucket: "quizzy-ee12c.appspot.com",
  messagingSenderId: "38880105885",
  appId: "1:38880105885:web:6bcd13d133f39591a6cb74",
  measurementId: "G-6E7P8V33X1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firestore db
const db = getFirestore(app);

//initialize firebase auth and get a reference to the services
const auth = getAuth(app);

///normal registration from form submission
export const registerUser = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "local",
      email,
    });
    return response.user;
  } catch (error) {
    return error;
  }
};

//normal sign in from form submission
export const signIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    return error;
  }
};

// sign in with google
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return response.user;
  } catch (error) {
    return error;
  }
};

// sign in with facebook

const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    const response = await signInWithPopup(auth, facebookProvider);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
      });
    }
    return response.user;
  } catch (error) {
    return error;
  }
};

// sign in with github

const githubProvider = new GithubAuthProvider();

export const signInWithGithub = async () => {
  try {
    const response = await signInWithPopup(auth, githubProvider);
    const user = response.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
      });
    }
    return response.user;
  } catch (error) {
    return error;
  }
};

// sign out

export const userSignOut = async () => {
  try {
    const response = await signOut(auth);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// firestore db user validation

export const isValidUser = async (email) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const docs = await getDocs(q);
  if (docs.docs.length > 0) return true;
  else return false;
};
