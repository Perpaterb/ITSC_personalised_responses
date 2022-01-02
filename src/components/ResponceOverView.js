import React, {useState} from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeletePopUp from "./DeletePopUp"
import UpdatePopUp from "./UpdatePopUp"


function copy(text, name) {

    const greating  = "Hi ______, \n \n"
    const sightOff = "\n \nKind regards,\n" + name + "\nIT Support Centre"
    const allText = greating + text + sightOff
    navigator.clipboard.writeText(allText)
}

export default function ResponceOverView(props) {

    const [delPopUpActive, setDelPopUpActive] = useState(false)
    const [delPopUpActiveItemID, setDelPopUpActiveItemID] = useState("")
    const [upPopUpActive, setUpPopUpActive] = useState(false)
    const [upPopUpActiveItemID, setUpPopUpActiveItemID] = useState("")
    const [upPopUpActiveBody, setUpPopUpActiveBody] = useState("")

    function setDelPopUpStates(active, id) {
        setDelPopUpActive(active)
        setDelPopUpActiveItemID(id)
    }

    function setUpPopUpStates(active, id, body) {
        setUpPopUpActive(active)
        setUpPopUpActiveItemID(id)
        setUpPopUpActiveBody(body)
    }

    let autherised = false

    if (props.userEmail !== null){
        if (props.userEmail.endsWith('@uts.edu.au')){
            autherised = true
        }
    } 

    const titles = props.responses

    const refs = titles.reduce((titles, value) => {
        titles[value.id] = React.createRef();
        return titles;
    }, {});

    const handleClick = id =>
    refs[id].current.scrollIntoView({
        behavior: 'smooth',
    });

    return (
        <div>
        <DeletePopUp db={props.db} trigger={delPopUpActive} setPopUpActive={setDelPopUpActive} itemID={delPopUpActiveItemID} userEmail={props.userEmail}/>
        <UpdatePopUp db={props.db} trigger={upPopUpActive} setPopUpActive={setUpPopUpActive} itemID={upPopUpActiveItemID} body={upPopUpActiveBody} userName={props.userName} userEmail={props.userEmail}/>
        <Box
            sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            }}
        >
            <Box sx={{ width: '20%'}}>
                {props.titles.map((item) => (
                    <ListItem key={item} component="div" disablePadding>
                        <ListItemButton>
                        <ListItemText onClick={() => handleClick(props.responses[item].id)} primary={<Typography variant="h5" style={{ color: '#ff6f00' }}> {props.responses[item].title} </Typography>}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
            <Box sx={{ width: '75%', maxWidth: '800px' }}>
                {props.titles.map((item) => (
                    <ListItem key={item.id} ref={refs[props.responses[item].id]} component="div" disablePadding>
                        <ListItem>
                            <Box>
                                <h2 dangerouslySetInnerHTML={{ __html: props.responses[item].title}}/>
                                <p dangerouslySetInnerHTML={{ __html: props.responses[item].body}}/>
                                {(() => {
                                    if (autherised === true){
                                        return (
                                            <div>
                                                <Button 
                                                    onClick={() => {setUpPopUpStates(true, props.responses[item].id, props.responses[item].body)}} 
                                                    style={{height: '40px' ,position: 'absolute', right: '140px',top: '20px'}}>
                                                    <h4>Edit</h4>
                                                </Button>
                                                <Button 
                                                    onClick={() => {setDelPopUpStates(true, props.responses[item].id)}} 
                                                    style={{height: '40px' ,position: 'absolute', right: '210px',top: '20px'}}>
                                                    <h4>Delete</h4>
                                                </Button>
                                            </div>
                                        )
                                    } 
                                })()}
                                <Button 
                                    onClick={() => {copy(props.responses[item].body.replace(/<[^>]+>/g, '\n'), props.userName)}} 
                                    style={{height: '40px' , backgroundColor: '#205055',position: 'absolute', right: '10px',top: '20px'}}>
                                    <h4>Copy</h4>
                                </Button>
                            </Box>
                        </ListItem>
                    </ListItem>
                ))}
            </Box>
        </Box>
        </div>
    );
}
