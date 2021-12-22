import React, {} from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
});

const auth = firebase.auth();

function SignInWithGoogle() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
}

function SignOut() {
  return (
    <button
      onClick={() => {
        auth.signOut();
      }}
    >
      Sign out (from anything)
    </button>
  );
}

function DashBoard() {
  const [user] = useAuthState(auth);
  console.log(user);

  return user ? (
    <div style={{ border: "solid black" }}>
      User Dashboard <br></br>
      Name: {user.displayName} <br></br>
      Email: {user.email} <br></br>
      Photo: <img src={user.photoURL} alt="profile pic" /> <br></br>
    </div>
  ) : (
    <></>
  );
}

export default function GoogleAuth() {
    const [user] = useAuthState(auth)

    return (
        <div>
            {user? <SignOut />: <SignInWithGoogle />}
        </div>
    );
}