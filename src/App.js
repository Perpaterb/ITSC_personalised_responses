// import React, {} from "react";
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//   apiKey: "AIzaSyDzcUzLZfXFx0QJL5gtt_4XbudXrKeMhc8",
//   authDomain: "personalisedresponses.firebaseapp.com",
//   projectId: "personalisedresponses",
//   storageBucket: "personalisedresponses.appspot.com",
//   messagingSenderId: "73847712894",
//   appId: "1:73847712894:web:f05348c5d471d58af1bc2f",
//   measurementId: "G-QFVLBDD92N"
// });


// const auth = firebase.auth();
// const firestore = firebase.firestore();

// function SignInWithGoogle() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };
//   return (
//     <div>
//       <button onClick={signInWithGoogle}>Sign in with google</button>
//     </div>
//   );
// }

// function SignOut() {
//   return (
//     <button
//       onClick={() => {
//         auth.signOut();
//       }}
//     >
//       Sign out
//     </button>
//   );
// }

// function Responses(){

//   const db = firestore.collection('responses')
//   const query = db.get()

//   const [responses] = useCollection(query, {idField: 'id'})
//   console.log(query)

//   return(
//     <div>
//       {responses && responses.map(res => <PersonalisedResponce key={res.id} responses={res}/>)}
//     </div>
//   )
// }

// function PersonalisedResponce(props){
//   const {body, title} = props.responses

//   return(
//     <div>
//       {body}
//     </div>
//   )
// }


// export default function App() {

//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <header>

//       </header>

//       <section>
//         {user ? <SignOut/> : <SignInWithGoogle/>}
//         <Responses/>

//       </section>
//     </div>
//   );
// }

import React, {useEffect, useState} from "react";
import {app} from './components/firebase'
import { collection, getDocs, addDoc} from 'firebase/firestore';
import { getFirestore } from "@firebase/firestore";
import GoogleAuth from "./components/GoogleAuth"

const db = getFirestore(app)

export default function App() {

    const [newResponsesbody, setnewResponsesbody] = useState("")
    const [newResponsesClass, setnewResponsesClass] = useState("")
    const [newResponsesTitle, setnewResponsesTitle] = useState("")

    const [responses, setResponses] = useState([])
    const responsesCollectionRef = collection(db, "responses")

    const createResponses = async () => {
      console.log(newResponsesbody)
      await addDoc(responsesCollectionRef, {body: newResponsesbody, class: newResponsesClass, title: newResponsesTitle})
      updateFromDB()
    }

    function updateFromDB(){
        const getResponses = async () => {
          const data = await getDocs(responsesCollectionRef)
          console.log(data.docs)
          setResponses(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      }
      getResponses();
    }

    useEffect(() => {
      updateFromDB()
    }, [])

    return (
      <div>
        <GoogleAuth/>
          {responses.map((responses) => {
            return (
              <div>
                <h1> Tiles: {responses.title} </h1>
                <div dangerouslySetInnerHTML={{ __html: responses.body }} />
              </div>
            );
        })}
        <select placeholder="Title" name="classSelect" id="classSelect" onChange={(event) => {setnewResponsesClass(event.target.value)}}>
          <option value="" disabled selected>Select Class</option>
          <option value="Staff">Staff</option>
          <option value="Student">Student</option>
          <option value="ToClose">To Close</option>
          <option value="Post-its">Post-its</option>
          <option value="ReferToCatalogue">Refer To Catalogue</option>
          <option value="Insearch">Insearch</option>
        </select>

        <input placeholder="Title" onChange={(event) => {setnewResponsesTitle(event.target.value)}}/>
      
        <textarea
          style={{ whiteSpace: 'pre-wrap' }}
          id="body"
          name="story"
          rows="5"
          cols="33"
          onChange={(event) => {setnewResponsesbody(event.target.value.replace(/\n/g, '<br>'))}}
        >
        </textarea>

        <button onClick={createResponses}>Create New Personalised Responses</button>
      </div>
    )
    
}
