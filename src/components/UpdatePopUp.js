import React, {useEffect, useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import "./updatePopUp.css";
import { doc, updateDoc} from 'firebase/firestore';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const number1 = Math.floor(Math.random() * 10) + 1
const number2 = Math.floor(Math.random() * 10) + 1

export default function UpdatePopUp(props) {

  const [answer, setAnswer] = useState(0)
  const [currect, setCurrect] = useState(false)

  const [newResponsesbody, setNewResponsesbody] = useState("")

  const question = number1 + " + " + number2 + " ="
 
  const updateItem = async () => {
    if (currect === true) {
      const itemdoc = doc(props.db, "responses", props.itemID)
      const newBody = { body: newResponsesbody }
      await updateDoc(itemdoc , newBody)
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
    <div className="up-popup">
      <div className="up-popup-inner">
          <p>Hi ______,<b/></p>
          <TextareaAutosize
            aria-label="textarea"
            defaultValue={props.body.replace(/<br>/g, '\n')}
            placeholder="Empty"
            style={{ width: "100%" }}
            onChange={(event) => {setNewResponsesbody(event.target.value.replace(/\n/g, '<br>'))}}
          />
          <p>Kind regards,</p>
          <p>{props.userName}</p>
          <p>IT Support Centre</p>

        <OutlinedInput placeholder={question} onChange={(event) => {setAnswer(event.target.value)}} />
        <Button 
          className="update-button"
          onClick={updateItem}
          > 
          <h6>Update</h6>
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