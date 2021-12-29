import React, {useEffect, useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import "./deletePopUp.css";
import { doc, deleteDoc} from 'firebase/firestore';
const number1 = Math.floor(Math.random() * 10) + 1
const number2 = Math.floor(Math.random() * 10) + 1

export default function DeletePopUp(props) {

  const [answer, setAnswer] = useState(0)
  const [currect, setCurrect] = useState(false)

  const question = number1 + " + " + number2 + " ="
 
  const deleteItem = async () => {
    if (currect === true) {
      const itemdoc = doc(props.db, "responses", props.itemID)
      await deleteDoc(itemdoc)
      props.setPopUpActive(false)
      window.location.reload(false);
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
          <h6>Delete</h6>
        </Button>
        
        <Button 
          className="close-button"
          onClick={() => {props.setPopUpActive(false)}}
          > 
          <h6>Close</h6>
        </Button>


      </div>
    </div>
  ) : ""
}