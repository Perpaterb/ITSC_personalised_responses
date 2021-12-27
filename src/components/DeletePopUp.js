import React, {useEffect, useState} from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import "./deletePopUp.css";

export default function DeletePopUp(props) {
  const number1 = Math.floor(Math.random() * 100) + 1
  const number2 = Math.floor(Math.random() * 100) + 1

  const [answer, setAnswer] = useState(0)
  const [currect, setCurrect] = useState(false)

  const question = number1 + " + " + number2 + " ="
 

  function handleClick() {

  }

  useEffect(() => {
    if (answer === number1 + number2) {
      setCurrect(false)
    } else {
      setCurrect(true)
    }
  }, [answer])
  

  return (props.trigger) ?(
    <div className="popup">
      <div className="popup-inner">
        <OutlinedInput placeholder={question} onChange={(event) => {setAnswer(event.target.value)}} />
        <Button 
          className="delete-button"
          onClick={() => {}}
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