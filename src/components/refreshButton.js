import React, {} from "react";
import Button from '@mui/material/Button';
import Refresh from "./assets/refresh.png";

export default function refreshButton(props) {

    return (
        <div style={{width: 50}}>
            <Button 
            className="refresh-Button"
            onClick={props.refreshDBFunction}
            > 
                <img style={{width: 50}} src={Refresh} alt="Refresh DB" />
            </Button>
        </div>
    );
}