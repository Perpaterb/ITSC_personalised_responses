import React, {} from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

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
      <Button color="inherit" onClick={signInWithGoogle}>
        <Typography variant="span" component="div" sx={{ flexGrow: 1 }}>
          Sign in with UTS google account
        </Typography>
      </Button>
    </div>
  );
}

function SignOut() {
  const [user] = useAuthState(auth);
  localStorage.setItem('email', user.email);
  localStorage.setItem('name', user.displayName);
  localStorage.setItem('photo', user.photoURL);

  return (
    <Toolbar disableGutters>
      <Typography component="span" sx={{ flexGrow: 1 }}>
        {user.displayName}
      </Typography>
      <Button
        color="inherit"
        onClick={() => {
          auth.signOut();
          localStorage.setItem('email', "");
          localStorage.setItem('name', "");
          localStorage.setItem('photo', "");
        }}
      >
      <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
        Sign Out
      </Typography>
      </Button>
    </Toolbar>
  );
}

// function DashBoard() {
//   const [user] = useAuthState(auth);
//   console.log(user);

//   return user ? (
//     <div style={{ border: "solid black" }}>
//       User Dashboard <br></br>
//       Name: {user.displayName} <br></br>
//       Email: {user.email} <br></br>
//       Photo: <img src={user.photoURL} alt="profile pic" /> <br></br>
//     </div>
//   ) : (
//     <></>
//   );
// }


export default function GoogleAuth() {
    const [user] = useAuthState(auth)

    return (
        <div>
            {user? <SignOut />: <SignInWithGoogle />}
            
        </div>
    );
}