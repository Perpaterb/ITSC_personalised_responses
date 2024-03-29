import React, {useEffect, useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import "./deletePopUp.css";
import { doc, updateDoc} from 'firebase/firestore';

import AddGoogleAnalytics from "../components/googleAnalyitics"; //(action, category, label, user)

const number1 = Math.floor(Math.random() * 10) + 1
const number2 = Math.floor(Math.random() * 10) + 1

export default function DeletePopUp(props) {

  const [answer, setAnswer] = useState(0)
  const [currect, setCurrect] = useState(false)

  const question = number1 + " + " + number2 + " ="
 
  const deleteItem = async () => {
    if (currect === true) {
      const itemdoc = doc(props.db, "responses", props.itemID)
      const update = {updatedBy: props.userEmail, active: false}
      await updateDoc(itemdoc , update)
      props.setPopUpActive(false)
      window.location.reload(false);
      AddGoogleAnalytics("delete", props.type, props.title, props.userEmail) //(action, category, label, user)
    }
  }

  useEffect(() => {
    if (parseInt(answer,10) === number1 + number2) {
      setCurrect(true)
    } else {
      setCurrect(false)
    }
  }, [answer])
  

  return (props.trigger) ?(
    <div className="del-popup">
      <div className="del-popup-inner">
        <OutlinedInput placeholder={question} onChange={(event) => {setAnswer(event.target.value)}} />
        <Button 
          className="delete-button"
          onClick={deleteItem}
          > 
          <h5>Delete</h5>
        </Button>
        
        <Button 
          className="close-button"
          onClick={() => {props.setPopUpActive(false)}}
          > 
          <h5>Close</h5>
        </Button>
      </div>
    </div>
  ) : ""
}