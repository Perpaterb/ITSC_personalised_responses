import React, {useState} from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeletePopUp from "./DeletePopUp"
import UpdatePopUp from "./UpdatePopUp"
import AddGoogleAnalytics from "../components/googleAnalyitics"; //(action, category, label, user)


export default function ResponceOverView(props) {

    const [delPopUpActive, setDelPopUpActive] = useState(false)
    const [delPopUpActiveItemID, setDelPopUpActiveItemID] = useState("")
    const [delPopUpActiveTitle, setDelPopUpActiveTitle] = useState("")
    const [upPopUpActive, setUpPopUpActive] = useState(false)
    const [upPopUpActiveItemID, setUpPopUpActiveItemID] = useState("")
    const [upPopUpActiveBody, setUpPopUpActiveBody] = useState("")
    const [upPopUpActiveTitle, setUpPopUpActiveTitle] = useState("")

    function copy(text, name, title) {
        navigator.clipboard.writeText(text)
        AddGoogleAnalytics("copy", props.type, title, props.userEmail) //(action, category, label, user)
    }

    function setDelPopUpStates(active, id, title) {
        setDelPopUpActive(active)
        setDelPopUpActiveItemID(id)
        setDelPopUpActiveTitle(title)
    }

    function setUpPopUpStates(active, id, body, title) {
        setUpPopUpActive(active)
        setUpPopUpActiveItemID(id)
        setUpPopUpActiveBody(body)
        setUpPopUpActiveTitle(title)
    }

    let autherised = false

    if (props.userEmail !== null){
        if (props.userEmail === 'zcarss@gmail.com'){
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
        <DeletePopUp type={props.type} db={props.db} trigger={delPopUpActive} setPopUpActive={setDelPopUpActive} itemID={delPopUpActiveItemID} title={delPopUpActiveTitle} userEmail={props.userEmail}/>
        <UpdatePopUp type={props.type} db={props.db} trigger={upPopUpActive} setPopUpActive={setUpPopUpActive} itemID={upPopUpActiveItemID} title={upPopUpActiveTitle} body={upPopUpActiveBody} userName={props.userName} userEmail={props.userEmail}/>
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
                    <ListItem key={item+"LI1"} component="div" disablePadding>
                        <ListItemButton key={item+"LIB1"}>
                        <ListItemText key={item+"LIT1"} onClick={() => handleClick(props.responses[item].id)} primary={<Typography variant="h5" style={{ color: '#ff6f00' }}> {props.responses[item].title} </Typography>}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </Box>
            <Box sx={{ width: '75%', maxWidth: '900px'}}>
                {props.titles.map((item) => (
                    <ListItem key={item+"LI2"} ref={refs[props.responses[item].id]} component="div" disablePadding sx={{p: 1}}>
                        {/* <ListItem> */}
                            {(() => {
                                if (props.type === "contact"){
                                    return (
                                        <Box key={item+"box2"} sx={{bgcolor: "#fdf1fd", p: 1, maxWidth: '900px'}}>
                                            <h2 dangerouslySetInnerHTML={{ __html: props.responses[item].title}}/>
                                            <span dangerouslySetInnerHTML={{ __html: props.responses[item].body}}/>
                                            {(() => {
                                                if (autherised === true){
                                                    return (
                                                        <div>
                                                            <Button key={item+"button4"}
                                                                onClick={() => {setUpPopUpStates(true, props.responses[item].id, props.responses[item].body, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '140px',top: '20px'}}>
                                                                <h4>Edit</h4>
                                                            </Button>
                                                            <Button key={item+"button5"}
                                                                onClick={() => {setDelPopUpStates(true, props.responses[item].id, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '210px',top: '20px'}}>
                                                                <h4>Delete</h4>
                                                            </Button>
                                                        </div>
                                                    )
                                                } 
                                            })()}
                                            <Button key={item+"button6"}
                                                onClick={() => {copy(props.responses[item].body.replace(/<[^>]+>/g, '\n'), props.userName, props.responses[item].title)}} 
                                                style={{height: '40px' , backgroundColor: '#205055',position: 'absolute', right: '10px',top: '20px'}}>
                                                <h4>Copy</h4>
                                            </Button>
                                        </Box>
                                    )
                                } else if (props.type === "support") {
                                    return (
                                        <Box key={item+"box2"} sx={{bgcolor: "#f1fdfd", p: 1, maxWidth: '900px'}}>
                                            <h2 dangerouslySetInnerHTML={{ __html: props.responses[item].title}}/>
                                            <span dangerouslySetInnerHTML={{ __html: props.responses[item].body}}/>
                                            {(() => {
                                                if (autherised === true){
                                                    return (
                                                        <div>
                                                            <Button key={item+"button4"}
                                                                onClick={() => {setUpPopUpStates(true, props.responses[item].id, props.responses[item].body, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '140px',top: '20px'}}>
                                                                <h4>Edit</h4>
                                                            </Button>
                                                            <Button key={item+"button5"}
                                                                onClick={() => {setDelPopUpStates(true, props.responses[item].id, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '210px',top: '20px'}}>
                                                                <h4>Delete</h4>
                                                            </Button>
                                                        </div>
                                                    )
                                                } 
                                            })()}
                                            <Button key={item+"button6"}
                                                onClick={() => {copy(props.responses[item].body.replace(/<[^>]+>/g, '\n'), props.userName, props.responses[item].title)}} 
                                                style={{height: '40px' , backgroundColor: '#205055',position: 'absolute', right: '10px',top: '20px'}}>
                                                <h4>Copy</h4>
                                            </Button>
                                        </Box>
                                    ) 
                                } else {
                                    return (
                                        <Box key={item+"box1"} sx={{bgcolor: "#fdfdf1", p: 1, maxWidth: '900px'}}>
                                            <h2 dangerouslySetInnerHTML={{ __html: props.responses[item].title}}/>
                                            <span dangerouslySetInnerHTML={{ __html: props.responses[item].body}}/>
                                            {(() => {
                                                if (autherised === true){
                                                    return (
                                                        <div>
                                                            <Button key={item+"button1"} 
                                                                onClick={() => {setUpPopUpStates(true, props.responses[item].id, props.responses[item].body, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '140px',top: '20px'}}>
                                                                <h4>Edit</h4>
                                                            </Button>
                                                            <Button key={item+"button2"}
                                                                onClick={() => {setDelPopUpStates(true, props.responses[item].id, props.responses[item].title)}} 
                                                                style={{height: '40px' ,position: 'absolute', right: '210px',top: '20px'}}>
                                                                <h4>Delete</h4>
                                                            </Button>
                                                        </div>
                                                    )
                                                } 
                                            })()}
                                            <Button key={item+"button3"}
                                                onClick={() => {copy(props.responses[item].body.replace(/<[^>]+>/g, '\n'), props.userName, props.responses[item].title)}} 
                                                style={{height: '40px' , backgroundColor: '#205055',position: 'absolute', right: '10px',top: '20px'}}>
                                                <h4>Copy</h4>
                                            </Button>
                                        </Box>
                                    )
                                }
                            })()}
                        {/* </ListItem> */}
                    </ListItem>
                ))}
            </Box>
        </Box>
        </div>
    );
}
